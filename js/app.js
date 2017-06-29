import Intro from './intro/intro';
import Greeting from './greeting/greeting';
import Rules from './rules/rules';
import Game from './game/game';
import Stats from './stats/stats';
import gameModel from './game/game-model';
import GameAdapter from './game/game-adapter';

const ControllerId = {
  GREETING: ``,
  RULES: `rules`,
  GAME: `game`,
  STATS: `stat`,
};

const getControllerIdFromHash = (hash) => hash.replace(`#`, ``);

class App {
  constructor() {
    gameModel.load(GameAdapter)
      .then((games) => this.setup(games))
      .then(() => this.changeController(this._parseHashFromUrl()))
      .catch(window.console.error);
  }

  setup(data) {
    this.routes = {
      [ControllerId.GREETING]: new Greeting(),
      [ControllerId.RULES]: new Rules(),
      [ControllerId.GAME]: new Game(data),
      [ControllerId.STATS]: new Stats()
    };
    window.onhashchange = () => this.changeController(this._parseHashFromUrl());
  }

  init() {
    new Intro().init();

  }
  
  _parseHashFromUrl() {
    const hash = location.hash.split(`?`);
    const [controller, hashValue] = hash;
    const value = hashValue ? hashValue.split(`=`)[1] : hashValue;
    return {
      controller: getControllerIdFromHash(controller),
      value: value ? this._encodeData(value) : value
    };
  }

  _encodeData(data) {
    return JSON.parse(atob(data));
  }

  _decodeData(data) {
    return btoa(JSON.stringify(data));
  }

  changeController({controller, value}) {
    this.routes[controller].init(value);
  }

  showGreeting() {
    location.hash = ControllerId.GREETING;
  }

  showRules() {
    location.hash = ControllerId.RULES;
  }

  showGame(username) {
    const encodeState = this._decodeData(username);
    location.hash = `${ControllerId.GAME}?username=${encodeState}`;
  }

  showStats(state) {
    const encodeState = this._decodeData(state);
    location.hash = `${ControllerId.STATS}?state=${encodeState}`;
  }
}
const app = new App();

export default app;
