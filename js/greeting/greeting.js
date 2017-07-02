import switchDisplay from '../switch-display';
import GreetingView from './greeting-view';
import App from '../app';

export default class Greeting {
  constructor() {
    this.view = new GreetingView();
  }

  init({isCrossfade}) {
    switchDisplay(this.view, isCrossfade);
    this.view.onChangeDisplay = () => App.showRules();
  }
}
