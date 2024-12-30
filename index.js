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
  CTX.arc(0, 0, 60, 0, Math.PI * 2);
  CTX.closePath();
  CTX.fill();
  CTX.restore();

  CTX.save();
  CTX.fillStyle = "white";
  CTX.fillText(`BOTH SPRINGS`, 24, 24);
  CTX.fillText(`${xSpring.getStiffness().toFixed(1)} stiffness`, 24, 40);
  CTX.fillText(`${xSpring.getDamping().toFixed(2)} damping`, 24, 56);
  CTX.fillText(`${xSpring.getMass().toFixed(2)} mass`, 24, 72);
  CTX.restore();
});

document.addEventListener("pointerdown", ({ clientX, clientY }) => {
  xSpring.setEndValue(clientX);
  ySpring.setEndValue(clientY);
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
