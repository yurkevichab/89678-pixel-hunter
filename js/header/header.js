import {initialState} from '../data';

const createHeart = (count, type) => {
  return new Array(count)
    .fill(`<img src="img/heart__${type}.svg" class="game__heart" alt="Life" width="32" height="32">`)
    .join(` `);
};

const createGameStats = ({lives, timer}) => {
  return `
  <h1 class="game__timer">${timer}</h1>
  <div class="game__lives">
    ${createHeart(initialState.lives - lives, `empty`)}
    ${createHeart(lives, `full`)}
  </div>`;
};

export default (state = null) => {
  const content = state ? createGameStats(state) : ``;
  return `
  <header class="header">
    <div class="header__back">
      <span class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.png" width="101" height="44">
      </span>
    </div>
    ${content} 
  </header>`;
};
