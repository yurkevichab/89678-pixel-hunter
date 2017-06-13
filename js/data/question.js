import {games} from '../data';

export const getNextQuestion = (state) => {
  let gameNumber = state.game;
  let isLastQuestion = false;
  let questionNumber = state.questionNumber;
  if (questionNumber === 10) {
    isLastQuestion = true;
  } else {
    questionNumber += 1;
    gameNumber = Math.floor(Math.random() * games.length);
  }
  return Object.assign({}, state,
      {
        'game': gameNumber,
        'questionNumber': questionNumber,
        'isLastQuestion': isLastQuestion
      });
};
