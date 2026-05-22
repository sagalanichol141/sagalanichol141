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

        if (slides.length === 0) return;

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

        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                index = (index - 1 + slides.length) % slides.length;
                showSlide(index);
                restartAutoSlide();
            });
        }

        if (nextBtn) {
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

    // Tab Switching Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tab;

            // Update buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update content sections
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === target) {
                    content.classList.add('active');
                }
            });

            // Scroll to top of content area on mobile
            if (window.innerWidth <= 768) {
                const mainLayout = document.querySelector('.main-layout');
                if (mainLayout) {
                    window.scrollTo({
                        top: mainLayout.offsetTop - 20,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Video Carousel Logic (for tool cards with multiple videos)
    document.querySelectorAll('.video-carousel').forEach(carousel => {
        const slides = carousel.querySelectorAll('.video-slide');
        const counter = carousel.querySelector('.vid-counter');
        const prevBtn = carousel.querySelector('.vid-prev-btn');
        const nextBtn = carousel.querySelector('.vid-next-btn');
        let current = 0;

        function goTo(index) {
            slides[current].classList.remove('active');
            current = (index + slides.length) % slides.length;
            slides[current].classList.add('active');
            if (counter) counter.textContent = `${current + 1} / ${slides.length}`;
        }

        if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
