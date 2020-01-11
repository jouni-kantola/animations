const progress = document.querySelector(".progress-indicator");
const content = document.querySelector(".content");

let pageHeight, pageWidth, windowHeight;

const indicateProgress = () => {
  const scrollY = window.scrollY;
  const percentageProgressed = Math.round(
    (scrollY / (pageHeight - windowHeight)) * 100
  );
  progress.style.width = `${percentageProgressed}%`;
};

const measurePage = () => {
  pageHeight = document.documentElement.scrollHeight;
  pageWidth = document.documentElement.scrollWidth;
  windowHeight = window.innerHeight;
};

// recalculate on scroll or resize
window.addEventListener("scroll", e => {
  window.requestAnimationFrame(indicateProgress);
});

window.addEventListener("resize", e => {
  window.requestAnimationFrame(() => {
    measurePage();
    indicateProgress();
  });
});

// set initial values
measurePage();
indicateProgress();
