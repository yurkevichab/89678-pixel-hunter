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
    this.routes = {
      [ControllerId.INTRO]: Intro,
      [ControllerId.GREETING]: Greeting,
      [ControllerId.RULES]: Rules,
      [ControllerId.GAME]: Game,
      [ControllerId.STATS]: Stats
    };

    gameModel.loadData(GameAdapter).then(() => this.init());

    window.onhashchange = () => this.init();
  }

  init() {
    const {controller, state} = this._parseHashFromUrl();
    this.changeController(controller, state);
  }

  _parseHashFromUrl() {
    const hash = location.hash.split(`=`);
    const [controller, hashValue] = hash;
    return {
      controller: getControllerIdFromHash(controller),
      state: hashValue ? JSON.parse(atob(hashValue)) : hashValue
    };
  }

  changeController(route = ``, state) {
    const Controller = this.routes[route];
    if (Controller) {
      new Controller(state).init();
    }
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

  showGame(state) {
    const encodeState = btoa(JSON.stringify(state));
    location.hash = `${ControllerId.GAME}=${encodeState}`;
  }

  showStats(state) {
    const encodeState = btoa(JSON.stringify(state));
    location.hash = `${ControllerId.STATS}=${encodeState}`;
  }
}

const app = new App();

export default app;
