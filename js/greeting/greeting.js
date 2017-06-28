import switchDisplay from '../switch-display';
import GreetingView from './greeting-view';
import App from '../main';

export default class Greeting {
  constructor() {
  }

  init() {
    this.view = new GreetingView();
    switchDisplay(this.view);

    this.view.onChangeDisplay = () => {
      App.showRules();
    };
  }
}
