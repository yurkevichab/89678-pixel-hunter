import {Result} from './data';

const createStatsResult = (stats) => {
  return stats.reduce((prev, current) => {
    return prev + ` <li class="stats__result stats__result--${current}"></li>`;
  }, ``);
};

export default (stats, questionsLength) => {
  return ` 
    <ul class="stats">
    ${createStatsResult(stats)}
    ${createStatsResult(Array(questionsLength - stats.length).fill(Result.unknown))}
    </ul>`;
};

