/* -- Carousel Navigation -- */
let activeIndex = 0;
let lastKeyPress = 0;
const slides = document.getElementsByTagName("article");

const handleLeftClick = (swipe = false) => {
  const nextIndex = activeIndex - 1 >= 0 ? activeIndex - 1 : slides.length - 1;
  
  const currentSlide = document.querySelector(`[data-index="${activeIndex}"]`),
        nextSlide = document.querySelector(`[data-index="${nextIndex}"]`);
        
  currentSlide.dataset.status = "after";
  
  nextSlide.dataset.status = "becoming-active-from-before";
  
  setTimeout(() => {
    nextSlide.dataset.status = "active";
    activeIndex = nextIndex;
  }, swipe ? 50 : 0);
}

const handleRightClick = (swipe = false) => {
  const nextIndex = activeIndex + 1 <= slides.length - 1 ? activeIndex + 1 : 0;
  
  const currentSlide = document.querySelector(`[data-index="${activeIndex}"]`),
        nextSlide = document.querySelector(`[data-index="${nextIndex}"]`);
  
  currentSlide.dataset.status = "before";
  
  nextSlide.dataset.status = "becoming-active-from-after";
  
  setTimeout(() => {
    nextSlide.dataset.status = "active";
    activeIndex = nextIndex;
  }, swipe ? 50 : 0);
}

document.onkeydown = (e) => {
const now = Date.now();
if (now - lastKeyPress < 500) return;
lastKeyPress = now;

if (e.key === 'ArrowRight') {
handleRightClick();
} else if (e.key === 'ArrowLeft') {
handleLeftClick();
}
};

for (let i = 0; i < slides.length; i++) {
const mc = new Hammer(slides[i]);
mc.on("swipeleft", () => handleRightClick(true));
mc.on("swiperight", () => handleLeftClick(true));
}

/* -- Mobile Nav Toggle -- */

const nav = document.querySelector("nav");

const handleNavToggle = () => {  
  nav.dataset.transitionable = "true";
  
  nav.dataset.toggled = nav.dataset.toggled === "true" ? "false" : "true";
}

window.matchMedia("(max-width: 800px)").onchange = e => {
  nav.dataset.transitionable = "false";

  nav.dataset.toggled = "false";
};