const boxSelector = ".box";
const box = document.querySelector(boxSelector);
const xPos = box.querySelector(".x");
const yPos = box.querySelector(".y");

const isActiveCssClass = "is-active";

let mousePressed = false;
let isSelected = false;
document.addEventListener("mousedown", e => {
  mousePressed = true;
  isSelected = event.target.closest(boxSelector);
  if (isSelected) {
    box.classList.add(isActiveCssClass);
  } else {
    deselectBox();
  }
});

const deselectBox = () => {
  box.classList.remove(isActiveCssClass);
  isSelected = false;
};

document.addEventListener("mouseup", e => {
  mousePressed = false;
});

document.addEventListener("mousemove", e => {
  if (isSelected && mousePressed) {
    const x = e.clientX - 10;
    const y = e.clientY - 10;
    moveBox(x, y);
  }
});

document.addEventListener("touchstart", event => {
  mousePressed = true;
  isSelected = event.target.closest(boxSelector);
  if (isSelected) {
    box.classList.add(isActiveCssClass);
  } else {
    deselectBox();
  }
});

document.addEventListener("touchend", () => {
  mousePressed = false;
});

document.addEventListener("touchmove", e => {
  if (isSelected && mousePressed) {
    const { touches } = e;
    const x = touches[0].clientX - 10;
    const y = touches[0].clientY - 10;
    moveBox(x, y);
  }
});

window.addEventListener("keydown", event => {
  const moveBy = 10;
  if (isSelected) {
    const x = +box.style.left.split("px")[0] || 0;
    const y = +box.style.top.split("px")[0] || 0;
    switch (event.key) {
      case "ArrowLeft":
        moveBox(x - moveBy);
        break;
      case "ArrowUp":
        moveBox(0, y - moveBy);
        break;
      case "ArrowRight":
        moveBox(x + moveBy);
        break;
      case "ArrowDown":
        moveBox(0, y + moveBy);
        break;
      case "Enter":
        deselectBox();
        break;
    }
  }
});

const moveBox = (x = 0, y = 0) => {
  requestAnimationFrame(() => {
    if (x) box.style.left = `${x}px`;
    if (y) box.style.top = `${y}px`;
  });
};

const displayPosition = () => {
  const x = +box.style.left.split("px")[0] || 0;
  const y = +box.style.top.split("px")[0] || 0;

  xPos.innerText = `${x}px`;
  yPos.innerText = `${y}px`;

  requestAnimationFrame(displayPosition);
};

displayPosition();
