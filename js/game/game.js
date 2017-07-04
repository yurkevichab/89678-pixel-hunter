import {MIN_TIMER_VALUE, Result, initialState} from '../data/data';
import switchDisplay from '../switch-display';
import {setTimer, cleanTimer} from '../data/timer';
import {setStats, getAnswerType} from '../data/answer';
import {changeGame, isLastGame} from '../data/game';
import {isLivesEnded, reduceLives} from '../data/lives';
import GameView from './game-view';
import App from '../app';
import setUserName from '../data/userName';
import gameModel from './game-model';

export default class Game {
  constructor(games) {
    this.games = games;
  }

  init({value: userName}) {
    if (!userName) {
      App.showRules();
    }
    const state = setUserName(initialState, userName);
    this._gameInit(state);
  }

  _gameInit(state) {
    this.timer = this._startTimer();
    this._createGameView(state);
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

  _processWrongResult() {
    return reduceLives(setStats(this.state, Result.WRONG));
  }

  _startTimer() {
    const timer = setInterval(() => {
      this.state = setTimer(this.state);
      this.view.updateTimer(this.state.timer);
      if (this.state.timer === MIN_TIMER_VALUE) {
        clearInterval(this.timer);
        const newState = this._processWrongResult();
        this._nextDisplay(newState);
      }
    }, 1000);
    return timer;
  }

  _sendStats(state) {
    App.showIntro();
    gameModel.sendStats(state)
      .then(() => App.showStats(state.userName))
      .catch(window.console.error);
  }

  _nextDisplay(state) {
    if (isLastGame(state.game, this.games) || isLivesEnded(state.lives)) {
      this._sendStats(state);
      return;
    }
    const newState = cleanTimer(changeGame(state, this.games));
    this._gameInit(newState);
  }

  _addAnswerResult(isCorrectAnswer) {
    if (!isCorrectAnswer) {
      return this._processWrongResult();
    }
    const answerType = getAnswerType(isCorrectAnswer, this.state.timer);
    return setStats(this.state, answerType);
  }

  _createGameView(state) {
    this.state = state;
    this.game = this.games[state.game];
    this.view = new GameView(this.game, state);
  }
}
