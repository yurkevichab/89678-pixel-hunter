import {initialState} from '../data';

export const checkAnswer = (answers) => {
  const result = answers.every((answer) => {
    return answer.isRight;
  });
  if (result) {
    return true;
  }
  return false;
};

export const addPoint = (state) => {
  const differenceTime = initialState.timer - state.timer;
  const userStats = state.stats;
  if (differenceTime < 10) {
    userStats.push(`fast`);
  }
  if (differenceTime > 20) {
    userStats.push(`slow`);
  }
  const newState = Object.assign({}, state, {stats: userStats});
  return newState;
};
