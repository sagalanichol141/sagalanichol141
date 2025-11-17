// Slideshow system with autoplay + manual buttons
document.querySelectorAll(".slideshow-container").forEach(container => {

    const track = container.querySelector(".slide-track");
    const slides = Array.from(track.children);

    let index = 0;

    function showSlide(i) {
        slides.forEach(s => s.style.display = "none");
        slides[i].style.display = "block";
    }

    showSlide(index);

    // Autoplay
    let auto = setInterval(() => {
        index = (index + 1) % slides.length;
        showSlide(index);
    }, 3000);

    const prevBtn = container.querySelector(".prev-btn");
    const nextBtn = container.querySelector(".next-btn");

    function restartAuto() {
        clearInterval(auto);
        auto = setInterval(() => {
            index = (index + 1) % slides.length;
            showSlide(index);
        }, 3000);
    }

    prevBtn.addEventListener("click", () => {
        index = (index - 1 + slides.length) % slides.length;
        showSlide(index);
        restartAuto();
    });

    nextBtn.addEventListener("click", () => {
        index = (index + 1) % slides.length;
        showSlide(index);
        restartAuto();
    });

});
