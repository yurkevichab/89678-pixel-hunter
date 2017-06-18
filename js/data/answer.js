import {initialState, FAST_ANSWER, SLOW_ANSWER, ANSWER_TYPES, MIN_TIMER_VALUE} from '../data';

export const checkAnswer = (answer, rightAnswer) => {
  return answer === rightAnswer;
};

export const getAnswerType = (isCorrect, timer) => {
  const differenceTime = initialState.timer - timer;
  if (!isCorrect || timer === MIN_TIMER_VALUE) {
    return ANSWER_TYPES.wrong;
  }
  if (differenceTime < FAST_ANSWER) {
    return ANSWER_TYPES.fast;
  }
  if (differenceTime > SLOW_ANSWER) {
    return ANSWER_TYPES.slow;
  }
  return ANSWER_TYPES.correct;
};

export const setStats = (state, point) => {
  const newStats = state.stats.slice(0);
  newStats.push(point);
  return Object.assign({}, state, {stats: newStats});
};
