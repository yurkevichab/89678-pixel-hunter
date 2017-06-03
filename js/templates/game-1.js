import createElement from '../create-element';
import switchDisplay from '../switch-display';
import getGame2 from './game-2';
import getGreeting from './greeting';
import createGameTemplate from '../create-game-template';
import {initialState, games} from '../data';

export default (game) => {
  const template = createGameTemplate(game);
  const display = createElement(template);
  const form = display.querySelector(`.game__content`);
  const backButton = display.querySelector(`.header__back`);

  const isRadioChecked = (radioName) => {
    const radios = form.querySelectorAll(`input[name=${radioName}]`);

    return [...radios].some((radio) => radio.checked);
  };

  form.addEventListener(`change`, () => {
    if (isRadioChecked(`question1`) && isRadioChecked(`question2`)) {
      const newState = Object.assign({}, initialState, {
        'game': `game-2`
      });
      const nextDisplay = games[newState.game];
      switchDisplay(getGame2(nextDisplay));
    }
  });

  const answerImages = form.querySelectorAll(`.game__option img`);

  for (let img of answerImages) {
    img.addEventListener(`load`, ()=> {
      const parentBlock = img.parentNode;
      const parentBlockHeight = parentBlock.clientHeight;
      const parentBlockWidth = parentBlock.clientWidth;

      img.width = parentBlockHeight;
      img.height = parentBlockWidth;
    });
  }

  backButton.addEventListener(`click`, () => switchDisplay(getGreeting()));

  return display;
};
