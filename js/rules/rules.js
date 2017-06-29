import switchDisplay from '../switch-display';
import RulesView from './rules-view';
import App from '../app';

export default class Rules {
  constructor() {
  }

  init() {
    const view = new RulesView();
    switchDisplay(view);

    view.onChangeDisplay = (userName) => {
      App.showGame(userName);
    };

    this.view.onBackToGreeting = () => App.showGreeting();
  }
}
