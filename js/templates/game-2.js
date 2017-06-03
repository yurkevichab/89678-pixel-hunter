import createElement from '../create-element';
import switchDisplay from '../switch-display';
import getGame3 from './game-3';
import getGreeting from './greeting';
import {initialState, games} from '../data';
import createGameTemplate from '../create-game-template';

export default (game) => {

  const template = createGameTemplate(game);
  const display = createElement(template);
  const form = display.querySelector(`.game__content`);
  const backButton = display.querySelector(`.header__back`);

  form.addEventListener(`change`, () => {
    const newState = Object.assign({}, initialState, {
      'game': `game-3`
    });
    const nextDisplay = games[newState.game];
    switchDisplay(getGame3(nextDisplay));
  });

  backButton.addEventListener(`click`, () => switchDisplay(getGreeting()));

  const answerImage = form.querySelector(`.game__option img`);
  answerImage.addEventListener(`load`, ()=> {
    const parentBlock = answerImage.parentNode;
    const parentBlockHeight = parentBlock.clientHeight;
    const parentBlockWidth = parentBlock.clientWidth;

    answerImage.width = parentBlockHeight;
    answerImage.height = parentBlockWidth;
  });


  return display;
};
