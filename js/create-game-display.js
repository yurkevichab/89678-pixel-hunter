import {initialState, games} from './data';
import createElement from './create-element';
import switchDisplay from './switch-display';
import getGreeting from './templates/greeting';
import getGameTemplate from './create-game-template';
import getStats from './templates/stats';

export const getGameDisplay = (game)=> {
  const template = getGameTemplate(game);
  const display = createElement(template);
  const form = display.querySelector(`.game__content`);
  const backButton = display.querySelector(`.header__back`);
  const answerImages = form.querySelectorAll(`.game__option img`);

  backButton.addEventListener(`click`, () => switchDisplay(getGreeting()));

  for (let img of answerImages) {
    img.addEventListener(`load`, ()=> {
      const parentBlock = img.parentNode;
      const parentBlockHeight = parentBlock.clientHeight;
      const parentBlockWidth = parentBlock.clientWidth;

      img.setAttribute(`width`, `${parentBlockHeight}`);
      img.setAttribute(`height`, `${parentBlockWidth}`);
    });
  }

  switch (game.type) {
    case `game-1`:
      switchDisplayEventGame1(form);
      break;

    case `game-2`:
      switchDisplayEventGame2(form);
      break;

    case `game-3`:
      switchDisplayEventGame3(form, answerImages);
      break;

    default:
      switchDisplay(getGameDisplay(initialState.game));
  }
  return display;
};

const switchDisplayEventGame1 = (form) => {
  const isRadioChecked = (radioName) => {
    const radios = form.querySelectorAll(`input[name=${radioName}]`);

    return [...radios].some((radio) => radio.checked);
  };

  form.addEventListener(`change`, () => {
    if (isRadioChecked(`question1`) && isRadioChecked(`question2`)) {
      const newState = Object.assign({}, initialState, {
        'game': 1
      });
      const nextDisplay = games[newState.game];
      switchDisplay(getGameDisplay(nextDisplay));
    }
  });
};

const switchDisplayEventGame2 = (form) => {
  form.addEventListener(`change`, () => {
    const newState = Object.assign({}, initialState, {
      'game': `2`
    });
    const nextDisplay = games[newState.game];
    switchDisplay(getGameDisplay(nextDisplay));
  });

};

const switchDisplayEventGame3 = (form, answerImages) => {
  form.addEventListener(`click`, (e) => {
    if (e.target.parentNode.className.includes(`game__option`)) {
      switchDisplay(getStats());
    }
  });

  for (let img of answerImages) {
    img.addEventListener(`mouseover`, (e)=> {
      const parentElement = e.target.parentNode;
      answerImages.forEach((item, i, arr) => {
        const parentImg = item.parentNode;
        parentImg.classList.remove(`game__option--selected`);
      });
      parentElement.className += ` game__option--selected`;
    });

    img.addEventListener(`mouseout`, (e)=> {
      const parentElement = e.target.parentNode;
      parentElement.classList.remove(`game__option--selected`);
    });
  }
};

