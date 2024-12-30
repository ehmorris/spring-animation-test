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
  stiffness: 70,
  damping: 8,
  mass: 1.2,
});

const ySpring = makeSpring(canvasManager.getHeight() / 2, {
  stiffness: 70,
  damping: 8,
  mass: 1.2,
});

animate(() => {
  CTX.clearRect(0, 0, canvasManager.getWidth(), canvasManager.getHeight());

  xSpring.update();
  ySpring.update();

  CTX.save();
  CTX.fillStyle = "red";
  CTX.translate(xSpring.getCurrentValue(), ySpring.getCurrentValue());
  CTX.beginPath();
  CTX.arc(0, 0, 100, 0, Math.PI * 2);
  CTX.closePath();
  CTX.fill();
  CTX.restore();
});

document.addEventListener("pointermove", ({ clientX, clientY }) => {
  xSpring.setEndValue(clientX);
  ySpring.setEndValue(clientY);
});
