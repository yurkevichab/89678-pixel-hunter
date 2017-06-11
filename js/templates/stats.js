import createElement from '../create-element';
import footer from './footer';
import {getHeader, addBackButtonEvent} from './header';
import createStats from '../create-stats';
import {statInfo} from '../data';

const getFinalResults = (points) => {
  let sum = 0;
  for (let [key, value] of points) {
    sum += key === `total` ? value * statInfo.ratio : value * statInfo.bonuses.find((b) => b.type === key).ratio;
  }
  return sum;
};

const createBonus = (bonusCount, {title, type, ratio}) => {
  return `
    <tr>
      <td></td>
      <td class="result__extra">${title}</td>
      <td class="result__extra">${bonusCount}&nbsp;<span class="stats__result stats__result--${type}"></span></td>
      <td class="result__points">×&nbsp;${ratio}</td>
      <td class="result__total">${bonusCount * ratio}</td>
    </tr>`;
};

const getPointCount = (stats, type) => {
  return stats.filter((s) => {
    return s === type;
  }).length;
};

const countPoints = ({lives, stats}) => {
  const result = new Map();
  result.set(`heart`, lives);
  const rightStats = stats.filter((s) => s !== `wrong` && s !== `unknown`);
  for (let type of rightStats.filter((s) => s !== `correct`)) {
    if (!result.has(type)) {
      result.set(type, getPointCount(stats, type));
    }
  }
  result.set(`total`, rightStats.length);

  return result;
};

const createBonuses = (game) => {
  const points = countPoints(game);
  return statInfo.bonuses.reduce((content, bonus, index) => {
    const bonusCount = points.get(bonus.type);
    const html = bonusCount ? createBonus(bonusCount, bonus) : ``;
    return content + html;
  }, ``);
};

const createStatsResult = (points, isNotFail) => {
  const failResult = `
    <td class="result__total"></td>
    <td class="result__total  result__total--final">fail</td>`;
  const statsResultHtml = `
    <td class="result__points">×&nbsp;${statInfo.ratio}</td>
    <td class="result__total">${statInfo.ratio * points.get(`total`)}</td>`;

  return isNotFail ? statsResultHtml : failResult;
};

const createTableResult = (game, index) => {
  const points = countPoints(game);
  const isNotFail = game.lives !== 0;
  return ` 
    <table class="result__table">
      <tr>
        <td class="result__number">${index}.</td>
        <td colspan="2">
          ${createStats(game.stats)}
        </td>
        ${createStatsResult(points, isNotFail)}
      </tr>
      ${isNotFail ? createBonuses(game) : ``}
      <tr>
        <td colspan="5" class="result__total  result__total--final">${isNotFail ? getFinalResults(points) : ``}</td>
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
