import {games, MIN_TIMER_VALUE, ANSWER_TYPES} from '../data';
import switchDisplay from '../switch-display';
import getStats from '../stats/stats';
import {setTimer, cleanTimer} from '../data/timer';
import {setStats, getAnswerType} from '../data/answer';
import {changeGame, isLastGame} from '../data/game';
import {isLivesEnded, setLives} from '../data/lives';
import resizeImage from '../data/resizeImage';
import GameView from './game-view';
import getGreeting from '../greeting/greeting';

const addAnswerResult = (state, isCorrectAnswer) => {
  const point = getAnswerType(isCorrectAnswer, state.timer);
  let newState = setStats(state, point);
  if (!isCorrectAnswer) {
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

  gameView.onBackToGreeting = () => {
    clearInterval(timer);
    switchDisplay(getGreeting());
  };

  gameView.resizeImages = (img) => {
    const parentBlock = img.parentNode;
    const frame = {
      width: parentBlock.clientWidth,
      height: parentBlock.clientHeight
    };
    const correctedSizes = resizeImage(frame, {
      width: img.naturalWidth,
      height: img.naturalHeight
    });

    return {width: correctedSizes.width, height: correctedSizes.height};
  };

  gameView.onAnswerTwoQuestions = (isCorrectAnswer) => {
    clearInterval(timer);
    const newState = addAnswerResult(state, isCorrectAnswer);
    nextDisplay(newState);
  };

  gameView.onAnswerOneQuestion = (isCorrectAnswer) => {
    clearInterval(timer);
    const newState = addAnswerResult(state, isCorrectAnswer);
    nextDisplay(newState);
  };

  gameView.onAnswerThreeQuestions = (isCorrectAnswer) => {
    clearInterval(timer);
    const newState = addAnswerResult(state, isCorrectAnswer);
    nextDisplay(newState);
  };

  gameView.onUpdateTimer = (updateTimer) => {
    timer = setInterval(() => {
      state = setTimer(state);
      updateTimer(state.timer);
      if (state.timer === MIN_TIMER_VALUE) {
        clearInterval(timer);
        let newState = setStats(state, ANSWER_TYPES.wrong);
        newState = setLives(newState, newState.lives - 1);
        nextDisplay(newState);
      }
    }, 1000);
  };
  return gameView.element;
};
export default getGameDisplay;
