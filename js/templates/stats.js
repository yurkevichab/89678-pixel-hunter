import createElement from '../create-element';
import switchDisplay from '../switch-display';
import getGreeting from './greeting';
import footer from './footer';
import getHeader from './header';

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

const createTableResult = (state)=>{
  return ` 
    <table class="result__table">
      <tr>
        <td class="result__number">1.</td>
        <td colspan="2">
          <ul class="stats">
            ${drawStats(state.stats)}
          </ul>
        </td>
        <td class="result__points">×&nbsp;100</td>
        <td class="result__total">900</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">1&nbsp;<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">50</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${state.lives}&nbsp;<span class="stats__result stats__result--heart"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${state.lives * 50}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">2&nbsp;<span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">-100</td>
      </tr>
      <tr>
        <td colspan="5" class="result__total  result__total--final">950</td>
      </tr>
    </table>`;
};

export default (initialState) => {
  const template = `
  ${getHeader()}
  <div class="result">
    <h1>Победа!</h1>
    ${[{}, {}, {}].reduce((content, question, index) => {
      return content + createTableResult(initialState);
    }, ``)}
  </div>
  ${footer}`;

  const display = createElement(template);
  const backButton = display.querySelector(`.header__back`);

  backButton.addEventListener(`click`, () => switchDisplay(getGreeting()));

  return display;
};
