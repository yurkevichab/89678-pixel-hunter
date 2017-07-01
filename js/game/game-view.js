import AbstractView from '../view';
import getHeader from '../templates/header';
import getFooter from '../templates/footer';
import getGameStats from '../templates/game-stats';
import {QuestionType, AnswerType} from '../data/data';
import {checkAnswer} from '../data/answer';
import addBackButtonClick from '../add-back-button-click';

const OPTIONS = [
  {
    'text': `Рисунок`,
    'type': `paint`,
    'value': AnswerType.PAINTING
  },
  {
    'text': `Фото`,
    'type': `photo`,
    'value': AnswerType.PHOTO
  }
];

const AdditionGameData = {
  [QuestionType.TWO_OF_TWO]: {
    'formClass': ``,
    'haveOption': true,
    'additionClasses': ``
  },
  [QuestionType.TINDER_LIKE]: {
    'formClass': `game__content--wide`,
    'haveOption': true,
    'additionClasses': {
      'paint': `game__answer--wide`
    }
  },
  [QuestionType.ONE_OF_THREE]: {
    'formClass': `game__content--triple`,
    'haveOption': false,
    'additionClasses': ``
  }
};


const addFormClickEvent = (element, answers, callback) => {
  const form = element.querySelector(`.game__content`);
  form.addEventListener(`click`, (e) => {
    const images = form.querySelectorAll(`.game__option`);
    if (e.target.closest(`.game__option`)) {
      const indexImage = [...images].indexOf(e.target);
      const isCorrectAnswer = !!answers[indexImage].type;
      callback(isCorrectAnswer);
    }
  });
};

const addFormChangeEvent = (element, answers, callback) => {
  const form = element.querySelector(`.game__content`);
  form.addEventListener(`change`, () => {
    const inputs = [...form.querySelectorAll(`input`)];
    const checkedInputs = inputs.filter((input) => input.checked);

    if (checkedInputs.length === answers.length) {
      const isCorrectAnswer = checkedInputs.every((answer, index) => {
        return checkAnswer(answers[index].type, answer.value);
      });
      callback(isCorrectAnswer);
      return;
    }

    checkedInputs.forEach((checkedInput) => {
      inputs.filter((input) => input.name === checkedInput.name).forEach((input) => {
        input.disabled = true;
      });
    });
  });
};

const getAnswer = (type, answer, index) => {
  const {haveOption, additionClasses} = AdditionGameData[type];
  return `
    <div class="game__option">
      <img src="${answer.image.url}" alt="Option ${index}" width="${answer.image.width}" height="${answer.image.height}">
      ${haveOption ? getOptions(additionClasses, index) : ``}
    </div>`;
};

const getAnswers = (game) => {
  const gameType = game.type;
  return game.answers.reduce((content, answer, index) => {
    const htmlAnswer = getAnswer(gameType, answer, index + 1);
    return content + htmlAnswer;
  }, ``);
};

const getOption = ({type, text, value}, additionClasses, index) => {
  const additionClass = additionClasses ? additionClasses[type] : ``;
  return `
    <label class="game__answer game__answer--${type} ${additionClass}">
      <input name="question${index}" type="radio" value="${value}">
      <span>${text}</span>
    </label>`;
};

const getOptions = (additionClasses, index) => {
  return OPTIONS.reduce((prev, option) => {
    const label = getOption(option, additionClasses, index);
    return prev + label;
  }, ``);
};

const GameTypeHandler = {
  [QuestionType.TWO_OF_TWO]: addFormChangeEvent,
  [QuestionType.TINDER_LIKE]: addFormChangeEvent,
  [QuestionType.ONE_OF_THREE]: addFormClickEvent
};

export default class gameTemplate extends AbstractView {
  constructor(game, state) {
    super();
    this.state = state;
    this.game = game;
  }

  get template() {
    const formClass = AdditionGameData[this.game.type].formClass;
    return `
    ${getHeader(this.state)}
    <div class="game">
      <p class="game__task">${this.game.question}</p>
      <form class="game__content ${formClass}">     
        ${getAnswers(this.game)}
      </form>
      <div class="stats">
        ${getGameStats(this.state.stats)}
      </div>
    </div>
    ${getFooter}`;
  }

  bind() {
    this.timerElement = this.element.querySelector(`.game__timer`);
    GameTypeHandler[this.game.type](this.element, this.game.answers,
        (isCorrectAnswer) => this.onAnswerQuestion(isCorrectAnswer));

    addBackButtonClick(this.element, ()=> this.onBackToGreeting());
  }

  updateTimer(timer) {
    if (timer === 5) {
      this.timerElement.classList.add(`blink`);
    }
    this.timerElement.innerHTML = timer;
  }
}
