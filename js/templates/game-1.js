import createElement from '../create-element';
import switchDisplay from '../switch-display';
import getGame2 from './game-2';
import getGreeting from './greeting';
import createGameTemplate from '../create-game-template';

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
      switchDisplay(getGame2());
    }
  });

  backButton.addEventListener(`click`, () => switchDisplay(getGreeting()));

  return display;
};
