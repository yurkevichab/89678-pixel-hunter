import {initialState} from '../data';
import switchDisplay from '../switch-display';
import getGreeting from './greeting';

export const getHeader = (state = null) => {
  const content = state ? gameStats(state) : ``;

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

export const addBackButtonEvent = (container) =>{
  const backButton = container.querySelector(`.header__back`);
  backButton.addEventListener(`click`, () => switchDisplay(getGreeting()));
};

const createHeart = (count, type) => {
  return new Array(count)
    .fill(`<img src="img/heart__${type}.svg" class="game__heart" alt="Life" width="32" height="32">`)
    .join(` `);
};

const gameStats = (state) => {
  return `
    <h1 class="game__timer">${state.timer}</h1>
    <div class="game__lives">
      ${createHeart(initialState.lives - state.lives, `empty`)}
      ${createHeart(state.lives, `full`)}
    </div>`;
};
