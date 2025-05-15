// Carouseul auto scroll for Service area section
const carosuel = document.getElementById('carosuel');

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('API endpoint');
        const cards = await response.json();

        carosuel.innerHTML = '';

        cards.forEach(card => {
            const cardHTML = `
                <div class="w-[100%] sm:w-[50%] md:w-[33.33%] lg:w-[33.33%] shrink-0 carousel-item">
                    <div class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-500">
                        <img 
                            src="${card.imageUrl}"
                            alt="Cause 1" 
                            class="w-[300px] h-[350px] object-cover mx-auto mt-4 rounded" 
                        />
                        <div class="p-4">
                            <h3 class="text-lg font-semibold mb-2">${card.category}</h3>
                            <p class="text-gray-500 mb-2">${card.description}</p>
                        </div>
                    </div>
                </div>
            `;
            carosuel.insertAdjacentHTML('beforeend', cardHTML)
        });

        // carosuel auto scroll
        let currentIndex = 0;

        const slides = Array.from(carosuel.children);

        const originalSlideCount = slides.length;

        // Clone original slides
        slides.forEach(slide => {
            const clone = slide.cloneNode(true);
            carosuel.appendChild(clone);
        });
        // Dynamic slide width
        function getSlideWidth() {
            return carosuel.children[0].getBoundingClientRect().width + 16; // 16 for px-2
        }

        function nextSlide() {
            currentIndex++;
            carosuel.style.transition = 'transform 0.5s ease-in-out';
            carosuel.style.transform = `translateX(-${currentIndex * getSlideWidth()}px)`;

            if (currentIndex === originalSlideCount) {
                setTimeout(() => {
                carosuel.style.transition = 'none';
                carosuel.style.transform = 'translateX(0)';
                currentIndex = 0;
                }, 500);
            }
        }

        setInterval(nextSlide, 3500);
            window.addEventListener('resize', () => {
            // Optional: Reset transform on resize to avoid weird spacing
            carosuel.style.transition = 'none';
            carosuel.style.transform = `translateX(-${currentIndex * getSlideWidth()}px)`;
        });
    } catch (error) {
        console.log("Failed to load cards", error);
    }
});

