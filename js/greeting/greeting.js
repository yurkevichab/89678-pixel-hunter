import switchDisplay from '../switch-display';
import GreetingView from './greeting-view';
import App from '../app';

export default class Greeting {
  init() {
    this.view = new GreetingView();
    switchDisplay(this.view);

    this.view.onChangeDisplay = () => {
      App.showRules();
    };
  }
}
