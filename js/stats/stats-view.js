import AbstractView from '../view';
import getFooter from '../templates/footer';
import getHeader from '../templates/header';
import {isLivesEnded} from '../data/lives';
import {statInfo, AnswerType, Points} from '../data/data';
import {getTotalPoints, getRightPoints, getPointCount} from '../data/points';
import getGameStats from '../templates/game-stats';
import addBackButtonClick from '../add-back-button-click';

const createBonus = (bonusCount, {title, type}) => {
  return `
    <tr>
      <td></td>
      <td class="result__extra">${title}</td>
      <td class="result__extra">${bonusCount}&nbsp;<span class="stats__result stats__result--${type}"></span></td>
      <td class="result__points">×&nbsp;${Points[type]}</td>
      <td class="result__total">${bonusCount * Points[type]}</td>
    </tr>`;
};

const countPoints = ({lives, stats}) => {
  const result = Object.keys(AnswerType).reduce((accumulator, type) => {
    accumulator[type] = getPointCount(stats, type);
    return accumulator;
  }, {heart: lives});
  return result;
};

const createBonuses = (points) => {
  return statInfo.bonuses.reduce((content, bonus) => {
    const bonusCount = points[bonus.type];
    const html = bonusCount ? createBonus(bonusCount, bonus) : ``;
    return content + html;
  }, ``);
};

const createStatsResult = (stats, isNotFail) => {
  const failResult = `
    <td class="result__total"></td>
    <td class="result__total  result__total--final">fail</td>`;
  const statsResultHtml = `
    <td class="result__points">×&nbsp;${Points[AnswerType.correct]}</td>
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
          ${getGameStats(game.stats)}
        </td>
        ${createStatsResult(game.stats, isNotFail)}
      </tr>
      ${isNotFail ? createBonuses(points) : ``}
      <tr>
        <td colspan="5" class="result__total  result__total--final">${isNotFail ? getTotalPoints(game) : ``}</td>
      </tr>
    </table>`;
};

export default class rulesView extends AbstractView {
  constructor(stats) {
    super();
    this.stats = stats;
  }

  get template() {
    return `
    ${getHeader()}
    <div class="result">
      <h1>${isLivesEnded(this.stats[0].lives) ? statInfo.title.loss : statInfo.title.win}</h1>
      ${this.stats.reduce((content, game, index) => {
        return content + createTableResult(game, index + 1);
      }, ``)}
    </div>
    ${getFooter}`;
  }

  bind() {
    addBackButtonClick(this.element, ()=> this.onBackToGreeting());
  }
}
