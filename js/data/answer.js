import {initialState, FAST_ANSWER, SLOW_ANSWER, Result, MIN_TIMER_VALUE} from './data';

export const checkAnswer = (answer, rightAnswer) => {
  return answer === rightAnswer;
};

export const getAnswerType = (isCorrect, timer) => {
  const differenceTime = initialState.timer - timer;
  if (!isCorrect || timer === MIN_TIMER_VALUE) {
    return Result.WRONG;
  }
  if (differenceTime < FAST_ANSWER) {
    return Result.FAST;
  }
  if (differenceTime > SLOW_ANSWER) {
    return Result.SLOW;
  }
  return Result.CORRECT;
};

export const setStats = (state, point) => {
  const newStats = state.stats.slice(0);
  newStats.push(point);
  return Object.assign({}, state, {stats: newStats});
};
