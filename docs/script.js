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