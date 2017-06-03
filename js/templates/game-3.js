import createElement from '../create-element';
import switchDisplay from '../switch-display';
import getStats from './stats';
import getGreeting from './greeting';
import createGameTemplate from '../create-game-template';

export default (game) => {

  const template = createGameTemplate(game);

  const display = createElement(template);
  const form = display.querySelector(`.game__content`);
  const backButton = display.querySelector(`.header__back`);

  form.addEventListener(`click`, (e) => {
    if (e.target.parentNode.className.includes(`game__option`)) {
      switchDisplay(getStats());
    }
  });

  backButton.addEventListener(`click`, () => switchDisplay(getGreeting()));

  const answerImages = form.querySelectorAll(`.game__option img`);

  for (let img of answerImages) {
    img.addEventListener(`load`, (e)=> {
      const parentBlock = img.parentNode;
      const parentBlockHeight = parentBlock.clientHeight;
      const parentBlockWidth = parentBlock.clientWidth;

      img.setAttribute(`width`, `${parentBlockHeight}`);
      img.setAttribute(`height`, `${parentBlockWidth}`);
    });
  }

  return display;
};
