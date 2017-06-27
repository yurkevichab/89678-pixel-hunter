import {MIN_TIMER_VALUE, ANSWER_TYPES, initialState} from '../data';
import switchDisplay from '../switch-display';
import {setTimer, cleanTimer} from '../data/timer';
import {setStats, getAnswerType} from '../data/answer';
import {changeGame, isLastGame} from '../data/game';
import {isLivesEnded, reduceLives} from '../data/lives';
import GameView from './game-view';
import App from '../main';

export default class Game {
  constructor() {
    this.games = App.data;
    this._createGameView(initialState);
  }

  init() {
    switchDisplay(this.view);

    this.view.onBackToGreeting = () => {
      clearInterval(this.timer);
      App.showGreeting();
    };

    this.view.onAnswerQuestion = (isCorrectAnswer) => {
      clearInterval(this.timer);
      const newState = this._addAnswerResult(isCorrectAnswer);
      this._nextDisplay(newState);
    };
  }

  _startTimer() {
    const timer = setInterval(() => {
      this.state = setTimer(this.state);
      this.view.updateTimer(this.state.timer);
      if (this.state.timer === MIN_TIMER_VALUE) {
        clearInterval(this.timer);
        let newState = reduceLives(setStats(this.state, ANSWER_TYPES.wrong));
        this._nextDisplay(newState);
      }
    }, 1000);
    return timer;
  }

  _nextDisplay(state) {
    if (isLastGame(state.game, this.games) || isLivesEnded(state.lives)) {
      App.showStats(state);
    } else {
      state = cleanTimer(changeGame(state, this.games));
      this._createGameView(state);
      this.init();
    }
  }

  _addAnswerResult(isCorrectAnswer) {
    const point = getAnswerType(isCorrectAnswer, this.state.timer);
    let newState = setStats(this.state, point);
    if (!isCorrectAnswer) {
      newState = reduceLives(newState);
    }
    return newState;
  }

  _createGameView(state) {
    this.state = state;
    this.game = this.games[state.game];
    this.view = new GameView(this.game, state);
    this.timer = this._startTimer();
  }
}
