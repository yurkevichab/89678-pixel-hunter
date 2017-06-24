import AbstractView from '../view';
import {initialState} from '../data';

export default class headerView extends AbstractView {
  constructor(state = null) {
    super();
    this.state = state;
  }

  get template() {
    const content = this.state ? this._createGameStats() : ``;

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
  }

  _createHeart(count, type) {
    return new Array(count)
      .fill(`<img src="img/heart__${type}.svg" class="game__heart" alt="Life" width="32" height="32">`)
      .join(` `);
  }

  _createGameStats() {
    return `
    <h1 class="game__timer">${this.state.timer}</h1>
    <div class="game__lives">
      ${this._createHeart(initialState.lives - this.state.lives, `empty`)}
      ${this._createHeart(this.state.lives, `full`)}
    </div>`;
  }
}
