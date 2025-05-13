// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
    
    // Sticky header on scroll
    const header = document.querySelector('header');
    const scrollThreshold = 50;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Validation (basic)
            let isValid = true;
            const requiredFields = ['name', 'email', 'message'];
            
            requiredFields.forEach(field => {
                if (!formData[field].trim()) {
                    isValid = false;
                    const inputField = document.getElementById(field);
                    inputField.classList.add('error');
                    
                    // Remove error class when user starts typing again
                    inputField.addEventListener('input', function() {
                        this.classList.remove('error');
                    }, { once: true });
                }
            });
            
            if (!isValid) {
                showFormMessage('Please fill out all required fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                document.getElementById('email').classList.add('error');
                showFormMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For this demo, we'll simulate a successful submission
            showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        });
    }
    
    // Function to show form submission messages
    function showFormMessage(message, type) {
        // Remove any existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create and add new message
        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}`;
        messageElement.textContent = message;
        
        const submitButton = document.querySelector('.contact-form button');
        submitButton.parentNode.insertBefore(messageElement, submitButton);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            messageElement.classList.add('fade-out');
            setTimeout(() => {
                messageElement.remove();
            }, 500);
        }, 5000);
    }
    
    // Add scroll reveal animations
    const revealElements = document.querySelectorAll('.section-title, .about-content, .project-card, .publication-item, .timeline-item, .interest-category');
    
    const revealOnScroll = function() {
        const windowHeight = window.innerHeight;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('revealed');
            }
        });
    };
    
    // Initial check on page load
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);
    
    // Mobile navigation toggle
    const createMobileNav = function() {
        const header = document.querySelector('header');
        
        // Only create mobile menu if it doesn't exist yet
        if (!document.querySelector('.mobile-nav-toggle')) {
            const mobileToggle = document.createElement('button');
            mobileToggle.className = 'mobile-nav-toggle';
            mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            header.querySelector('.container').appendChild(mobileToggle);
            
            mobileToggle.addEventListener('click', function() {
                const nav = document.querySelector('nav');
                nav.classList.toggle('active');
                
                // Change icon based on menu state
                if (nav.classList.contains('active')) {
                    this.innerHTML = '<i class="fas fa-times"></i>';
                } else {
                    this.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
            
            // Close mobile menu when clicking on a link
            const navLinks = document.querySelectorAll('nav a');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    document.querySelector('nav').classList.remove('active');
                    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
                });
            });
        }
    };
    
    // Check screen size to add mobile navigation
    const checkScreenSize = function() {
        if (window.innerWidth <= 768) {
            createMobileNav();
            document.body.classList.add('mobile');
        } else {
            document.body.classList.remove('mobile');
        }
    };
    
    // Initial check
    checkScreenSize();
    
    // Re-check on window resize
    window.addEventListener('resize', checkScreenSize);
    
    // Project Modals
    const modalTriggers = document.querySelectorAll('.js-open-modal');
    const modalClose = document.querySelectorAll('.project-modal-close');
    const modals = document.querySelectorAll('.project-modal');
    
    // Open modal
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('href');
            const modal = document.querySelector(modalId);
            
            document.body.style.overflow = 'hidden'; // Prevent scrolling
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
        });
    });
    
    // Close modal functions
    function closeModal() {
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = ''; // Re-enable scrolling
    }
    
    // Close when clicking X
    modalClose.forEach(close => {
        close.addEventListener('click', closeModal);
    });
    
    // Close when clicking outside modal content
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    });
    
    // Close when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}); 