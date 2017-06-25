import switchDisplay from '../switch-display';
import RulesView from './rules-view';
import App from '../main';

export default class Rules {
  constructor() {
    this.view = new RulesView();
  }

  init() {
    switchDisplay(this.view);

    this.view.onChangeDisplay = () => App.showGame();
    this.view.onBackToGreeting = () => App.showGreeting();
  }
}
