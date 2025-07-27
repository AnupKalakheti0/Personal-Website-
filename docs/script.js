 // Handle navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('scrolled', window.scrollY > 0);
});

// Image slider functionality
const slider = document.getElementById('slider');
let isTransitioning = false;

function nextSlide() {
    if (isTransitioning) return;
    
    isTransitioning = true;

    // Animate the slide
    slider.style.transform = `translateX(-40%)`;
    slider.style.transition = 'transform 1s ease-in';

    setTimeout(() => {
        // Move first image to end after animation
        const firstImage = slider.firstElementChild;
        slider.appendChild(firstImage);

        // Reset position without animation
        slider.style.transition = 'none';
        slider.style.transform = 'translateX(0)';

        // Force reflow to apply reset
        void slider.offsetHeight;

        isTransitioning = false;
    }, 1000);
}

// Start automatic sliding
setInterval(nextSlide, 5000);

// Handle window resize
window.addEventListener('resize', () => {
    slider.style.transition = 'none';
    slider.style.transform = 'translateX(0)';
    void slider.offsetHeight;
});


// Thought Card Read More / Show Translation functionality (for thought.html)
document.addEventListener('DOMContentLoaded', () => {
    const thoughtCards = document.querySelectorAll('.thought-card');

    thoughtCards.forEach(card => {
        const shortText = card.querySelector('.short-text');
        const fullText = card.querySelector('.full-text');
        const readMoreBtn = card.querySelector('.read-more-btn');
        const translateBtn = card.querySelector('.translate-btn');
        const translationText = card.querySelector('.thought-translation');

        // Initial state for read more
        if (fullText && readMoreBtn) {
            readMoreBtn.addEventListener('click', () => {
                if (fullText.classList.contains('hidden')) {
                    shortText.classList.add('hidden');
                    fullText.classList.remove('hidden');
                    readMoreBtn.textContent = 'Read Less';
                } else {
                    shortText.classList.remove('hidden');
                    fullText.classList.add('hidden');
                    readMoreBtn.textContent = 'Read More';
                }
            });
        }

        // Initial state for translation
        if (translationText && translateBtn) {
            translationText.classList.add('hidden'); // Ensure hidden on load
            translateBtn.addEventListener('click', () => {
                if (translationText.classList.contains('hidden')) {
                    translationText.classList.remove('hidden');
                    translateBtn.textContent = 'Hide Translation';
                } else {
                    translationText.classList.add('hidden');
                    translateBtn.textContent = 'Show Translation';
                }
            });
        }
    });
});

// Blog Post Translation Functionality
function toggleTranslation() {
    const translation = document.getElementById('translation');
    const translateBtn = document.querySelector('.translate-btn');
    
    if (translation && translateBtn) {
        if (translation.classList.contains('hidden')) {
            translation.classList.remove('hidden');
            translateBtn.innerHTML = '<i class="fas fa-eye-slash"></i><span>Hide Translation</span>';
        } else {
            translation.classList.add('hidden');
            translateBtn.innerHTML = '<i class="fas fa-language"></i><span>Translate</span>';
        }
    }
}


// Mobile detection
const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
};

// Touch-friendly interactions
const initTouchInteractions = () => {
    if (isMobile()) {
        // Add touch feedback to interactive elements
        const touchElements = document.querySelectorAll('.nav-links a, .social-icon, .read-more-btn, .submit-btn, .gallery-label, .watch-btn');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
                this.style.transition = 'transform 0.1s ease';
            });
            
            element.addEventListener('touchend', function() {
                this.style.transform = '';
                this.style.transition = '';
            });
        });
    }
};

// Mobile navigation enhancements
const initMobileNavigation = () => {
    const navbar = document.querySelector('.navbar');
    const dropdown = document.querySelector('.dropdown');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    if (isMobile() && dropdown) {
        // Mobile dropdown toggle
        dropdown.addEventListener('click', function(e) {
            e.preventDefault();
            dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                dropdownMenu.style.display = 'none';
            }
        });
    }
    
    // Smooth scroll for mobile navigation
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
};

// Mobile image slider enhancements
const initMobileSlider = () => {
    const slider = document.getElementById('slider');
    if (!slider || !isMobile()) return;
    
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    slider.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        isDragging = true;
        this.style.transition = 'none';
    });
    
    slider.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        e.preventDefault();
        currentX = e.touches[0].clientX;
        const diff = currentX - startX;
        this.style.transform = `translateX(${diff}px)`;
    });
    
    slider.addEventListener('touchend', function(e) {
        if (!isDragging) return;
        isDragging = false;
        this.style.transition = 'transform 0.3s ease';
        
        const diff = currentX - startX;
        if (Math.abs(diff) > 50) {
            // Swipe detected
            if (diff > 0) {
                // Swipe right - previous slide
                this.style.transform = 'translateX(100%)';
            } else {
                // Swipe left - next slide
                this.style.transform = 'translateX(-100%)';
            }
        } else {
            // Return to original position
            this.style.transform = 'translateX(0)';
        }
    });
};

// Mobile gallery filter enhancements
const initMobileGalleryFilter = () => {
    if (!isMobile()) return;
    
    const filterLabels = document.querySelectorAll('.gallery-label');
    const galleryItems = document.querySelectorAll('.gallery-gradient');
    
    filterLabels.forEach(label => {
        label.addEventListener('click', function() {
            const filter = this.getAttribute('for').replace('check', '');
            
            // Update active filter
            filterLabels.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (filter === '1' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.3s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
};

// Mobile form enhancements
const initMobileFormEnhancement = () => {
    if (!isMobile()) return;
    
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        // Auto-resize textarea
        if (input.tagName === 'TEXTAREA') {
            input.addEventListener('input', function() {
                this.style.height = 'auto';
                this.style.height = this.scrollHeight + 'px';
            });
        }
        
        // Focus enhancement
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.2s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
    
    // Form submission feedback
    form.addEventListener('submit', function(e) {
        const submitBtn = this.querySelector('.submit-btn');
        if (submitBtn) {
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Re-enable after 3 seconds (simulate submission)
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                setTimeout(() => {
                    submitBtn.textContent = 'Send Message';
                    submitBtn.disabled = false;
                }, 2000);
            }, 3000);
        }
    });
};

// Mobile performance optimizations
const initMobilePerformance = () => {
    if (!isMobile()) return;
    
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Reduce animations on mobile for better performance
    if (window.innerWidth <= 480) {
        document.body.style.setProperty('--animation-duration', '0.2s');
    }
};

// Mobile accessibility enhancements
const initMobileAccessibility = () => {
    if (!isMobile()) return;
    
    // Increase touch targets
    const smallTouchTargets = document.querySelectorAll('button, a, input[type="submit"]');
    smallTouchTargets.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.width < 44 || rect.height < 44) {
            element.style.minWidth = '44px';
            element.style.minHeight = '44px';
            element.style.padding = '12px';
        }
    });
    
    // Add ARIA labels for better screen reader support
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        if (!icon.getAttribute('aria-label')) {
            const platform = icon.classList.contains('facebook') ? 'Facebook' :
                           icon.classList.contains('twitter') ? 'Twitter' :
                           icon.classList.contains('instagram') ? 'Instagram' :
                           icon.classList.contains('linkedin') ? 'LinkedIn' : 'Social Media';
            icon.setAttribute('aria-label', `Visit ${platform} profile`);
        }
    });
};

// Mobile viewport and orientation handling
const initMobileViewport = () => {
    // Prevent zoom on input focus
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            if (isMobile()) {
                this.style.fontSize = '16px'; // Prevents zoom on iOS
            }
        });
    });
    
    // Handle orientation changes
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            // Recalculate layout after orientation change
            window.dispatchEvent(new Event('resize'));
        }, 100);
    });
};

// Mobile scroll optimizations
const initMobileScroll = () => {
    if (!isMobile()) return;
    
    // Smooth scrolling for mobile
    const smoothScrollElements = document.querySelectorAll('a[href^="#"]');
    smoothScrollElements.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll indicator for mobile
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    scrollIndicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #00eaff, #ffd700);
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(scrollIndicator);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollIndicator.style.width = scrollPercent + '%';
    });
};

// Initialize all mobile enhancements
document.addEventListener('DOMContentLoaded', function() {
    initTouchInteractions();
    initMobileNavigation();
    initMobileSlider();
    initMobileGalleryFilter();
    initMobileFormEnhancement();
    initMobilePerformance();
    initMobileAccessibility();
    initMobileViewport();
    initMobileScroll();
    
    // Add mobile-specific CSS classes
    if (isMobile()) {
        document.body.classList.add('mobile-device');
        if (window.innerWidth <= 480) {
            document.body.classList.add('small-mobile');
        }
        if (window.innerWidth <= 360) {
            document.body.classList.add('extra-small-mobile');
        }
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    // Re-initialize mobile features on resize
    if (isMobile()) {
        initMobileNavigation();
        initMobileAccessibility();
    }
});

// Add CSS animations for mobile
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .mobile-device .gallery-gradient {
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    
    .mobile-device .gallery-gradient:active {
        transform: scale(0.98);
    }
    
    .small-mobile .section-title {
        font-size: 1.6rem !important;
    }
    
    .extra-small-mobile .section-title {
        font-size: 1.4rem !important;
    }
    
    .gallery-label.active {
        background: linear-gradient(90deg, #00eaff 0%, #ffd700 100%) !important;
        color: #0f172a !important;
    }
`;
document.head.appendChild(style);