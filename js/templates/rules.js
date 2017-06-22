import createElement from '../create-element';
import switchDisplay from '../switch-display';
import footer from './footer';
import {initialState} from '../data';
import createGameDisplay from '../game/create-game-display';
import {getHeader, addBackButtonEvent} from './header';

export default () => {
  const template = `
  ${getHeader()}
  <div class="rules">
    <h1 class="rules__title">Правила</h1>
    <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
      src="img/photo_icon.png" width="16" height="16"> или рисунок <img
      src="img/paint_icon.png" width="16" height="16" alt="">.<br>
      Фотографиями или рисунками могут быть оба изображения.<br>
      На каждую попытку отводится 30 секунд.<br>
      Ошибиться можно не более 3 раз.<br>
      <br>
      Готовы?
    </p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя">
      <button class="rules__button  continue" type="submit" disabled>Go!</button>
    </form>
  </div>
  ${footer}`;

  const display = createElement(template);
  const rulesInput = display.querySelector(`.rules__input`);
  const rulesButton = display.querySelector(`.rules__button`);
  addBackButtonEvent(display);

  rulesInput.addEventListener(`input`, (e) => {
    rulesButton.disabled = !e.target.value.trim();
  });

  rulesButton.addEventListener(`click`, (e) => {
    e.preventDefault();
    const gameDisplay = createGameDisplay(initialState);
    switchDisplay(gameDisplay);
  });

  return display;
};
