import {initialState} from '../data';
const FAST_ANSWER = 10;
const SLOW_ANSWER = 20;

export const checkAnswer = (answer, rightAnswer) => {
  return answer.type === rightAnswer.type;
};


export const getAnswerType = (isCorrect, {timer}) => {
  const differenceTime = initialState.timer - timer;
  if (!isCorrect) {
    return `wrong`;
  }
  if (differenceTime < FAST_ANSWER) {
    return `fast`;
  }
  if (differenceTime > SLOW_ANSWER) {
    return `slow`;
  }
  return `correct`;
};

export const setState = (state, point) => {
  const newState = Object.assign({}, state);
  newState.stats.push(point);
  return newState;
};
