import switchDisplay from '../switch-display';
import IntroView from './intro-view';
import App from '../main';

export default class Intro {
  constructor() {
    this.view = new IntroView();
  }

  init() {
    switchDisplay(this.view);

    this.view.onChangeDisplay = () => {
      App.showGreeting();
    };
  }
}
