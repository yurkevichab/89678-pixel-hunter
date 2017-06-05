import getHeader from './templates/header';
import footer from './templates/footer';
import {initialState} from './data';

const isGamePage = true;

const drawGameOptions = (game) => {
  return game.questions.reduce(function (content, question, index) {
    const htmlQuetstion = `
      <div class="game__option">
        <img src="${question.image}" alt="Option ${index + 1}">
        ${drawAnswer(game.type, index + 1)}
      </div>`;
    return content + htmlQuetstion;
  }, ``);
};

const createLabel = (text, type, index, additionClass = ``) =>{
  return `
    <label class="game__answer game__answer--${type} ${additionClass}">
      <input name="question${index}" type="radio" value="${type}">
      <span>${text}</span>
    </label>`;
};

const drawAnswer = (gameType, index) => {
  switch (gameType) {
    case `game-1`:
      return ` 
       ${createLabel(`Фото`, `photo`, index)} 
       ${createLabel(`Рисунок`, `paint`, index)}`;

    case `game-2`:
      return `
        ${createLabel(`Фото`, `photo`, index)} 
        ${createLabel(`Рисунок`, `paint`, index, `game__answer--paint`)}`;

    case `game-3`:
    default:
      return ``;
  }
};

const drawStats = (stats) => {
  return ` 
    <div class="stats">
      <ul class="stats">
      ${stats.reduce((prev, current) => {
        return prev + ` <li class="stats__result stats__result--${current || `unknown`}"></li>`;
      }, ``)}      
      </ul>
    </div>`;
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
   ${drawStats(initialState.stats)}
  </div>
  ${footer}`;
};
