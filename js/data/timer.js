import {MIN_TIMER_VALUE, initialState} from './data';

export const setTimer = (state) => {
  let currentTimer = state.timer;
  currentTimer--;
  if (currentTimer < MIN_TIMER_VALUE) {
    throw new RangeError(`Timer can not be less than ${MIN_TIMER_VALUE}`);
  }
  return Object.assign({}, state, {'timer': currentTimer});
};

export const cleanTimer = (state) => {
  return Object.assign({}, state, {'timer': initialState.timer});
};
