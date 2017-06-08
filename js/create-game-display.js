import {initialState, games, lastGames} from './data';
import createElement from './create-element';
import switchDisplay from './switch-display';
import getGreeting from './templates/greeting';
import getGameTemplate from './create-game-template';
import getStats from './templates/stats';

const getGameDisplay = (state) => {
  const game = games[state.game];
  const template = getGameTemplate(game, state);
  const display = createElement(template);
  const form = display.querySelector(`.game__content`);
  const backButton = display.querySelector(`.header__back`);
  const answerImages = form.querySelectorAll(`.game__option img`);

  backButton.addEventListener(`click`, () => switchDisplay(getGreeting()));

  for (let img of answerImages) {
    img.addEventListener(`load`, () => {
      const parentBlock = img.parentNode;

      const maxWidth = parentBlock.clientWidth;
      const maxHeight = parentBlock.clientHeight;
      const width = img.width;
      const height = img.height;

      const ratio = Math.min(maxWidth / width, maxHeight / height);

      img.setAttribute(`width`, `${width * ratio}`);
      img.setAttribute(`height`, `${height * ratio }`);
    });
  }

  switch (game.type) {
    case `game-1`:
      switchDisplayEventGame1(form, state);
      break;

    case `game-2`:
      switchDisplayEventGame2(form, state);
      break;

    case `game-3`:
      switchDisplayEventGame3(form, state);
      break;

    default:
      switchDisplay(getGameDisplay(initialState));
  }
  return display;
};

const switchDisplayEventGame1 = (form, state) => {
  const isRadioChecked = (radioName) => {
    const radios = form.querySelectorAll(`input[name=${radioName}]`);

    return [...radios].some((radio) => radio.checked);
  };

  form.addEventListener(`change`, () => {
    if (isRadioChecked(`question1`) && isRadioChecked(`question2`)) {
      const newState = Object.assign({}, state, {
        'game': 1
      });
      switchDisplay(getGameDisplay(newState));
    }
  });
};

const switchDisplayEventGame2 = (form, state) => {
  form.addEventListener(`change`, () => {
    const newState = Object.assign({}, state, {
      'game': `2`
    });
    switchDisplay(getGameDisplay(newState));
  });

};

const switchDisplayEventGame3 = (form, state) => {
  form.addEventListener(`click`, (e) => {
    if (e.target.closest(`.game__option`)) {
      const newState = Object.assign({}, state, {
        'lives': 2,
        'stats': [`fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`]
      });
      const newStatGames = Object.assign([], lastGames);
      newStatGames.unshift({
        'stats': newState.stats,
        'result': {
          'fast': 2,
          'heart': 1,
          'slow': 3,
          'finalResult': 600
        }
      });
      switchDisplay(getStats(newStatGames));
    }
  });
};
export default getGameDisplay;
