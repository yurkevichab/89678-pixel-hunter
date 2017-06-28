import Intro from './intro/intro';
import Greeting from './greeting/greeting';
import Rules from './rules/rules';
import Game from './game/game';
import Stats from './stats/stats';
import gameModel from './game/game-model';
import GameAdapter from './game/game-adapter';

const ControllerId = {
  INTRO: ``,
  GREETING: `greeting`,
  RULES: `rules`,
  GAME: `game`,
  STATS: `stat`,
};

const getControllerIdFromHash = (hash) => hash.replace(`#`, ``);

class App {
  constructor() {
    gameModel.load(GameAdapter)
      .then((games) => this.setup(games))
      .then(() => this.showGreeting())
      .catch(window.console.error);
  }

  setup(data) {
    this.routes = {
      [ControllerId.INTRO]: new Intro(),
      [ControllerId.GREETING]: new Greeting(),
      [ControllerId.RULES]: new Rules(),
      [ControllerId.GAME]: new Game(data),
      [ControllerId.STATS]: new Stats(data)
    };
    window.onhashchange = () => this.changeController(this._parseHashFromUrl()).catch(window.console.error);
  }

  _parseHashFromUrl() {
    const hash = location.hash.split(`=`);
    const [controller, hashValue] = hash;
    return {
      controller: getControllerIdFromHash(controller),
      value: hashValue ? this._encodeData(hashValue) : hashValue
    };
  }

  _encodeData(data) {
    return JSON.parse(atob(data));
  }

  _decodeData(data) {
    return btoa(JSON.stringify(data));
  }

  changeController(route = ``, value) {
    this.routes[route].init();
  }

  showIntro() {
    location.hash = ControllerId.INTRO;
  }

  showGreeting() {
    location.hash = ControllerId.GREETING;
  }

  showRules() {
    location.hash = ControllerId.RULES;
  }

  showGame(username) {
    const encodeState = this._decodeData(username);
    location.hash = `${ControllerId.GAME}=${encodeState}`;
  }

  showStats(state) {
    const encodeState = this._decodeData(state);
    location.hash = `${ControllerId.STATS}=${encodeState}`;
  }
}

const app = new App();

export default app;
