document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    const icon = document.getElementById("hamburger-icon");

    toggleBtn.addEventListener("click", () => {
        toggleMobileMenu();
    });

    // Closes the mobile menu when a link is clicked
    const mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (!mobileMenu.classList.contains("max-h-0")) {
                toggleMobileMenu();
            }
        });
    });

    function toggleMobileMenu() {
        if (mobileMenu.classList.contains("max-h-0")) {
            mobileMenu.classList.remove("max-h-0");
            mobileMenu.classList.add("max-h-screen");
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        } else {
            mobileMenu.classList.remove("max-h-screen");
            mobileMenu.classList.add("max-h-0");
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }
    }
});


const carousel = document.getElementById('carousel');

let currentIndex = 0;

const slides = Array.from(carousel.children);

const originalSlideCount = slides.length;

// Clone original slides
slides.forEach(slide => {
    const clone = slide.cloneNode(true);
    carousel.appendChild(clone);
});
// Dynamic slide width
function getSlideWidth() {
    return carousel.children[0].getBoundingClientRect().width + 16; // 16 for px-2
}

function nextSlide() {
    currentIndex++;
    carousel.style.transition = 'transform 0.5s ease-in-out';
    carousel.style.transform = `translateX(-${currentIndex * getSlideWidth()}px)`;

    if (currentIndex === originalSlideCount) {
        setTimeout(() => {
        carousel.style.transition = 'none';
        carousel.style.transform = 'translateX(0)';
        currentIndex = 0;
        }, 500);
    }
}

setInterval(nextSlide, 4000);
    window.addEventListener('resize', () => {
    // Optional: Reset transform on resize to avoid weird spacing
    carousel.style.transition = 'none';
    carousel.style.transform = `translateX(-${currentIndex * getSlideWidth()}px)`;
});