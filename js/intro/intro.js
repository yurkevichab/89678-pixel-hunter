import switchDisplay from '../switch-display';
import IntroView from './intro-view';

class Intro {
  constructor() {
    this.view = new IntroView();
  }

  init() {
    switchDisplay(this.view);
  }
}

export default new Intro();
