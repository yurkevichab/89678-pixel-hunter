import StatsView from './stats-view';
import switchDisplay from '../switch-display';
import getGreeting from '../greeting/greeting';

export default (state) => {
  const stats = new StatsView(state);
  stats.onBackToGreeting = () => switchDisplay(getGreeting());

  return stats.element;
};
