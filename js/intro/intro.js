import switchDisplay from '../switch-display';
import IntroView from './intro-view';

export default class Intro {
  constructor() {
    this.view = new IntroView();
  }

  init() {
    switchDisplay(this.view);
  }
}
