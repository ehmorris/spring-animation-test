// Based on https://github.com/hatsumatsu/spring
export const makeSpring = (
  initialValue = 0,
  { stiffness = 200, damping = 10, precision = 50, mass = 1 }
) => {
  let frameTime = performance.now();
  let value = initialValue;
  let endValue = 0;
  let velocity = 0;
  let isRested = true;

  const update = (time = performance.now()) => {
    const distance = endValue - value;
    const acceleration = (stiffness * distance) / mass - damping * velocity;

    const newVelocity =
      velocity +
      acceleration * ((time - (frameTime || performance.now())) / 1000);
    const newValue =
      value + newVelocity * ((time - (frameTime || performance.now())) / 1000);

    // velocity smaller than 1 / precision OR new distance smaller than 1 / precision
    isRested =
      Math.abs(newVelocity) < 1 / precision &&
      Math.abs(newValue - endValue) < 1 / precision;

    value = isRested ? endValue : newValue;
    velocity = newVelocity;

    // null frame time on rest so we can start with a fresh cycle
    frameTime = isRested ? null : time;
  };

  return {
    setEndValue: (v) => (endValue = v),
    getCurrentValue: () => value,
    update,
  };
};
