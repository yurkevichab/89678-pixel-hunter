export default (frame, given) =>{

  const maxWidth = frame.width;
  const maxHeight = frame.height;
  const width = given.width;
  const height = given.height;

  const ratio = Math.min(maxWidth / width, maxHeight / height);

  const correctedWidth = width * ratio;
  const correctedHeight = height * ratio;

  return {
    width: correctedWidth,
    height: correctedHeight
  };
};
