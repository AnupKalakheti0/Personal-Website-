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
// "Read More" toggle functionality for each thought card.
const readMoreButtons = document.querySelectorAll('.read-more-btn');
readMoreButtons.forEach(button => {
    button.addEventListener('click', () => {
// Toggle the expansion of the adjacent thought-text paragraph.
    const thoughtText = button.previousElementSibling;
        thoughtText.classList.toggle('expanded');
        button.textContent = thoughtText.classList.contains('expanded') ? 'Show Less' : 'Read More';
    });
});
// "Show Translation" toggle functionality for each thought card.
const translateButtons = document.querySelectorAll('.translate-btn');
translateButtons.forEach(button => {
    button.addEventListener('click', () => {
// Toggle the visibility of the translation paragraph.
        const translationText = button.nextElementSibling;
        translationText.classList.toggle('visible');
        button.textContent = translationText.classList.contains('visible') ? 'Hide Translation' : 'Show Translation';
    });
});