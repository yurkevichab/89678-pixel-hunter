import {initialState, FAST_ANSWER, SLOW_ANSWER, ANSWER_TYPES, games, GAMES_TYPES} from '../data';
import {setLives} from './lives';
import {getTimer} from './timer'

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

export const addAnswerResult = (state, ...answer) => {
  const game = games[state.game];
  let answerResult = false;
  if (game.type === GAMES_TYPES.threeQuestions) {
    const rightAnswer = game.answers.find((a) => a.isRight);
    answerResult = rightAnswer.type === answer[0];
  } else {
    answerResult = [...answer].every((a, index) => {
      return checkAnswer(game.answers[index].type, a);
    });
  }
  let newState = Object.assign({}, state, {timer: getTimer()});
  const point = getAnswerType(answerResult, newState);
  newState = setState(state, point);
  if (!answerResult) {
    newState = setLives(newState, newState.lives - 1);
  }
  return newState;
};
