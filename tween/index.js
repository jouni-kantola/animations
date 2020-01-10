const easeOut = (progress, power = 2) => {
  return 1 - (1 - progress) ** power;
};

const tween = ({
  from = 0,
  to = 1,
  duration = 300,
  ease = easeOut,
  onUpdate = () => {}
} = {}) => {
  const startTime = performance.now();
  const delta = to - from;

  const update = currentTime => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const latest = from + ease(progress) * delta;
    onUpdate(latest);

    console.log(latest);
    if (progress < 1) requestAnimationFrame(update);
  };

  requestAnimationFrame(update);
};

const ball = document.getElementById("ball");

tween({
  to: 200,
  duration: 4000,
  onUpdate: v => {
    ball.style.transform = `translateX(${v}px) translateY(${v}px) translateZ(0)`;
    ball.style.width = `${v}px`;
    ball.style.height = `${v}px`;
  }
});
