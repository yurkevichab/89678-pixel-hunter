import switchDisplay from '../switch-display';
import RulesView from './rules-view';
import App from '../app';

export default class Rules {
  init() {
    this.view = new RulesView();
    switchDisplay(this.view);

    this.view .onChangeDisplay = (userName) => {
      App.showGame(userName);
    };

    this.view.onBackToGreeting = () => App.showGreeting();
  }
}
