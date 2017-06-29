import {initialState, FAST_ANSWER, SLOW_ANSWER, Result, MIN_TIMER_VALUE} from '../data';

export const checkAnswer = (answer, rightAnswer) => {
  return answer === rightAnswer;
};

export const getAnswerType = (isCorrect, timer) => {
  const differenceTime = initialState.timer - timer;
  if (!isCorrect || timer === MIN_TIMER_VALUE) {
    return Result.wrong;
  }
  if (differenceTime < FAST_ANSWER) {
    return Result.fast;
  }
  if (differenceTime > SLOW_ANSWER) {
    return Result.slow;
  }
  return Result.correct;
};

export const setStats = (state, point) => {
  const newStats = state.stats.slice(0);
  newStats.push(point);
  return Object.assign({}, state, {stats: newStats});
};
