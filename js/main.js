/*
 import switchDisplay from './switch-display';
 import getIntro from './intro/intro';

 switchDisplay(getIntro());
 */
import Intro from './intro/intro';
import Greeting from './greeting/greeting';
import Rules from './rules/rules';
import Game from './game/game';
import Stat from './stat/stat';

const ControllerId = {
  INTRO: ``,
  GREETING: `greeting`,
  RULES: `rules`,
  GAME: `game`,
  STAT: `stat`,
};

const getControllerIdFromHash = (hash) => hash.replace(`#`, ``);

class App {
  constructor() {
    this.routes = {
      [ControllerId.INTRO]: Intro,
      [ControllerId.GREETING]: Greeting,
      [ControllerId.RULES]: Rules,
      [ControllerId.GAME]: Game,
      [ControllerId.STAT]: Stat
    };

    window.onhashchange = () => {
      this.changeController(getControllerIdFromHash(location.hash));
    };
  }
  init() {
    this.changeController(getControllerIdFromHash(location.hash));
  }

  changeController(route = ``) {
    const Controller = this.routes[route];
    if (Controller) {
      new Controller().init();
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

  showStat() {
    location.hash = ControllerId.STAT;
  }
}

const app = new App();
app.init();

export default app;
