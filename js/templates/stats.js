import createElement from '../create-element';
import footer from './footer';
import {getHeader, addBackButtonEvent} from './header';
import createStats from '../create-stats';
import {statInfo, lastGames, ANSWER_TYPES, POINTS} from '../data';
import {getTotalPoints, getRightPoints, getPointCount} from '../data/points';

const createBonus = (bonusCount, {title, type}) => {
  return `
    <tr>
      <td></td>
      <td class="result__extra">${title}</td>
      <td class="result__extra">${bonusCount}&nbsp;<span class="stats__result stats__result--${type}"></span></td>
      <td class="result__points">×&nbsp;${POINTS[type]}</td>
      <td class="result__total">${bonusCount * POINTS[type]}</td>
    </tr>`;
};

const countPoints = ({lives, stats}) => {
  const result = new Map();
  result.set(`heart`, lives);
  for (let type of Object.keys(ANSWER_TYPES)) {
    result.set(type, getPointCount(stats, type));
  }

  return result;
};

const createBonuses = (points) => {
  return statInfo.bonuses.reduce((content, bonus, index) => {
    const bonusCount = points.get(bonus.type);
    const html = bonusCount ? createBonus(bonusCount, bonus) : ``;
    return content + html;
  }, ``);
};

const createStatsResult = (stats, isNotFail) => {
  const failResult = `
    <td class="result__total"></td>
    <td class="result__total  result__total--final">fail</td>`;
  const statsResultHtml = `
    <td class="result__points">×&nbsp;${POINTS[ANSWER_TYPES.correct]}</td>
    <td class="result__total">${getRightPoints(stats)}</td>`;

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
        ${createStatsResult(game.stats, isNotFail)}
      </tr>
      ${isNotFail ? createBonuses(points) : ``}
      <tr>
        <td colspan="5" class="result__total  result__total--final">${isNotFail ? getTotalPoints(game) : ``}</td>
      </tr>
    </table>`;
};

export default (state) => {
  const isCurrentGameFail = state.lives === 0;
  const newLastGames = [state,
    ...lastGames
  ];
  const template = `
  ${getHeader()}
  <div class="result">
    <h1>${isCurrentGameFail ? statInfo.title.loss : statInfo.title.win}</h1>
    ${newLastGames.reduce((content, game, index) => {
      return content + createTableResult(game, index + 1);
    }, ``)}
  </div>
  ${footer}`;

  const display = createElement(template);
  addBackButtonEvent(display);

  return display;
};
