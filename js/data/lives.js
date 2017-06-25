import {initialState, MIN_COUNT_LIVES} from '../data';

export const setLives = (state, lives) => {
  if (lives > initialState.lives) {
    throw new RangeError(`Number of lives can not be more than ${initialState.lives}`);
  }
  if (lives < MIN_COUNT_LIVES) {
    throw new RangeError(`Number of lives can not be less than ${MIN_COUNT_LIVES}`);
  }
  return Object.assign({}, state, {'lives': lives});
};

export const isLivesEnded = (lives) => {
  return lives === MIN_COUNT_LIVES;
};

export const reduceLives = (state) => {
  return setLives(state, state.lives - 1);
}
