export const animate = (drawFunc) => {
  let previousTimestamp = false;

  const drawFuncContainer = (timestamp) => {
    const deltaTime = previousTimestamp
      ? timestamp - previousTimestamp
      : performance.now() - timestamp;
    drawFunc(deltaTime);
    window.requestAnimationFrame(drawFuncContainer);
    previousTimestamp = timestamp;
  };

  window.requestAnimationFrame(drawFuncContainer);
};
