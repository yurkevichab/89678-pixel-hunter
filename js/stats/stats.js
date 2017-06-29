import StatsView from './stats-view';
import switchDisplay from '../switch-display';
import App from '../app';
import gameModel from '../game/game-model';

export default class Stats {
  constructor() {
  }

  init(username) {
    this.states = gameModel.getStats(username);
    this.view = new StatsView(this.state);
    switchDisplay(this.view);
    this.view.onBackToGreeting = () => App.showGreeting();
  }
}
