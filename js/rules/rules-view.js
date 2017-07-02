import AbstractView from '../view';
import getFooter from '../templates/footer';
import getHeader from '../templates/header';
import addBackButtonClick from '../add-back-button-click';

export default class rulesView extends AbstractView {
  get template() {
    return `
      ${getHeader()}
      <div class="rules">
        <h1 class="rules__title">Правила</h1>
        <p class="rules__description">Угадай 10 раз для каждого изображения фото 
          <img src="img/photo_icon.png" width="16" height="16"> или рисунок 
          <img src="img/paint_icon.png" width="16" height="16" alt="">.<br>
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
      ${getFooter}`;
  }

  bind() {
    const rulesInput = this.element.querySelector(`.rules__input`);
    const rulesButton = this.element.querySelector(`.rules__button`);
    rulesInput.addEventListener(`input`, (event) => {
      rulesButton.disabled = !event.target.value.trim();
    });
    rulesButton.addEventListener(`click`, (event) => {
      event.preventDefault();
      const username = rulesInput.value.trim();
      this._cleanInput(rulesInput);
      this.onChangeDisplay(username);
    });
    addBackButtonClick(this.element, () => {
      this._cleanInput(rulesInput);
      this.onBackToGreeting();
    });
  }

  _cleanInput(rulesInput) {
    rulesInput.value = ``;
  }
}
