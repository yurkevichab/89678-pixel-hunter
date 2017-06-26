import switchDisplay from '../switch-display';
import GreetingView from './greeting-view';
import App from '../main';

export default class Greeting {
  constructor() {
    this.view = new GreetingView();
  }

  init() {
    switchDisplay(this.view);

    this.view.onChangeDisplay = () => {
      App.showRules();
    };
  }
}
