import createElement from '../create-element';
import switchDisplay from '../switch-display';
import greeting from './greeting';
import footer from './footer';

const template = `<div id="main" class="central__content">
    <div id="intro" class="intro">
      <h1 class="intro__asterisk">*</h1>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </div>
  </div>
${footer}`;

const display = createElement(template);
const introAsterisk = display.querySelector(`.intro__asterisk`);
introAsterisk.addEventListener(`click`, () => {
  switchDisplay(greeting);
});

export default display;
