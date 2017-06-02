export default (isGamePage = false, state = null) => {
  const content = isGamePage ? gameStats(state) : ``;

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

const createHeart = (count, type) => {
  return new Array(count)
    .fill(`<img src="img/${type}.svg" class="game__heart" alt="Life" width="32" height="32">`)
    .join(` `);
};

const gameStats = (state) => {
  const maxLives = 3;

  return `
    <h1 class="game__timer">${state.timer}</h1>
    <div class="game__lives">
      ${createHeart(maxLives - state.lives, `heart__empty`)}
      ${createHeart(state.lives, `heart__full`)}
    </div>`;
};
