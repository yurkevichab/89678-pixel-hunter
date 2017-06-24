import switchDisplay from '../switch-display';
import {initialState} from '../data';
import createGameDisplay from '../game/game';
import RulesView from './rules-view';
import getGreeting from '../greeting/greeting';

export default () => {
  const rules = new RulesView();

  rules.onChangeInput = (rulesButton, e) => {
    rulesButton.disabled = !e.target.value.trim();
  };

  rules.onChangeDisplay = () => {
    const gameDisplay = createGameDisplay(initialState);
    switchDisplay(gameDisplay);
  };

  rules.onBackToGreeting = () => switchDisplay(getGreeting());
  return rules.element;
};
