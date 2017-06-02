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
  if (question.withAnswers) {
    return ` 
      <label class="game__answer game__answer--photo">
        <input name="question${index}" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer game__answer--paint">
        <input name="question${index}" type="radio" value="paint">
        <span>Рисунок</span>
      </label>`;
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
