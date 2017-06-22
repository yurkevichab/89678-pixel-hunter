import {games, MIN_TIMER_VALUE, ANSWER_TYPES} from '../data';
import switchDisplay from '../switch-display';
import getStats from '../templates/stats';
import {setTimer, cleanTimer} from '../data/timer';
import {setStats, checkAnswer, getAnswerType} from '../data/answer';
import {changeGame, isLastGame} from '../data/game';
import {isLivesEnded, setLives} from '../data/lives';
import resizeImage from '../data/resizeImage';
import GameView from './game-view';

const addAnswerResult = (state, ...answer) => {
  const game = games[state.game];
  const answerResult = [...answer].every((a, index) => {
    return a.type && checkAnswer(game.answers[a.index].type, a.type);
  });
  const point = getAnswerType(answerResult, state.timer);
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
  let timer = null;
  const game = games[state.game];
  const gameView = new GameView(game, state);

  gameView.onUpdateTimer = (timerElement) => {
    timer = setInterval(() => {
      state = setTimer(state);
      timerElement.innerHTML = state.timer;
      if (state.timer === MIN_TIMER_VALUE) {
        clearInterval(timer);
        let newState = setStats(state, ANSWER_TYPES.wrong);
        newState = setLives(newState, newState.lives - 1);
        nextDisplay(newState);
      }
    }, 1000);
  };

  gameView.onResizeImages = (form) => {
    const answerImages = form.querySelectorAll(`.game__option img`);
    for (let img of answerImages) {
      img.addEventListener(`load`, () => {
        const parentBlock = img.parentNode;
        const frame = {
          width: parentBlock.clientWidth,
          height: parentBlock.clientHeight
        };
        const correctedSizes = resizeImage(frame, {
          width: img.naturalWidth,
          height: img.naturalHeight
        });

        img.width = correctedSizes.width;
        img.height = correctedSizes.height;
      });
    }
  };

  gameView.onAnswerTwoQuestions = (form) => {
    const isRadioChecked = (radioName) => {
      const radios = form.querySelectorAll(`input[name=${radioName}]`);

      return [...radios].some((radio) => radio.checked);
    };

    form.addEventListener(`change`, () => {
      if (isRadioChecked(`question1`) && isRadioChecked(`question2`)) {
        clearInterval(timer);
        const answer1 = form.querySelector(`input[name="question1"]:checked`).value;
        const answer2 = form.querySelector(`input[name="question2"]:checked`).value;
        const newState = addAnswerResult(state, {index: 0, type: answer1}, {index: 1, type: answer2});
        nextDisplay(newState);
      }
    });
  };

  gameView.onAnswerOneQuestion = (form) => {
    form.addEventListener(`change`, () => {
      clearInterval(timer);
      const answer1 = form.querySelector(`input[name="question1"]:checked`).value;
      const newState = addAnswerResult(state, {index: 0, type: answer1});
      nextDisplay(newState);
    });

  };

  gameView.onAnswerThreeQuestions = (form) => {
    form.addEventListener(`click`, (e) => {
      clearInterval(timer);
      const images = form.querySelectorAll(`.game__option`);
      if (e.target.closest(`.game__option`)) {
        const indexImage = [...images].indexOf(e.target);
        const imageType = games[state.game].answers[indexImage].type;
        const newState = addAnswerResult(state, {index: indexImage, type: imageType});
        nextDisplay(newState);
      }
    });
  };
  return gameView.element;
};
export default getGameDisplay;
