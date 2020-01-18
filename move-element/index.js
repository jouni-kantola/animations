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
    if (x) {
      const displayX = `${x}px`;
      box.style.left = displayX;
      xPos.innerText = displayX;
    }

    if (y) {
      const displayY = `${y}px`;
      box.style.top = displayY;
      yPos.innerText = displayY;
    }
  });
};
