import createElement from '../create-element';
import switchDisplay from '../switch-display';
import getGame2 from './game-2';
import getGreeting from './greeting';
import header from './header';
import footer from './footer';

const withHearts = true;

export default () => {
  const template = `
  ${header(withHearts)}
  <div class="game">
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
      <div class="game__option">
        <img src="http://placehold.it/468x458" alt="Option 1" width="468" height="458">
        <label class="game__answer game__answer--photo">
          <input name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
      <div class="game__option">
        <img src="http://placehold.it/468x458" alt="Option 2" width="468" height="458">
        <label class="game__answer  game__answer--photo">
          <input name="question2" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input name="question2" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
    <div class="stats">
      <ul class="stats">
        <li class="stats__result stats__result--wrong"></li>
        <li class="stats__result stats__result--slow"></li>
        <li class="stats__result stats__result--fast"></li>
        <li class="stats__result stats__result--correct"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--unknown"></li>
      </ul>
    </div>
  </div>
  ${footer}`;

  const display = createElement(template);
  const form = display.querySelector(`.game__content`);

  const isCheckedRadio = (radioName) => {
    const radios = form.querySelectorAll(`input[name=${radioName}]`);
    return [...radios].some((radio) => radio.checked);
  };

  form.addEventListener(`change`, () => {
    if (isCheckedRadio(`question1`) && isCheckedRadio(`question2`)) {
      switchDisplay(getGame2());
    }
  });

  const backButton = display.querySelector(`.header__back`);
  backButton.addEventListener(`click`, () => switchDisplay(getGreeting()));
  return display;
};
