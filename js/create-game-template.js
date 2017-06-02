import getHeader from './header';
import footer from './footer';
import {initialState} from '../data';

const isGamePage = true;

const drawGameOptions = (questions) => {
  return questions.reduce(function (content, question, index) {
    const htmlQuetstion = ` 
      <div class="game__option">
        <img src="${question.image}" alt="Option 1" width="468" height="458">
        ${drawAnswer(question, index + 1)}
      </div>`;
    return content + htmlQuetstion;
  }, ``);
};

const drawAnswer = (question, index) => {
  if (question.answers.length > 0) {
    return question.answers.reduce((prev, current)=>{
      return prev + `
      <label class="${current.classes}">
        <input name="question${index}" type="radio" value="${current.value}">
        <span>${current.text}</span>
      </label>`;
    }, ``);
  }
  return ``;
};

const drawStats = (stats) => {
  return ` 
    <div class="stats">
      <ul class="stats">
      ${stats.reduce((prev, current)=>{
        return prev + ` <li class="stats__result stats__result--${current ? current : `unknown`}"></li>`;
      }, ``)}      
      </ul>
    </div>`;
};

export default (game) =>`
  ${getHeader(isGamePage, initialState)}
  <div class="game">
    <p class="game__task">${game.description}</p>
    <form class="game__content">     
      ${drawGameOptions(game.questions)}
    </form>
   ${drawStats(game.stats)}
  </div>
  ${footer}`;
