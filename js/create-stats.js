import {Result} from './data';
import {MAX_COUNT_LIVES} from './data';

const createStatsResult = (stats) => {
  return stats.reduce((prev, current) => {
    return prev + ` <li class="stats__result stats__result--${current}"></li>`;
  }, ``);
};

export default (stats) => {
  return ` 
    <ul class="stats">
    ${createStatsResult(stats)}
    ${createStatsResult(Array(MAX_COUNT_LIVES - stats.length).fill(Result.unknown))}
    </ul>`;
};

