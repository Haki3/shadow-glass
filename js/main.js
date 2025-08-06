/**
 * ShadowGlass - Main JavaScript File
 * Professional Window Tinting Services
 */

class ShadowGlass {
    constructor() {
        this.vehicleManager = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initNavigation();
        this.initHero();
        this.initSimulator();
        this.initGallery();
        this.initTestimonials();
        this.initContactForm();
        this.initScrollEffects();
        this.initAnimations();
        this.initVehicleAutocomplete();
        this.optimizeForMobile(); // Optimize for mobile devices
    }

    setupEventListeners() {
        // DOM loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
        } else {
            this.onDOMReady();
        }

        // Window events
        window.addEventListener('scroll', this.throttle(this.onScroll.bind(this), 16));
        window.addEventListener('resize', this.throttle(this.onResize.bind(this), 100));
    }

    onDOMReady() {
        // Initialize components that need DOM to be ready
        this.initIntersectionObserver();
        this.initBackToTop();
        this.initVehicleAutocomplete();
    }

    // Vehicle Autocomplete
    initVehicleAutocomplete() {
        // Wait for the VehicleAutocompleteManager to be available
        if (typeof VehicleAutocompleteManager !== 'undefined') {
            this.vehicleManager = new VehicleAutocompleteManager();
            this.vehicleManager.init('car-brand', 'car-model');
        } else {
            // Retry after a short delay if not loaded yet
            setTimeout(() => this.initVehicleAutocomplete(), 100);
        }
    }

    // Navigation
    initNavigation() {
        const navbar = document.getElementById('navbar');
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Mobile menu toggle
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            });
        }

        // Close mobile menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle?.classList.remove('active');
                navMenu?.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Smooth scroll for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Hero section
    initHero() {
        // Video eliminado - causaba botón play en móvil
        
        // Animate hero stats on load
        this.animateCounters();
    }

    animateCounters() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const finalValue = parseInt(stat.textContent.replace(/\D/g, ''));
            const suffix = stat.textContent.replace(/\d/g, '');
            let currentValue = 0;
            const increment = Math.ceil(finalValue / 50);
            
            const counter = setInterval(() => {
                currentValue += increment;
                if (currentValue >= finalValue) {
                    currentValue = finalValue;
                    clearInterval(counter);
                }
                stat.textContent = currentValue + suffix;
            }, 30);
        });
    }

    // Simulator
    initSimulator() {
        // Animation display elements
        const uvDisplay = document.getElementById('uv-display');
        const thermalDisplay = document.getElementById('thermal-display');
        const priceDisplay = document.getElementById('price-display');
        
        // Header elements
        const titleElement = document.getElementById('tint-type-title');
        const descriptionElement = document.getElementById('tint-type-description');
        const percentageElement = document.getElementById('tint-percentage');
        
        // Slider controls
        const sliderDots = document.querySelectorAll('.slider-dot');
        const progressBar = document.getElementById('progress-bar');

        // Simulator data for 3 tint types
        const tintTypes = [
            {
                title: 'Tintado Claro',
                description: 'Protección discreta manteniendo alta visibilidad',
                percentage: '20%',
                uv: '95%',
                thermal: '25%',
                price: '150€',
                color: '#f0f0f0'
            },
            {
                title: 'Tintado Medio',
                description: 'El equilibrio perfecto entre protección, privacidad y visibilidad',
                percentage: '35%',
                uv: '99%',
                thermal: '45%',
                price: '220€',
                color: '#cccccc'
            },
            {
                title: 'Tintado Oscuro',
                description: 'Máxima privacidad y protección premium',
                percentage: '50%',
                uv: '99%',
                thermal: '60%',
                price: '280€',
                color: '#999999'
            }
        ];

        let currentIndex = 1; // Start with medium tint (index 1)
        let autoSlideInterval;
        let isUserInteracting = false;

        const updateSlider = (index, animate = true) => {
            const tintData = tintTypes[index];
            
            // Update active dot
            sliderDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            
            // Update progress bar
            const progressWidth = ((index + 1) / tintTypes.length) * 100;
            if (progressBar) {
                progressBar.style.width = `${progressWidth}%`;
            }
            
            // Update header content with animation
            if (titleElement) {
                if (animate) {
                    titleElement.style.opacity = '0';
                    titleElement.style.transform = 'translateY(-10px)';
                    setTimeout(() => {
                        titleElement.textContent = tintData.title;
                        titleElement.style.opacity = '1';
                        titleElement.style.transform = 'translateY(0)';
                    }, 200);
                } else {
                    titleElement.textContent = tintData.title;
                }
            }
            
            if (descriptionElement) {
                if (animate) {
                    descriptionElement.style.opacity = '0';
                    setTimeout(() => {
                        descriptionElement.textContent = tintData.description;
                        descriptionElement.style.opacity = '1';
                    }, 300);
                } else {
                    descriptionElement.textContent = tintData.description;
                }
            }
            
            if (percentageElement) {
                if (animate) {
                    percentageElement.style.transform = 'scale(0.8)';
                    percentageElement.style.opacity = '0.5';
                    setTimeout(() => {
                        percentageElement.textContent = tintData.percentage;
                        percentageElement.style.transform = 'scale(1)';
                        percentageElement.style.opacity = '1';
                    }, 250);
                } else {
                    percentageElement.textContent = tintData.percentage;
                }
            }
            
            // Update benefit values with staggered animation
            const updateValue = (element, value, delay) => {
                if (!element) return;
                
                setTimeout(() => {
                    element.style.animation = 'none';
                    element.style.transform = 'scale(0.9)';
                    element.style.opacity = '0.6';
                    
                    setTimeout(() => {
                        element.textContent = value;
                        element.style.transform = 'scale(1)';
                        element.style.opacity = '1';
                        element.style.animation = 'valueGlow 2s ease-in-out infinite alternate';
                    }, 200);
                }, animate ? delay : 0);
            };
            
            updateValue(uvDisplay, tintData.uv, 100);
            updateValue(thermalDisplay, tintData.thermal, 200);
            updateValue(priceDisplay, tintData.price, 300);
        };

        const startAutoSlide = () => {
            autoSlideInterval = setInterval(() => {
                if (!isUserInteracting) {
                    currentIndex = (currentIndex + 1) % tintTypes.length;
                    updateSlider(currentIndex);
                }
            }, 8000); // Changed from 4000 to 8000 (8 seconds - half speed)
        };

        const stopAutoSlide = () => {
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
            }
        };

        // Manual controls
        sliderDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                isUserInteracting = true;
                currentIndex = index;
                updateSlider(currentIndex);
                
                stopAutoSlide();
                setTimeout(() => {
                    isUserInteracting = false;
                    startAutoSlide();
                }, 2000); // Resume auto-slide after 2 seconds
            });
        });

        // Pause on hover
        const simulatorDisplay = document.querySelector('.simulator-display');
        if (simulatorDisplay) {
            simulatorDisplay.addEventListener('mouseenter', () => {
                isUserInteracting = true;
            });
            
            simulatorDisplay.addEventListener('mouseleave', () => {
                isUserInteracting = false;
            });
        }

        // Initialize
        updateSlider(currentIndex, false);
        startAutoSlide();

        // Cleanup on page unload
        window.addEventListener('beforeunload', stopAutoSlide);
    }

    // Gallery
    initGallery() {
        const galleryZooms = document.querySelectorAll('.gallery-zoom');
        const modal = document.getElementById('gallery-modal');
        const modalImage = document.getElementById('modal-image');
        const modalClose = document.getElementById('modal-close');
        const modalOverlay = document.getElementById('modal-overlay');

        // Modal functionality
        galleryZooms.forEach(zoom => {
            zoom.addEventListener('click', () => {
                const imageSrc = zoom.getAttribute('data-image');
                if (modal && modalImage) {
                    modalImage.src = imageSrc;
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        // Close modal
        const closeModal = () => {
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        };

        modalClose?.addEventListener('click', closeModal);
        modalOverlay?.addEventListener('click', closeModal);
        
        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal?.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // Testimonials slider
    initTestimonials() {
        const track = document.getElementById('testimonial-track');
        const prevBtn = document.getElementById('testimonial-prev');
        const nextBtn = document.getElementById('testimonial-next');
        const indicators = document.querySelectorAll('.indicator');
        
        if (!track || !prevBtn || !nextBtn) return;

        let currentSlide = 0;
        const totalSlides = document.querySelectorAll('.testimonial-card').length;
        let autoSlideInterval;

        const updateSlider = () => {
            const translateX = -currentSlide * 100;
            track.style.transform = `translateX(${translateX}%)`;
            
            // Update indicators
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });
        };

        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        };

        const prevSlide = () => {
            currentSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
            updateSlider();
        };

        const goToSlide = (index) => {
            currentSlide = index;
            updateSlider();
        };

        const startAutoSlide = () => {
            autoSlideInterval = setInterval(nextSlide, 5000);
        };

        const stopAutoSlide = () => {
            clearInterval(autoSlideInterval);
        };

        // Event listeners
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoSlide();
            setTimeout(startAutoSlide, 5000);
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoSlide();
            setTimeout(startAutoSlide, 5000);
        });

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                goToSlide(index);
                stopAutoSlide();
                setTimeout(startAutoSlide, 5000);
            });
        });

        // Touch/swipe support
        let startX = 0;
        let isDragging = false;

        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            stopAutoSlide();
        });

        track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });

        track.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
            
            isDragging = false;
            setTimeout(startAutoSlide, 5000);
        });

        // Start auto-slide
        startAutoSlide();

        // Pause auto-slide when tab is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopAutoSlide();
            } else {
                startAutoSlide();
            }
        });
    }

    // Contact form
    initContactForm() {
        const form = document.getElementById('contact-form');
        
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<span>Enviando...</span>';
            submitBtn.disabled = true;

            try {
                // Simulate form submission (replace with actual API call)
                await this.submitForm(new FormData(form));
                
                // Success
                this.showNotification('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
                form.reset();
                
            } catch (error) {
                // Error
                this.showNotification('Error al enviar el mensaje. Por favor, inténtalo de nuevo.', 'error');
                console.error('Form submission error:', error);
                
            } finally {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });

        // Real-time validation
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    async submitForm(formData) {
        // This would typically send data to your backend
        // For now, simulate an API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success (90% of the time)
                if (Math.random() > 0.1) {
                    resolve({ success: true });
                } else {
                    reject(new Error('Simulated server error'));
                }
            }, 2000);
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove existing error
        this.clearFieldError(field);

        // Required field validation
        if (field.required && !value) {
            isValid = false;
            errorMessage = 'Este campo es obligatorio';
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Por favor, introduce un email válido';
            }
        }

        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[+]?[\d\s()-]{9,}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Por favor, introduce un teléfono válido';
            }
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.style.borderColor = '#dc2626';
        
        let errorElement = field.parentNode.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'field-error';
            errorElement.style.color = '#dc2626';
            errorElement.style.fontSize = '0.875rem';
            errorElement.style.marginTop = '0.25rem';
            errorElement.style.display = 'block';
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
    }

    clearFieldError(field) {
        field.style.borderColor = '';
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#16a34a' : '#dc2626'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);

        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }

    // Scroll effects
    initScrollEffects() {
        this.onScroll();
    }

    onScroll() {
        const navbar = document.getElementById('navbar');
        const backToTop = document.getElementById('back-to-top');
        
        // Navbar scroll effect
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Back to top button
        if (backToTop) {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }

        // Update active navigation link
        this.updateActiveNavLink();
    }

    updateActiveNavLink() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    initBackToTop() {
        const backToTop = document.getElementById('back-to-top');
        
        if (backToTop) {
            backToTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // Intersection Observer for animations
    initIntersectionObserver() {
        const animationElements = document.querySelectorAll(
            '.benefit-card, .type-card, .gallery-item, .testimonial-card, .contact-item'
        );

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animationElements.forEach(element => {
            observer.observe(element);
        });
    }

    // Initialize animations
    initAnimations() {
        // Add entrance animations to elements
        const elementsToAnimate = document.querySelectorAll(
            '.hero-content, .section-header'
        );

        elementsToAnimate.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    }

    onResize() {
        // Handle window resize events
        this.updateSimulator();
    }

    updateSimulator() {
        // Update simulator dimensions if needed
        const simulator = document.querySelector('.simulator-display');
        if (simulator) {
            // Any resize-specific simulator updates
        }
    }

    // Device detection for mobile optimizations
    isMobile() {
        return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    isTouch() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    }

    // Optimize performance for mobile devices
    optimizeForMobile() {
        if (this.isMobile()) {
            // Reduce animation complexity on mobile
            document.documentElement.style.setProperty('--animation-duration', '0.2s');
            
            // Disable hover effects on touch devices
            if (this.isTouch()) {
                document.body.classList.add('touch-device');
            }
            
            // Optimize scroll behavior
            this.setupMobileScrollOptimization();
        }
    }

    setupMobileScrollOptimization() {
        let ticking = false;
        
        const optimizedScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.onScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', optimizedScroll, { passive: true });
    }

    // Utility functions
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    debounce(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // Lazy loading for images
    initLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const image = entry.target;
                        image.src = image.dataset.src || image.src;
                        image.classList.remove('lazy');
                        observer.unobserve(image);
                    }
                });
            });

            images.forEach(image => imageObserver.observe(image));
        }
    }

    // Performance monitoring
    initPerformanceMonitoring() {
        // Monitor Core Web Vitals
        if ('web-vital' in window) {
            // This would require the web-vitals library
            // For now, just log page load time
            window.addEventListener('load', () => {
                const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
                console.log(`Page load time: ${loadTime}ms`);
            });
        }
    }

    // Error handling
    initErrorHandling() {
        window.addEventListener('error', (error) => {
            console.error('JavaScript error:', error);
            // You could send errors to a logging service here
        });

        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
            // You could send errors to a logging service here
        });
    }
}

// Initialize the application
const shadowGlass = new ShadowGlass();

// Export for testing or external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ShadowGlass;
}
