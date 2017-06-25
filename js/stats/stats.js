import StatsView from './stats-view';
import switchDisplay from '../switch-display';
import App from '../main';

export default class Stats {
  constructor(hashState) {
    this.state = JSON.parse(atob(hashState));
    this.view = new StatsView(this.state);
  }

  init() {
    switchDisplay(this.view);
    this.view.onBackToGreeting = () => App.showGreeting();
  }
}
