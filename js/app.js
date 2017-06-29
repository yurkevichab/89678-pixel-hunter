import Intro from './intro/intro';
import Greeting from './greeting/greeting';
import Rules from './rules/rules';
import Game from './game/game';
import Stats from './stats/stats';
import gameModel from './game/game-model';

const ControllerId = {
  GREETING: ``,
  RULES: `rules`,
  GAME: `game`,
  STATS: `stat`,
};

const getControllerIdFromHash = (hash) => hash.replace(`#`, ``);

class App {
  init() {
    this.showIntro();
    gameModel.getQuestions()
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

  showIntro() {
    Intro.init();
  }

  _parseHashFromUrl() {
    const hash = location.hash.split(`=`);
    const [controller, hashValue] = hash;
    return {
      controller: getControllerIdFromHash(controller),
      value: hashValue ? this._encodeData(hashValue) : ``
    };
  }

  _encodeData(data) {
    const encode64 = atob(data);
    return encode64 ? JSON.parse(encode64) : null;

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
    location.hash = `${ControllerId.GAME}=${this._decodeData(username)}`;
  }

  showStats(username) {
    location.hash = `${ControllerId.STATS}=${this._decodeData(username)}`;
  }
}
const app = new App();

export default app;
