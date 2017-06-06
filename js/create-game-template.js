import getHeader from './templates/header';
import footer from './templates/footer';
import createStats from './create-stats';
import {initialState} from './data';
const additionGameData = {
  'game-1': {
    'formClass': ``,
    'options': [
      {
        'text': `Рисунок`,
        'type': `paint`,
        'additionClass': ``
      },
      {
        'text': `Фото`,
        'type': `photo`,
        'additionClass': ``
      }]
  },
  'game-2': {
    'formClass': `game__content--wide`,
    'options': [
      {
        'text': `Рисунок`,
        'type': `paint`,
        'additionClass': `game__answer--paint`
      },
      {
        'text': `Фото`,
        'type': `photo`,
        'additionClass': ``
      }]
  },
  'game-3': {
    'formClass': `game__content--triple`,
    'options': []
  }
};
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

const createLabels = (options, index) => {
  return options.reduce((prev, current) => {
    const label = `
      <label class="game__answer game__answer--${current.type} ${current.additionClass}">
        <input name="question${index}" type="radio" value="${current.type}">
        <span>${current.text}</span>
      </label>`;
    return prev + label;
  }, ``);
};

const drawAnswer = (gameType, index) => {
  const options = additionGameData[gameType].options;

  return createLabels(options, index);
};

export default (game) => {
  const formClass = additionGameData[game.type].formClass;
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
