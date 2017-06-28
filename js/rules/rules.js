import switchDisplay from '../switch-display';
import RulesView from './rules-view';
import App from '../main';

export default class Rules {
  constructor() {
  }

  init() {
    const view = new RulesView();
    switchDisplay(view);

    view.onChangeDisplay = (userName) => {
      App.showGame(userName);
    };

    view.onBackToGreeting = () => App.showGreeting();
  }
}
