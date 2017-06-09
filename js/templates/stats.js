import createElement from '../create-element';
import footer from './footer';
import {getHeader, addBackButtonEvent} from './header';
import createStats from '../create-stats';
import {statInfo} from '../data';

const createBonus = ({result}, {title, type, ratio}) => {
  return `
    <tr>
      <td></td>
      <td class="result__extra">${title}</td>
      <td class="result__extra">${result[type]}&nbsp;<span class="stats__result stats__result--${type}"></span></td>
      <td class="result__points">×&nbsp;${ratio}</td>
      <td class="result__total">${result[type] * ratio}</td>
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
  addBackButtonEvent(display);

  return display;
};
