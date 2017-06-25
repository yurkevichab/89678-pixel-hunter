import switchDisplay from '../switch-display';
import getGreeting from '../greeting/greeting';
import IntroView from './intro-view';

export default () => {
  const intro = new IntroView();
  intro.onChangeDisplay = () => switchDisplay(getGreeting());

  return intro;
};
