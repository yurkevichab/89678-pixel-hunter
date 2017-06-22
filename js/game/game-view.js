import AbstractView from '../view';
import {getHeader, addBackButtonEvent} from '../templates/header';
import footer from '../templates/footer';
import createStats from '../create-stats';
import {GAMES_TYPES} from '../data';

const OPTIONS = [
  {
    'text': `Рисунок`,
    'type': `paint`
  },
  {
    'text': `Фото`,
    'type': `photo`
  }
];

const ADDITION_GAME_DATA = {
  'game-1': {
    'formClass': ``,
    'haveOption': true,
    'imagesWidth': 468,
    'imagesHeight': 458,
    'additionClasses': ``
  },
  'game-2': {
    'formClass': `game__content--wide`,
    'haveOption': true,
    'imagesWidth': 705,
    'imagesHeight': 455,
    'additionClasses': {
      'paint': `game__answer--wide`
    }
  },
  'game-3': {
    'formClass': `game__content--triple`,
    'haveOption': false,
    'imagesWidth': 304,
    'imagesHeight': 455,
    'additionClasses': ``
  }
};

export default class gameTemplate extends AbstractView {
  constructor(game, state) {
    super();
    this.state = state;
    this.game = game;
  }

  _getAnswer(type, answer, index) {
    const {haveOption, additionClasses, imagesWidth, imagesHeight} = ADDITION_GAME_DATA[type];
    return `
    <div class="game__option">
      <img src="${answer.image}" alt="Option ${index}" width="${imagesWidth}" height="${imagesHeight}">
      ${haveOption ? this._getOptions(additionClasses, index) : ``}
    </div>`;
  }

  _getAnswers(game) {
    const gameType = game.type;
    return game.answers.reduce((content, answer, index) => {
      const htmlAnswer = this._getAnswer(gameType, answer, index + 1);
      return content + htmlAnswer;
    }, ``);
  }

  _getOption({type, text}, additionClasses, index) {
    const additionClass = additionClasses ? additionClasses[type] : ``;
    return `
    <label class="game__answer game__answer--${type} ${additionClass}">
      <input name="question${index}" type="radio" value="${type}">
      <span>${text}</span>
    </label>`;
  }

  _getOptions(additionClasses, index) {
    return OPTIONS.reduce((prev, option) => {
      const label = this._getOption(option, additionClasses, index);
      return prev + label;
    }, ``);
  }

  get template() {
    const formClass = ADDITION_GAME_DATA[this.game.type].formClass;
    return `
  ${getHeader(this.state)}
  <div class="game">
    <p class="game__task">${this.game.description}</p>
    <form class="game__content ${formClass}">     
      ${this._getAnswers(this.game)}
    </form>
    <div class="stats">
      ${createStats(this.state.stats)}
    </div>
  </div>
  ${footer}`;
  }

  bind() {
    const form = this.element.querySelector(`.game__content`);
    const timerElement = this.element.querySelector(`.game__timer`);

    switch (this.game.type) {
      case GAMES_TYPES.twoQuestions:
        this.onAnswerTwoQuestions(form);
        break;

      case GAMES_TYPES.oneQuestion:
        this.onAnswerOneQuestion(form);
        break;

      case GAMES_TYPES.threeQuestions:
        this.onAnswerThreeQuestions(form);
        break;
    }
    this.onResizeImages(form);
    this.onBackButtonClick();
    this.onUpdateTimer(timerElement);
  }

  onBackButtonClick() {
    addBackButtonEvent(this.element);
  }
}
