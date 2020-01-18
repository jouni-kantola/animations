const boxSelector = ".box";
const box = document.querySelector(boxSelector);
const xPos = box.querySelector(".x");
const yPos = box.querySelector(".y");

const isActiveCssClass = "is-active";

let isActive = false;
let isSelected = false;

const activate = event => {
  isActive = true;
  isSelected = event.target.closest(boxSelector);
  if (isSelected) {
    box.classList.add(isActiveCssClass);
  } else {
    deselectBox();
  }
};

const deactivate = event => {
  isActive = false;
};

const deselectBox = () => {
  box.classList.remove(isActiveCssClass);
  isSelected = false;
};

document.addEventListener("mousedown", activate);
document.addEventListener("touchstart", activate);
document.addEventListener("mouseup touchend", deactivate);
document.addEventListener("mouseup", deactivate);

document.addEventListener("mousemove", event => {
  if (isSelected && isActive) {
    const x = event.clientX - 10;
    const y = event.clientY - 10;
    moveBox(x, y);
  }
});

document.addEventListener("touchmove", event => {
  if (isSelected && isActive) {
    const { touches } = event;
    const x = Math.round(touches[0].clientX - 10);
    const y = Math.round(touches[0].clientY - 10);
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
