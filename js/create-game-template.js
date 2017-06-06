import getHeader from './templates/header';
import footer from './templates/footer';
import createStats from './create-stats';
import {initialState} from './data';

const isGamePage = true;

const drawGameOptions = (game) => {
  return game.questions.reduce((content, question, index) => {
    const gameOptionIndex = index + 1;
    const htmlQuetstion = `
      <div class="game__option">
        <img src="${question.image}" alt="Option ${gameOptionIndex}">
        ${drawAnswer(game.type, gameOptionIndex)}
      </div>`;
    return content + htmlQuetstion;
  }, ``);
};

const createLabels = (answers, index) => {
  return answers.reduce((prev, current) => {
    const label = `
      <label class="game__answer game__answer--${current.type} ${current.additionClass}">
        <input name="question${index}" type="radio" value="${current.type}">
        <span>${current.text}</span>
      </label>`;
    return prev + label;
  }, ``);
};

const drawAnswer = (gameType, index) => {
  let answers = [
    {
      'text': `Фото`,
      'type': `photo`,
      'additionClass': ``
    },
    {
      'text': `Рисунок`,
      'type': `paint`,
      'additionClass': ``
    }];

  switch (gameType) {
    case `game-1`:
      return createLabels(answers, index);

    case `game-2`:
      answers[1].additionClass = `game__answer--paint`;
      return createLabels(answers, index);

    case `game-3`:
    default:
      return ``;
  }
};

export default (game) => {
  let formClass = ``;
  switch (game.type) {
    case `game-1`:
      break;
    case `game-2`:
      formClass = `game__content--wide`;
      break;
    case `game-3`:
      formClass = `game__content--triple`;
      break;
  }
  return `
  ${getHeader(isGamePage, initialState)}
  <div class="game">
    <p class="game__task">${game.description}</p>
    <form class="game__content ${formClass}">     
      ${drawGameOptions(game)}
    </form>
   ${createStats(initialState.stats)}
  </div>
  ${footer}`;
};
