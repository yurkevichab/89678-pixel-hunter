import createElement from '../create-element';
import switchDisplay from '../switch-display';
import getGame3 from './game-3';
import getGreeting from './greeting';
import {initialState} from '../data';
import createGameTemplate from '../create-game-template';

export default (game) => {
  const template = createGameTemplate(game);

  const display = createElement(template);
  const form = display.querySelector(`.game__content`);
  const backButton = display.querySelector(`.header__back`);

  form.addEventListener(`change`, () => switchDisplay(getGame3(Object.assign({}, initialState, {
    'game': `game-3`
  }))));

  backButton.addEventListener(`click`, () => switchDisplay(getGreeting()));

  return display;
};
