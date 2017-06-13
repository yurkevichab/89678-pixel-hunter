import {initialState} from '../data';

const MIN_COUNT_LIVES = 0;
export const setLives = (state, lives) => {
  if (lives > initialState.lives) {
    throw new RangeError(`Кол-во жизней не может быть больше ${initialState.lives}`);
  }
  if (lives < MIN_COUNT_LIVES) {
    throw new RangeError(`Кол-во жизней не может быть меньше ${MIN_COUNT_LIVES}`);
  }
  return Object.assign({}, state, {'lives': lives});
};
