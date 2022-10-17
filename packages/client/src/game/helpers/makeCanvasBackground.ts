import backgroundImage from '../../../public/TextureBG.jpg';

export const makeCanvasBackground = (mapWidth: number, mapHeight: number) => {
  const imageAspectRatio = 1.77;
  const aspectRatioHeight = mapHeight - mapWidth / imageAspectRatio;
  const scaleFactor = aspectRatioHeight >= 0 ? aspectRatioHeight : 0;

  const canvas = document.createElement('canvas');
  canvas.width = mapWidth;
  canvas.height = mapHeight;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  const image = new Image();
  image.src = backgroundImage;
  ctx.globalAlpha = 1;

  image.onload = function () {
    ctx.drawImage(image, 0, 0, mapWidth + scaleFactor, mapWidth / imageAspectRatio + scaleFactor);
  };

  return canvas;
};
