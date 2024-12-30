import { makeCanvasManager } from "./canvas.js";
import { animate } from "./helpers.js";
import { makeSpring } from "./spring.js";

const canvasManager = makeCanvasManager({
  initialWidth: window.innerWidth,
  initialHeight: window.innerHeight,
  attachNode: "#canvas",
});

const CTX = canvasManager.getContext();

const xSpring = makeSpring(canvasManager.getWidth() / 2, {
  stiffness: 90,
  damping: 10,
  mass: 1.3,
});

const ySpring = makeSpring(canvasManager.getHeight() / 2, {
  stiffness: 90,
  damping: 10,
  mass: 1.3,
});

const scaleSpring = makeSpring(1, {
  stiffness: 120,
  damping: 16,
  mass: 0.9,
});

const lightnessSpring = makeSpring(50, {
  stiffness: 120,
  damping: 16,
  mass: 0.9,
});

animate(() => {
  CTX.clearRect(0, 0, canvasManager.getWidth(), canvasManager.getHeight());

  xSpring.update();
  ySpring.update();
  scaleSpring.update();
  lightnessSpring.update();

  CTX.save();
  CTX.fillStyle = `hsl(355, 100%, ${lightnessSpring.getCurrentValue()}%)`;
  CTX.translate(xSpring.getCurrentValue(), ySpring.getCurrentValue());
  CTX.scale(scaleSpring.getCurrentValue(), scaleSpring.getCurrentValue());
  CTX.beginPath();
  CTX.arc(0, 0, 60, 0, Math.PI * 2);
  CTX.closePath();
  CTX.fill();
  CTX.restore();

  CTX.save();
  CTX.fillStyle = "white";
  CTX.translate(24, 40);
  CTX.font = "bold 12px sans-serif";
  CTX.fillText(`POSITION SPRINGS`, 0, 0);
  CTX.font = "normal 12px sans-serif";
  CTX.fillText(`${xSpring.getStiffness().toFixed(1)} stiffness`, 0, 16);
  CTX.fillText(`${xSpring.getDamping().toFixed(2)} damping`, 0, 32);
  CTX.fillText(`${xSpring.getMass().toFixed(2)} mass`, 0, 48);
  CTX.restore();
});

document.addEventListener("pointerdown", ({ clientX, clientY }) => {
  xSpring.setEndValue(clientX);
  ySpring.setEndValue(clientY);
  scaleSpring.setEndValue(0.85);
  lightnessSpring.setEndValue(20);
});

document.addEventListener("pointerup", () => {
  scaleSpring.setEndValue(1);
  lightnessSpring.setEndValue(50);
});

document.addEventListener("pointermove", ({ clientX, clientY }) => {
  xSpring.setEndValue(clientX);
  ySpring.setEndValue(clientY);
});

document.addEventListener("keydown", ({ key, shiftKey }) => {
  if (key === "s") {
    xSpring.updateProps({ stiffness: xSpring.getStiffness() + 1 });
    ySpring.updateProps({ stiffness: ySpring.getStiffness() + 1 });
  }

  if (key === "S" && shiftKey) {
    xSpring.updateProps({ stiffness: xSpring.getStiffness() - 1 });
    ySpring.updateProps({ stiffness: ySpring.getStiffness() - 1 });
  }

  if (key === "d") {
    xSpring.updateProps({ damping: xSpring.getDamping() + 1 });
    ySpring.updateProps({ damping: ySpring.getDamping() + 1 });
  }

  if (key === "D" && shiftKey) {
    xSpring.updateProps({ damping: xSpring.getDamping() - 1 });
    ySpring.updateProps({ damping: ySpring.getDamping() - 1 });
  }

  if (key === "m") {
    xSpring.updateProps({ mass: xSpring.getMass() + 0.1 });
    ySpring.updateProps({ mass: ySpring.getMass() + 0.1 });
  }

  if (key === "M" && shiftKey) {
    xSpring.updateProps({ mass: xSpring.getMass() - 0.1 });
    ySpring.updateProps({ mass: ySpring.getMass() - 0.1 });
  }
});
