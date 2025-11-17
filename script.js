function initSlideshows() {
    const slideshows = document.querySelectorAll('.slideshow');

    slideshows.forEach(slideshow => {
        let slideIndex = 0;
        const slides = slideshow.querySelectorAll('.slide');

        // show first slide
        slides[0].style.display = "block";

        slideshow.querySelector('.prev').addEventListener("click", () => {
            slides[slideIndex].style.display = "none";
            slideIndex = (slideIndex - 1 + slides.length) % slides.length;
            slides[slideIndex].style.display = "block";
        });

        slideshow.querySelector('.next').addEventListener("click", () => {
            slides[slideIndex].style.display = "none";
            slideIndex = (slideIndex + 1) % slides.length;
            slides[slideIndex].style.display = "block";
        });
    });
}

window.onload = initSlideshows;
