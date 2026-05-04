document.addEventListener('DOMContentLoaded', () => {
    // Initialize all slideshows
    document.querySelectorAll(".slideshow-container").forEach(container => {
        const type = container.dataset.type; // "img" or "video"
        const track = container.querySelector(".slide-track");
        // Convert children to real array and ensure they have 'slide' class
        const slides = Array.from(track.children);
        slides.forEach(slide => slide.classList.add('slide'));
        
        let index = 0;
        let autoInterval = null;
        
        if(slides.length === 0) return;

        // Show initial slide
        slides[0].classList.add("active");

        function showSlide(i) {
            slides.forEach(s => s.classList.remove("active"));
            slides[i].classList.add("active");
        }

        // Auto slide ONLY for images
        if (type === "img" && slides.length > 1) {
            startAutoSlide();
        }

        function startAutoSlide() {
            autoInterval = setInterval(() => {
                index = (index + 1) % slides.length;
                showSlide(index);
            }, 3500);
        }

        function restartAutoSlide() {
            if (type !== "img" || slides.length <= 1) return;
            clearInterval(autoInterval);
            startAutoSlide();
        }

        const prevBtn = container.querySelector(".prev-btn");
        const nextBtn = container.querySelector(".next-btn");

        if(prevBtn) {
            prevBtn.addEventListener("click", () => {
                index = (index - 1 + slides.length) % slides.length;
                showSlide(index);
                restartAutoSlide();
            });
        }

        if(nextBtn) {
            nextBtn.addEventListener("click", () => {
                index = (index + 1) % slides.length;
                showSlide(index);
                restartAutoSlide();
            });
        }
        
        // Pause auto-slide on hover for better UX
        if (type === "img") {
            container.addEventListener('mouseenter', () => clearInterval(autoInterval));
            container.addEventListener('mouseleave', () => restartAutoSlide());
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if(target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
