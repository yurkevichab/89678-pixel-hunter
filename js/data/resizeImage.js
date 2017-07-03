export default (frame, image) => {
  const maxWidth = frame.width;
  const maxHeight = frame.height;
  const width = image.width;
  const height = image.height;
  const ratio = Math.min(maxWidth / width, maxHeight / height);
  const correctedWidth = width * ratio;
  const correctedHeight = height * ratio;
  return {
    width: correctedWidth,
    height: correctedHeight
  };
};
