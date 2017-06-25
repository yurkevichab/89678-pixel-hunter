import {games, MIN_TIMER_VALUE, ANSWER_TYPES} from '../data';
import switchDisplay from '../switch-display';
import getStats from '../stats/stats';
import {setTimer, cleanTimer} from '../data/timer';
import {setStats, getAnswerType} from '../data/answer';
import {changeGame, isLastGame} from '../data/game';
import {isLivesEnded, reduceLives} from '../data/lives';
import GameView from './game-view';
import getGreeting from '../greeting/greeting';

const addAnswerResult = (state, isCorrectAnswer) => {
  const point = getAnswerType(isCorrectAnswer, state.timer);
  let newState = setStats(state, point);
  if (!isCorrectAnswer) {
    newState = reduceLives(newState);
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

  gameView.onAnswerQuestion = (isCorrectAnswer) => {
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
        newState = reduceLives(newState);
        nextDisplay(newState);
      }
    }, 1000);
  };
  return gameView;
};
export default getGameDisplay;
