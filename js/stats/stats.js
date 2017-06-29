import StatsView from './stats-view';
import switchDisplay from '../switch-display';
import App from '../app';
import gameModel from '../game/game-model';

export default class Stats {
  init(username) {
    gameModel.getStats(username).then((data) => {
      this.stats = data;
      this.statsInit();
    });
  }

  statsInit() {
    this.view = new StatsView(this.stats);
    switchDisplay(this.view);
    this.view.onBackToGreeting = () => App.showGreeting();
  }
}
