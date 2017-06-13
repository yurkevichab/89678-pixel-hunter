import {initialState} from '../data';
const FAST_ANSWER = 10;
const SLOW_ANSWER = 20;
export const checkAnswer = (answer, rightAnswer) => {
  return answer.type === rightAnswer.type;
};

export const getAnswerType = (state) => {
  const differenceTime = initialState.timer - state.timer;
  const userStats = state.stats;
  if (differenceTime < FAST_ANSWER) {
    userStats.push(`fast`);
  }
  if (differenceTime > SLOW_ANSWER) {
    userStats.push(`slow`);
  }
  return Object.assign({}, state, {stats: userStats});
};
