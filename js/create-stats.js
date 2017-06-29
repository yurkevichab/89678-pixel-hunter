import {MAX_COUNT_LIVES} from './data';

export default (stats) => {
  return ` 
    <ul class="stats">
    ${Array.from(Array(MAX_COUNT_LIVES)).reduce((prev, el, index) => {
      return prev + ` <li class="stats__result stats__result--${stats[index] || `unknown`}"></li>`;
    }, ``)} } 
    </ul>`;
};
