// Based on https://github.com/hatsumatsu/spring
export const makeSpring = (
  initialValue = 0,
  { stiffness = 200, damping = 10, precision = 50, mass = 1 }
) => {
  let currentValue = initialValue;
  let endValue = initialValue; // initialize spring at rest
  let velocity = 0;
  let atRest = true;
  let lastUpdateTime = performance.now();

  const update = () => {
    const thisUpdateTime = performance.now();
    const deltaTime = thisUpdateTime - lastUpdateTime;
    const difference = endValue - currentValue;
    const acceleration = (stiffness * difference) / mass - damping * velocity;
    const newVelocity = velocity + acceleration * (deltaTime / 1000);
    const newValue = currentValue + newVelocity * (deltaTime / 1000);

    atRest =
      Math.abs(newVelocity) < 1 / precision &&
      Math.abs(newValue - endValue) < 1 / precision;

    currentValue = atRest ? endValue : newValue;
    velocity = newVelocity;
    lastUpdateTime = thisUpdateTime;
  };

  return {
    setEndValue: (v) => (endValue = v),
    getCurrentValue: () => currentValue,
    update,
  };
};
