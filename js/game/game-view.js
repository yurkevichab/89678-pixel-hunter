import AbstractView from '../view';
import header from '../header/header';
import footer from '../footer/footer';
import createStats from '../create-stats';
import {QuestionType, AnswerType} from '../data';
import {checkAnswer} from '../data/answer';

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

export default class gameTemplate extends AbstractView {
  constructor(game, state) {
    super();
    this.state = state;
    this.game = game;
  }

  get template() {
    const formClass = AdditionGameData[this.game.type].formClass;
    return `
    ${header(this.state)}
    <div class="game">
      <p class="game__task">${this.game.question}</p>
      <form class="game__content ${formClass}">     
        ${getAnswers(this.game)}
      </form>
      <div class="stats">
        ${createStats(this.state.stats)}
      </div>
    </div>
    ${footer}`;
  }

  bind() {
    const form = this.element.querySelector(`.game__content`);
    this.timerElement = this.element.querySelector(`.game__timer`);
    const backButton = this.element.querySelector(`.back`);

    switch (this.game.type) {
      case QuestionType.TWO_OF_TWO:
        form.addEventListener(`change`, () => {
          const inputs = [...form.querySelectorAll(`input`)];
          const checkedInputs = inputs.filter((input) => input.checked);

          if (checkedInputs.length === this.game.answers.length) {
            const isCorrectAnswer = checkedInputs.every((answer, index) => {
              return checkAnswer(this.game.answers[index].type, answer.value);
            });
            this.onAnswerQuestion(isCorrectAnswer);
            return;
          }

          checkedInputs.forEach((checkedInput) => {
            [inputs.filter((input) => checkedInput.name)].forEach((input) => {
              input.disabled = true;
            });
          });
        });
        break;

      case QuestionType.TINDER_LIKE:
        form.addEventListener(`change`, () => {
          const answer1 = form.querySelector(`input[name="question1"]:checked`);
          const isCorrectAnswer = [answer1].every((answer, index) => {
            return checkAnswer(this.game.answers[index].type, answer.value);
          });
          this.onAnswerQuestion(isCorrectAnswer);
        });
        break;

      case QuestionType.ONE_OF_THREE:
        form.addEventListener(`click`, (e) => {
          const images = form.querySelectorAll(`.game__option`);
          if (e.target.closest(`.game__option`)) {
            const indexImage = [...images].indexOf(e.target);
            const isCorrectAnswer = !!this.game.answers[indexImage].type;
            this.onAnswerQuestion(isCorrectAnswer);
          }
        });
        break;
    }

    backButton.addEventListener(`click`, () => this.onBackToGreeting());
  }

  updateTimer(timer) {
    if (timer === 5) {
      this.timerElement.classList.add(`blink`);
    }
    this.timerElement.innerHTML = timer;
  }
}
