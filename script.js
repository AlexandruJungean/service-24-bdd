document.addEventListener('DOMContentLoaded', function() {
    // Device Detection
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
               (navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform));
    }

    // Smart Call Now Button
    const callNowBtn = document.getElementById('callNowBtn');
    if (callNowBtn) {
        // Add visual feedback for desktop users
        if (!isMobileDevice()) {
            callNowBtn.setAttribute('title', 'Opens WhatsApp chat on desktop');
            callNowBtn.addEventListener('mouseenter', function() {
                const icon = this.querySelector('i');
                icon.className = 'fab fa-whatsapp';
            });
            callNowBtn.addEventListener('mouseleave', function() {
                const icon = this.querySelector('i');
                icon.className = 'fas fa-phone';
            });
        } else {
            callNowBtn.setAttribute('title', 'Call +40 759 778 777');
        }

        callNowBtn.addEventListener('click', function(e) {
            if (!isMobileDevice()) {
                // Desktop users: redirect to WhatsApp
                e.preventDefault();
                openWhatsApp();
            }
            // Mobile users: let the tel: link work naturally
        });
    }

    // Smart Footer Phone Link
    const footerPhoneLink = document.getElementById('footerPhoneLink');
    if (footerPhoneLink) {
        // Add visual feedback for desktop users
        if (!isMobileDevice()) {
            footerPhoneLink.setAttribute('title', 'Opens WhatsApp chat on desktop');
            footerPhoneLink.addEventListener('mouseenter', function() {
                const icon = this.parentElement.querySelector('i');
                icon.className = 'fab fa-whatsapp';
            });
            footerPhoneLink.addEventListener('mouseleave', function() {
                const icon = this.parentElement.querySelector('i');
                icon.className = 'fas fa-phone';
            });
        } else {
            footerPhoneLink.setAttribute('title', 'Call +40 759 778 777');
        }

        footerPhoneLink.addEventListener('click', function(e) {
            if (!isMobileDevice()) {
                // Desktop users: redirect to WhatsApp
                e.preventDefault();
                openWhatsApp();
            }
            // Mobile users: let the tel: link work naturally
        });
    }

    // Smart Contact Phone Link
    const contactPhoneLink = document.getElementById('contactPhoneLink');
    if (contactPhoneLink) {
        // Add visual feedback for desktop users
        if (!isMobileDevice()) {
            contactPhoneLink.setAttribute('title', 'Opens WhatsApp chat on desktop');
            contactPhoneLink.addEventListener('mouseenter', function() {
                const icon = this.parentElement.parentElement.querySelector('i');
                icon.className = 'fab fa-whatsapp';
            });
            contactPhoneLink.addEventListener('mouseleave', function() {
                const icon = this.parentElement.parentElement.querySelector('i');
                icon.className = 'fas fa-phone';
            });
        } else {
            contactPhoneLink.setAttribute('title', 'Call +40 759 778 777');
        }

        contactPhoneLink.addEventListener('click', function(e) {
            if (!isMobileDevice()) {
                // Desktop users: redirect to WhatsApp
                e.preventDefault();
                openWhatsApp();
            }
            // Mobile users: let the tel: link work naturally
        });
    }

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // AJAX Formspree Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const formMessage = document.querySelector('.form-message');
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                if (response.ok) {
                    formMessage.textContent = 'Mulțumim pentru mesaj! Te vom contacta în curând.';
                    formMessage.className = 'form-message success';
                    contactForm.reset();
                } else {
                    response.json().then(data => {
                        formMessage.textContent = data.error || 'Ups! A apărut o problemă la trimiterea formularului.';
                        formMessage.className = 'form-message error';
                    });
                }
            })
            .catch(() => {
                formMessage.textContent = 'Ups! A apărut o problemă la trimiterea formularului.';
                formMessage.className = 'form-message error';
            });
        });
    }

    // Form validation function
    function validateForm(data) {
        const errors = [];
        
        if (!data.name || data.name.trim().length < 2) {
            errors.push('Te rugăm să introduci un nume valid');
        }
        
        if (!data.email || !isValidEmail(data.email)) {
            errors.push('Te rugăm să introduci o adresă de email validă');
        }
        
        if (!data.service) {
            errors.push('Te rugăm să selectezi un serviciu');
        }
        
        if (!data.message || data.message.trim().length < 10) {
            errors.push('Te rugăm să introduci un mesaj de cel puțin 10 caractere');
        }
        
        if (errors.length > 0) {
            showMessage(errors.join('<br>'), 'error');
            return false;
        }
        
        return true;
    }

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show message function (replaces alert)
    function showMessage(message, type = 'info') {
        // Remove existing message if any
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}`;
        messageElement.innerHTML = message;
        
        // Add styles
        messageElement.style.padding = '15px';
        messageElement.style.borderRadius = '10px';
        messageElement.style.marginTop = '15px';
        messageElement.style.fontSize = '14px';
        messageElement.style.lineHeight = '1.5';
        
        if (type === 'success') {
            messageElement.style.backgroundColor = '#d4edda';
            messageElement.style.color = '#155724';
            messageElement.style.border = '1px solid #c3e6cb';
        } else if (type === 'error') {
            messageElement.style.backgroundColor = '#f8d7da';
            messageElement.style.color = '#721c24';
            messageElement.style.border = '1px solid #f5c6cb';
        }

        // Insert message after the form
        contactForm.appendChild(messageElement);
        
        // Auto-remove message after 5 seconds
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, 5000);
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = '';
            header.style.backdropFilter = '';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe service cards and pricing cards
    document.querySelectorAll('.service-card, .pricing-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.startsWith('40')) {
                    value = '+' + value;
                } else if (!value.startsWith('+')) {
                    value = '+40' + value;
                }
            }
            e.target.value = value;
        });
    }

    // Lazy loading for images
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('loading');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });

    // Add loading states to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            if (this.type === 'submit') {
                this.style.opacity = '0.7';
                this.style.pointerEvents = 'none';
                setTimeout(() => {
                    this.style.opacity = '1';
                    this.style.pointerEvents = 'auto';
                }, 2000);
            }
        });
    });

    // Pricing cards interactive effects
    document.querySelectorAll('.pricing-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Service cards click to expand
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', function() {
            const isExpanded = this.classList.contains('expanded');
            
            // Reset all cards
            document.querySelectorAll('.service-card').forEach(c => {
                c.classList.remove('expanded');
                c.style.transform = 'translateY(0)';
            });
            
            if (!isExpanded) {
                this.classList.add('expanded');
                this.style.transform = 'translateY(-5px) scale(1.02)';
            }
        });
    });

    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .form-message {
            animation: slideDown 0.3s ease-out;
        }
        
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroLogo = document.querySelector('.hero-logo');
        
        if (hero && heroLogo) {
            // Limit parallax movement to prevent overflow
            const heroHeight = hero.offsetHeight;
            const maxScroll = heroHeight;
            
            if (scrolled <= maxScroll) {
                const parallaxValue = Math.min(scrolled * 0.2, 100); // Reduced from 0.3 to 0.2 and capped at 100px
                heroLogo.style.transform = `translateY(${parallaxValue}px)`;
            }
        }
    });

    // Counter animation for stats (if you want to add them later)
    function animateCounter(element, start, end, duration) {
        let startTime = null;
        
        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }
        
        requestAnimationFrame(step);
    }

    // Initialize any counters
    document.querySelectorAll('.counter').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        animateCounter(counter, 0, target, 2000);
    });
});

// WhatsApp click handler
function openWhatsApp() {
    const phoneNumber = '40759778777';
    const message = 'Bună, aș dori informații despre serviciile de truck service.';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Add WhatsApp functionality to contact items
document.addEventListener('DOMContentLoaded', function() {
    const whatsappItems = document.querySelectorAll('.contact-item');
    whatsappItems.forEach(item => {
        const icon = item.querySelector('.fa-whatsapp');
        if (icon) {
            item.style.cursor = 'pointer';
            item.addEventListener('click', openWhatsApp);
        }
    });
});

// SEO and Performance optimizations
document.addEventListener('DOMContentLoaded', function() {
    // Preload critical resources
    const criticalImages = ['logo.svg'];
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });

    // Add structured data for SEO
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "AutoRepair",
        "name": "Truck Service 24 BDD",
        "description": "Service mobil camioane și remorci, intervenții pe drum, vulcanizare mobilă, reparații ECU",
        "url": "https://service24bdd.netlify.app",
        "telephone": "+40759778777",
        "email": "service24@bddlogspeed.ro",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "RO"
        },
        "openingHours": "Mo-Su 00:00-23:59",
        "priceRange": "1500-5500 RON",
        "serviceArea": {
            "@type": "Country",
            "name": "Romania"
        }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
}); 