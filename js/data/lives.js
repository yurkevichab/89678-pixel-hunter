const MAX_COUNT_LIVES = 3;
export const setNewLives = (state, newlives) => {
  if (newlives > MAX_COUNT_LIVES) {
    throw new RangeError(`Кол-во жизней не может быть больше трех`);
  }
  if (newlives < 0) {
    throw new RangeError(`Кол-во жизней не может быть меньше нуля`);
  }
  const newState = Object.assign({}, state, {lives: newlives});
  return newState;
};
