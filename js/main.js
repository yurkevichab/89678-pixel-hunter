import Intro from './intro/intro';
import Greeting from './greeting/greeting';
import Rules from './rules/rules';
import Game from './game/game';
import Stats from './stats/stats';

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

    window.onhashchange = () => {
      const {controller, hashValue} = this._parseHashFromUrl();
      this.changeController(controller, hashValue);
    };
  }
  init() {
    const {controller, hashValue} = this._parseHashFromUrl();
    this.changeController(controller, hashValue);
  }

  _parseHashFromUrl() {
    const hash = location.hash.split(`=`);
    const controller = getControllerIdFromHash(hash[0]);
    const hashValue = hash[1];
    return {controller, hashValue};
  }

  changeController(route = ``, hashValue) {
    const Controller = this.routes[route];
    if (Controller) {
      new Controller(hashValue).init();
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

  showGame() {
    location.hash = ControllerId.GAME;
  }

  showStats(encodeState) {
    location.hash = `${ControllerId.STATS}=${encodeState}`;
  }
}

const app = new App();
app.init();

export default app;
