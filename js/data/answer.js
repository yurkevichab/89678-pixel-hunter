import {initialState, FAST_ANSWER, SLOW_ANSWER, ANSWER_TYPES} from '../data';

export const checkAnswer = (answer, rightAnswer) => {
  return answer === rightAnswer;
};

export const getAnswerType = (isCorrect, {timer}) => {
  const differenceTime = initialState.timer - timer;
  if (!isCorrect || timer === 0) {
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

export const setState = (state, point) => {
  const newStats = state.stats.slice(0);
  newStats.push(point);
  return Object.assign({}, state, {stats: newStats});
};
