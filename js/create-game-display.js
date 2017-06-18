import {initialState, games, MIN_TIMER_VALUE, ANSWER_TYPES, GAMES_TYPES} from './data';
import createElement from './create-element';
import switchDisplay from './switch-display';
import createGameTemplate from './create-game-template';
import getStats from './templates/stats';
import {addBackButtonEvent} from './templates/header';
import {setTimer, cleanTimer} from './data/timer';
import {setStats, checkAnswer, getAnswerType} from './data/answer';
import {changeGame, isLastGame} from './data/game';
import {isLivesEnded, setLives} from './data/lives';

const getTimer = () => {
  const timer = document.querySelector(`.game__timer`);
  return timer.innerHTML;
};

const addAnswerResult = (state, timer, ...answer) => {
  const game = games[state.game];
  const answerResult = [...answer].every((a) => {
    return a.type && checkAnswer(game.answers[a.index].type, a.type);
  });
  const point = getAnswerType(answerResult, timer);
  let newState = setStats(state, point);
  if (!answerResult) {
    newState = setLives(newState, newState.lives - 1);
  }
  return newState;
};

const nextDisplay = (state) => {
  let display = ``;
  if (isLastGame(state.game) || isLivesEnded(state.lives)) {
    display = getStats(state);
  } else {
    let newState = changeGame(state);
    newState = cleanTimer(newState);
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
      let newState = setStats(state, ANSWER_TYPES.wrong);
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
    case GAMES_TYPES.twoQuestions:
      switchDisplayEventGame1(form, state, interval);
      break;

    case GAMES_TYPES.oneQuestion:
      switchDisplayEventGame2(form, state, interval);
      break;

    case GAMES_TYPES.threeQuestions:
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
      const newState = addAnswerResult(state, getTimer(), {index: 0, type: answer1}, {index: 1, type: answer2});
      nextDisplay(newState);
    }
  });
};

const switchDisplayEventGame2 = (form, state, interval) => {
  form.addEventListener(`change`, () => {
    clearInterval(interval);
    const answer1 = form.querySelector(`input[name="question1"]:checked`).value;
    const newState = addAnswerResult(state, getTimer(), {index: 0, type: answer1});
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
      const newState = addAnswerResult(state, getTimer(), {index: indexImage, type: imageType});
      nextDisplay(newState);
    }
  });
};
export default getGameDisplay;
