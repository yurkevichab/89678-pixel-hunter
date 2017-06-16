import {initialState, games, MIN_TIMER_VALUE, ANSWER_TYPES} from './data';
import createElement from './create-element';
import switchDisplay from './switch-display';
import createGameTemplate from './create-game-template';
import getStats from './templates/stats';
import {addBackButtonEvent} from './templates/header';
import {setTimer} from './data/timer';
import {addAnswerResult, setState} from './data/answer';
import {setGame, isLastGame} from './data/game';
import {isLastLive, setLives} from './data/lives';

const getTimer = () => {
  const timer = document.querySelector(`.game__timer`);
  return timer.innerHTML;
};

const nextDisplay = (state) => {
  let display = ``;
  if (isLastGame(state.game) || isLastLive(state.lives)) {
    display = getStats(state);
  } else {
    const newState = setGame(state);
    display = getGameDisplay(newState);
  }
  switchDisplay(display);
};

const getGameDisplay = (state) => {
  const game = games[state.game];
  const template = createGameTemplate(game, state);
  const display = createElement(template);
  const form = display.querySelector(`.game__content`);
  const answerImages = form.querySelectorAll(`.game__option img`);
  const timerElement = display.querySelector(`.game__timer`);

  addBackButtonEvent(display);

  const interval = setInterval(() => {
    state = setTimer(state);
    timerElement.innerHTML = state.timer;
    if (state.timer === MIN_TIMER_VALUE) {
      clearInterval(interval);
      let newState = setState(state, ANSWER_TYPES.wrong);
      newState = setLives(newState, newState.lives - 1);
      nextDisplay(newState);
    }
  }, 1000);

  for (let img of answerImages) {
    img.addEventListener(`load`, () => {
      const parentBlock = img.parentNode;

      const maxWidth = parentBlock.clientWidth;
      const maxHeight = parentBlock.clientHeight;
      const width = img.naturalWidth;
      const height = img.naturalHeight;

      const ratio = Math.min(maxWidth / width, maxHeight / height);

      img.setAttribute(`width`, `${width * ratio}`);
      img.setAttribute(`height`, `${height * ratio }`);
    });
  }
  initGameEvent(game.type, form, state, interval);

  return display;
};

const initGameEvent = (type, form, state, interval) => {
  switch (type) {
    case `game-1`:
      switchDisplayEventGame1(form, state, interval);
      break;

    case `game-2`:
      switchDisplayEventGame2(form, state, interval);
      break;

    case `game-3`:
      switchDisplayEventGame3(form, state, interval);
      break;

    default:
      clearInterval(interval);
      switchDisplay(getGameDisplay(initialState));
  }
};

const switchDisplayEventGame1 = (form, state, interval) => {
  const isRadioChecked = (radioName) => {
    const radios = form.querySelectorAll(`input[name=${radioName}]`);

    return [...radios].some((radio) => radio.checked);
  };

  form.addEventListener(`change`, () => {
    if (isRadioChecked(`question1`) && isRadioChecked(`question2`)) {
      clearInterval(interval);
      const answer1 = form.querySelector(`input[name="question1"]:checked`).value;
      const answer2 = form.querySelector(`input[name="question2"]:checked`).value;
      const newState = addAnswerResult(state, getTimer(), answer1, answer2);
      nextDisplay(newState);
    }
  });
};

const switchDisplayEventGame2 = (form, state, interval) => {
  form.addEventListener(`change`, () => {
    clearInterval(interval);
    const answer1 = form.querySelector(`input[name="question1"]:checked`).value;
    state.timer = parseInt(document.querySelector(`.game__timer`).innerHTML, 10);
    const newState = addAnswerResult(state, getTimer(), answer1);
    nextDisplay(newState);
  });

};

const switchDisplayEventGame3 = (form, state, interval) => {
  form.addEventListener(`click`, (e) => {
    clearInterval(interval);
    const images = form.querySelectorAll(`.game__option`);
    if (e.target.closest(`.game__option`)) {
      const indexImage = [...images].indexOf(e.target);
      const imageType = games[state.game].answers[indexImage].type;
      state.timer = parseInt(document.querySelector(`.game__timer`).innerHTML, 10);
      const newState = addAnswerResult(state, getTimer(), imageType);
      nextDisplay(newState);
    }
  });
};
export default getGameDisplay;
