import switchDisplay from '../switch-display';
import RulesView from './rules-view';
import App from '../main';
import {initialState} from '../data';

export default class Rules {
  constructor() {
    this.view = new RulesView();
    this.state = initialState;
  }

  init() {
    switchDisplay(this.view);

    this.view.onChangeDisplay = (userName) => {
      App.showGame(userName);
    };

    this.view.onBackToGreeting = () => App.showGreeting();
  }
}
