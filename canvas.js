export const makeCanvasManager = ({
  initialWidth,
  initialHeight,
  attachNode,
}) => {
  let width = initialWidth;
  let height = initialHeight;
  const element = document.createElement("canvas");
  const context = element.getContext("2d");
  const scale = window.devicePixelRatio;

  const setCanvasSize = () => {
    element.style.width = width + "px";
    element.style.height = height + "px";
    element.width = Math.floor(width * scale);
    element.height = Math.floor(height * scale);
    context.scale(scale, scale);
  };

  setCanvasSize();

  document.querySelector(attachNode).appendChild(element);

  window.addEventListener("resize", () => {
    width = window.innerWidth;
    height = window.innerHeight;
    setCanvasSize();
  });

  return {
    getContext: () => context,
    getWidth: () => width,
    getHeight: () => height,
    getScaleFactor: () => scale,
  };
};

export const makeOffscreenCanvas = ({ width, height }) => {
  const offscreenElement = new OffscreenCanvas(width, height);
  const context = offscreenElement.getContext("2d", {
    colorSpace: "display-p3",
  });
  const scale = window.devicePixelRatio;

  offscreenElement.width = Math.floor(width * scale);
  offscreenElement.height = Math.floor(height * scale);
  context.scale(scale, scale);

  return {
    getElement: () => offscreenElement,
    getContext: () => context,
    getBitmap: () => offscreenElement.transferToImageBitmap(),
    getScaleFactor: () => scale,
  };
};
