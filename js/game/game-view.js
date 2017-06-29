import AbstractView from '../view';
import header from '../header/header';
import footer from '../footer/footer';
import createStats from '../create-stats';
import {QUESTION_TYPE, ANSWER_TYPE} from '../data';
import {checkAnswer} from '../data/answer';
import resizeImage from '../data/resizeImage';

const OPTIONS = [
  {
    'text': `Рисунок`,
    'type': `paint`,
    'value': ANSWER_TYPE.PAINTING
  },
  {
    'text': `Фото`,
    'type': `photo`,
    'value': ANSWER_TYPE.PHOTO
  }
];

const ADDITION_GAME_DATA = {
  [QUESTION_TYPE.TWO_OF_TWO]: {
    'formClass': ``,
    'haveOption': true,
    'additionClasses': ``
  },
  [QUESTION_TYPE.TINDER_LIKE]: {
    'formClass': `game__content--wide`,
    'haveOption': true,
    'additionClasses': {
      'paint': `game__answer--wide`
    }
  },
  [QUESTION_TYPE.ONE_OF_THREE]: {
    'formClass': `game__content--triple`,
    'haveOption': false,
    'additionClasses': ``
  }
};
const getAnswer = (type, answer, index) => {
  const {haveOption, additionClasses} = ADDITION_GAME_DATA[type];
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
    const formClass = ADDITION_GAME_DATA[this.game.type].formClass;
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
    const answerImages = form.querySelectorAll(`.game__option img`);

    switch (this.game.type) {
      case QUESTION_TYPE.TWO_OF_TWO:
        form.addEventListener(`change`, () => {
          const answer1 = form.querySelector(`input[name="question1"]:checked`);
          const answer2 = form.querySelector(`input[name="question2"]:checked`);
          if (answer1 && answer2) {
            const isCorrectAnswer = [answer1, answer2].every((answer, index) => {
              return checkAnswer(this.game.answers[index].type, answer.value);
            });
            this.onAnswerQuestion(isCorrectAnswer);
          }
        });
        break;

      case QUESTION_TYPE.TINDER_LIKE:
        form.addEventListener(`change`, () => {
          const answer1 = form.querySelector(`input[name="question1"]:checked`);
          const isCorrectAnswer = [answer1].every((answer, index) => {
            return checkAnswer(this.game.answers[index].type, answer.value);
          });
          this.onAnswerQuestion(isCorrectAnswer);
        });
        break;

      case QUESTION_TYPE.ONE_OF_THREE:
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

    for (let img of answerImages) {
      img.addEventListener(`load`, (e) => {
        const parentBlock = img.parentNode;
        const frame = {
          width: parentBlock.clientWidth,
          height: parentBlock.clientHeight
        };
        const correctedSizes = resizeImage(frame, {
          width: img.naturalWidth,
          height: img.naturalHeight
        });
        img.width = correctedSizes.width;
        img.height = correctedSizes.height;
      });
    }
  }

  updateTimer(timer) {
    if (timer === 5) {
      this.timerElement.classList.add(`blink`);
    }
    this.timerElement.innerHTML = timer;
  }
}
