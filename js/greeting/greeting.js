import switchDisplay from '../switch-display';
import GreetingView from './greeting-view';
import getRules from '../rules/rules';

export default () => {
  const greeting = new GreetingView();
  greeting.onChangeDisplay = () => switchDisplay(getRules());

  return greeting.element;
};
