import createElement from '../create-element';
import switchDisplay from '../switch-display';
import getGreeting from './greeting';
import footer from './footer';
import getHeader from './header';
import createStats from '../create-stats';

const getCount = (arr, findStat) => {
  return arr.filter((stat) => {
    return stat === findStat;
  }).length;
};

const getCountWithout = (arr, without) => {
  return arr.filter((stat) => {
    return stat !== without;
  }).length;
};

const createTableResult = (state, index) => {
  const slowCount = getCount(state.stats, `slow`);
  const fastCount = getCount(state.stats, `fast`);
  const livesCount = state.lives;
  const statsCount = getCountWithout(state.stats, ``);

  const totalStatsPoints = statsCount * 100;
  const totalFastPoints = statsCount * 50;
  const totalLivesPoints = livesCount * 50;
  const totalSlowPoints = slowCount * -50;
  const result = totalStatsPoints + totalFastPoints + totalLivesPoints + totalSlowPoints;

  return ` 
    <table class="result__table">
      <tr>
        <td class="result__number">${index}.</td>
        <td colspan="2">
          ${createStats(state.stats)}
        </td>
        <td class="result__points">×&nbsp;100</td>
        <td class="result__total">${totalStatsPoints}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${fastCount}&nbsp;<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${totalFastPoints}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${livesCount}&nbsp;<span class="stats__result stats__result--heart"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${totalLivesPoints}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${slowCount}&nbsp;<span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${totalSlowPoints}</td>
      </tr>
      <tr>
        <td colspan="5" class="result__total  result__total--final">${result}</td>
      </tr>
    </table>`;
};

export default (initialState) => {
  const template = `
  ${getHeader()}
  <div class="result">
    <h1>Победа!</h1>
    ${[{}, {}, {}].reduce((content, question, index) => {
      return content + createTableResult(initialState, index + 1);
    }, ``)}
  </div>
  ${footer}`;

  const display = createElement(template);
  const backButton = display.querySelector(`.header__back`);

  backButton.addEventListener(`click`, () => switchDisplay(getGreeting()));

  return display;
};
