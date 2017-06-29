import switchDisplay from '../switch-display';
import IntroView from './intro-view';

export default class Intro {
  init() {
    this.view = new IntroView();
    switchDisplay(this.view);
  }
}
