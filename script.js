// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Simple navigation - let browser handle it naturally with CSS smooth scrolling
    const navLinks = document.querySelectorAll('a[href^="#"]');
    console.log('Found navigation links:', navLinks.length);
    
    navLinks.forEach((link, index) => {
        console.log(`Link ${index}:`, link.href, link.textContent.trim());
        
        // Just add a click handler for logging, but don't prevent default behavior
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            console.log('Clicked link:', targetId, 'Target section:', targetSection);
            
            if (targetSection) {
                console.log('Target section found, browser will handle navigation');
            } else {
                console.error('Target section not found:', targetId);
            }
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-white', 'shadow');
        } else {
            navbar.classList.remove('bg-white', 'shadow');
        }
    });

    // Form handling
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !phone) {
                showAlert('Please fill in all required fields.', 'danger');
                return;
            }
            
            // Phone number validation (basic)
            const phoneRegex = /^[0-9+\-\s()]{10,}$/;
            if (!phoneRegex.test(phone)) {
                showAlert('Please enter a valid phone number.', 'danger');
                return;
            }
            
            // Email validation (if provided)
            if (email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    showAlert('Please enter a valid email address.', 'danger');
                    return;
                }
            }
            
            // Send email using EmailJS or similar service
            console.log('Form submitted successfully, calling sendAppointmentEmail...');
            sendAppointmentEmail(name, phone, email, service, message);
            
            // Reset form
            this.reset();
            
            // Scroll to contact section to show success message
            setTimeout(() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 500);
        });
    }

    // Function to show alerts
    function showAlert(message, type) {
        // Remove existing alerts
        const existingAlert = document.querySelector('.alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        // Create alert element
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        // Insert alert before the form
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.insertBefore(alertDiv, contactForm.firstChild);
        }
        
        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loading');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .review-card, .stat-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Counter animation for statistics
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + '+';
            }
        }
        
        updateCounter();
    }

    // Trigger counter animation when statistics section is visible
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.stat-item h3');
                counters.forEach(counter => {
                    const target = parseInt(counter.textContent);
                    animateCounter(counter, target);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('#about');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Mobile menu toggle
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        // Close mobile menu when clicking on a link
        const mobileNavLinks = navbarCollapse.querySelectorAll('.nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth < 992) {
                    navbarCollapse.classList.remove('show');
                }
            });
        });
    }

    // Add loading animation to page elements
    function addLoadingAnimation() {
        const elements = document.querySelectorAll('.service-card, .review-card, .contact-form');
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            setTimeout(() => {
                el.style.transition = 'all 0.6s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // Initialize loading animation
    setTimeout(addLoadingAnimation, 500);

    // Contact form field validation
    const formFields = document.querySelectorAll('#appointmentForm input, #appointmentForm select, #appointmentForm textarea');
    formFields.forEach(field => {
        field.addEventListener('blur', function() {
            validateField(this);
        });
        
        field.addEventListener('input', function() {
            if (this.classList.contains('is-invalid')) {
                validateField(this);
            }
        });
    });

    function validateField(field) {
        const value = field.value.trim();
        
        // Remove existing validation classes
        field.classList.remove('is-valid', 'is-invalid');
        
        // Validate based on field type
        if (field.hasAttribute('required') && !value) {
            field.classList.add('is-invalid');
            return false;
        }
        
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                field.classList.add('is-invalid');
                return false;
            }
        }
        
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[0-9+\-\s()]{10,}$/;
            if (!phoneRegex.test(value)) {
                field.classList.add('is-invalid');
                return false;
            }
        }
        
        if (value) {
            field.classList.add('is-valid');
        }
        
        return true;
    }

    // Parallax effect disabled to fix interaction issues
    // window.addEventListener('scroll', function() {
    //     const scrolled = window.pageYOffset;
    //     const heroSection = document.querySelector('.hero-section');
    //     if (heroSection) {
    //         const rate = scrolled * -0.5;
    //         heroSection.style.transform = `translateY(${rate}px)`;
    //     }
    // });

    // Service cards hover effect enhancement
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Review cards hover effect enhancement
    const reviewCards = document.querySelectorAll('.review-card');
    reviewCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.01)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click-to-call functionality
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // On mobile, this will open the phone app
            // On desktop, show a message
            if (!/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                e.preventDefault();
                showAlert('Please call us at +91 9654136674', 'info');
            }
        });
    });

    // Function to send appointment email using EmailJS
    function sendAppointmentEmail(name, phone, email, service, message) {
        console.log('Starting email send process...');
        console.log('Form data:', { name, phone, email, service, message });
        
        // Check if EmailJS is loaded
        if (typeof emailjs === 'undefined') {
            console.error('EmailJS is not loaded!');
            console.error('This is common on GitHub Pages due to CORS restrictions');
            showAlert('Email service is temporarily unavailable. Please call us directly at +91 9654136674 or try again later.', 'danger');
            // Show fallback contact info
            setTimeout(() => {
                showAlert('Alternative: You can also WhatsApp us at +91 9654136674', 'info');
            }, 3000);
            return;
        }
        
        // Additional check for EmailJS initialization
        if (!emailjs.init) {
            console.error('EmailJS is loaded but init function is not available');
            showAlert('Email service is not properly initialized. Please try again or contact us directly.', 'danger');
            return;
        }
        
        // Initialize EmailJS with your User ID
        console.log('Initializing EmailJS with User ID: PTTVqZgqFup6EbJwz');
        emailjs.init("PTTVqZgqFup6EbJwz");
        
        // EmailJS template parameters
        const templateParams = {
            to_email: "aditya.rustagi54@gmail.com",
            from_name: name,
            from_phone: phone,
            from_email: email || "Not provided",
            service_required: service || "Not specified",
            message: message || "No additional message",
            subject: `New Appointment Request - ${name}`,
            reply_to: email || "adopt.ayurveda.service@gmail.com"
        };
        
        console.log('Template parameters:', templateParams);
        console.log('Sending email with service_h24b69s and template_yj5h4d4');
        
        // Send email using EmailJS with your service and template IDs
        emailjs.send("service_h24b69s", "template_yj5h4d4", templateParams)
            .then(function(response) {
                console.log('Email sent successfully:', response);
                showAlert('Thank you! Your appointment request has been sent successfully. We will contact you soon.', 'success');
            }, function(error) {
                console.error('EmailJS failed with error:', error);
                console.error('Error details:', JSON.stringify(error, null, 2));
                showAlert('There was an error sending your request. Please try again or call us directly.', 'danger');
                // Fallback to mailto if EmailJS fails
                fallbackEmailMethod(name, phone, email, service, message);
            });
    }
    
    // Fallback email method - improved for better user experience
    function fallbackEmailMethod(name, phone, email, service, message) {
        // Instead of mailto, show a user-friendly message with contact options
        const contactInfo = `
Appointment Request Details:
• Name: ${name}
• Phone: ${phone}
• Email: ${email || 'Not provided'}
• Service: ${service || 'Not specified'}
• Message: ${message || 'No additional message'}

Please contact us using one of these methods:
• Call: +91 9654136674
• WhatsApp: +91 9654136674
• Email: aditya.rustagi54@gmail.com
        `;
        
        // Show a modal or alert with contact information
        showAlert('Email service is temporarily unavailable. Please contact us directly:', 'warning');
        
        // Show contact details after a short delay
        setTimeout(() => {
            showAlert(contactInfo, 'info');
        }, 2000);
        
        // Also provide WhatsApp option
        setTimeout(() => {
            const whatsappMessage = `Hi, I would like to book an appointment with Dr. Praveen Rustagi.

My details:
Name: ${name}
Phone: ${phone}
Email: ${email || 'Not provided'}
Service: ${service || 'Not specified'}
Message: ${message || 'No additional message'}`;
            
            const whatsappUrl = `https://wa.me/919654136674?text=${encodeURIComponent(whatsappMessage)}`;
            
            // Show WhatsApp option
            const whatsappAlert = document.createElement('div');
            whatsappAlert.className = 'alert alert-success alert-dismissible fade show mt-3';
            whatsappAlert.innerHTML = `
                <strong>Quick WhatsApp Option:</strong><br>
                <a href="${whatsappUrl}" target="_blank" class="btn btn-success btn-sm mt-2">
                    <i class="fab fa-whatsapp me-1"></i> Send via WhatsApp
                </a>
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;
            
            // Add to contact form
            const contactForm = document.querySelector('.contact-form');
            if (contactForm) {
                contactForm.appendChild(whatsappAlert);
            }
        }, 4000);
        
        // Also log the details for easy copying
        console.log('Appointment Request Details:', contactInfo);
    }

    // Add WhatsApp integration (optional)
    function addWhatsAppButton() {
        const whatsappButton = document.createElement('a');
        whatsappButton.href = 'https://wa.me/919654136674?text=Hi, I would like to book an appointment with Dr. Praveen Rustagi';
        whatsappButton.className = 'btn btn-success position-fixed';
        whatsappButton.style.cssText = 'bottom: 20px; right: 20px; z-index: 1000; border-radius: 50%; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 15px rgba(25, 135, 84, 0.3);';
        whatsappButton.innerHTML = '<i class="fab fa-whatsapp"></i>';
        whatsappButton.title = 'Chat on WhatsApp';
        
        document.body.appendChild(whatsappButton);
    }

    // Add WhatsApp button
    addWhatsAppButton();

    // Performance optimization: Lazy load images (if any are added later)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Escape key to close mobile menu
        if (e.key === 'Escape' && navbarCollapse && navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
        }
    });

    // Test hero section buttons
    const heroButtons = document.querySelectorAll('.hero-section .btn');
    console.log('Hero buttons found:', heroButtons.length);
    
    heroButtons.forEach((btn, index) => {
        console.log(`Button ${index}:`, btn.textContent.trim(), btn.href);
        btn.addEventListener('click', function(e) {
            console.log('Hero button clicked:', this.textContent.trim());
        });
    });
    
    // Simple button click logging
    console.log('Navigation setup complete - buttons should work with CSS smooth scrolling');

    // Test EmailJS functionality
    function testEmailJS() {
        console.log('Testing EmailJS...');
        console.log('Current domain:', window.location.hostname);
        console.log('Protocol:', window.location.protocol);
        
        if (typeof emailjs !== 'undefined') {
            console.log('EmailJS is loaded successfully');
            console.log('EmailJS version:', emailjs.version || 'Unknown');
        } else {
            console.error('EmailJS is not loaded');
            console.error('This might be due to CORS issues on GitHub Pages');
        }
    }
    
    // Run test when page loads
    testEmailJS();
    
    // Check if we're on GitHub Pages
    if (window.location.hostname.includes('github.io')) {
        console.log('Running on GitHub Pages - EmailJS may have CORS issues');
        // Add a small delay to allow fallback CDN to load
        setTimeout(() => {
            if (typeof emailjs === 'undefined') {
                console.warn('EmailJS still not loaded after fallback attempt');
                console.warn('Form will use fallback methods for email sending');
            } else {
                console.log('EmailJS loaded successfully on GitHub Pages');
            }
        }, 3000);
    }

    console.log('Adopt The Ayurveda website loaded successfully!');
}); 