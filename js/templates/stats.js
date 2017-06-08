import createElement from '../create-element';
import switchDisplay from '../switch-display';
import getGreeting from './greeting';
import footer from './footer';
import getHeader from './header';
import createStats from '../create-stats';
import {statInfo} from '../data';

const createBonus = (game, bonus) => {
  return `
    <tr>
      <td></td>
      <td class="result__extra">${bonus.title}</td>
      <td class="result__extra">${game.result[bonus.type]}&nbsp;<span class="stats__result stats__result--${bonus.type}"></span></td>
      <td class="result__points">×&nbsp;${bonus.ratio}</td>
      <td class="result__total">${game.result[bonus.type] * bonus.ratio}</td>
    </tr>`;
};

const createBonuses = (game) => {
  return statInfo.bonuses.reduce((content, bonus, index) => {
    const html = game.result[bonus.type] ? createBonus(game, bonus) : ``;
    return content + html;
  }, ``);
};

const createTableResult = (game, index) => {
  return ` 
    <table class="result__table">
      <tr>
        <td class="result__number">${index}.</td>
        <td colspan="2">
          ${createStats(game.stats)}
        </td>
        <td class="result__points">×&nbsp;${statInfo.ratio}</td>
        <td class="result__total">${statInfo.ratio * game.stats.length}</td>
      </tr>
      ${createBonuses(game)}
      <tr>
        <td colspan="5" class="result__total  result__total--final">${game.result.finalResult}</td>
      </tr>
    </table>`;
};

export default (lastGames) => {
  const template = `
  ${getHeader()}
  <div class="result">
    <h1>${statInfo.title}</h1>
    ${lastGames.reduce((content, game, index) => {
      return content + createTableResult(game, index + 1);
    }, ``)}
  </div>
  ${footer}`;

  const display = createElement(template);
  const backButton = display.querySelector(`.header__back`);

  backButton.addEventListener(`click`, () => switchDisplay(getGreeting()));

  return display;
};
