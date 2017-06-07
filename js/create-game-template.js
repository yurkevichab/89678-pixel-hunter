import getHeader from './templates/header';
import footer from './templates/footer';
import createStats from './create-stats';

const additionGameData = {
  'game-1': {
    'formClass': ``,
    'options': [
      {
        'text': `Рисунок`,
        'type': `paint`,
        'additionClass': ``
      },
      {
        'text': `Фото`,
        'type': `photo`,
        'additionClass': ``
      }]
  },
  'game-2': {
    'formClass': `game__content--wide`,
    'options': [
      {
        'text': `Рисунок`,
        'type': `paint`,
        'additionClass': `game__answer--paint`
      },
      {
        'text': `Фото`,
        'type': `photo`,
        'additionClass': ``
      }]
  },
  'game-3': {
    'formClass': `game__content--triple`,
    'options': []
  }
};

const getAnswer = (type, answer, index) => {
  return `
    <div class="game__option">
      <img src="${answer.image}" alt="Option ${index}">
      ${drawAnswer(type, index)}
    </div>`;
};

const getAnswers = (game) => {
  const gameType = game.type;
  return game.answers.reduce((content, answer, index) => {
    const gameAnswerIndex = index + 1;
    const htmlAnswer = getAnswer(gameType, answer, gameAnswerIndex);
    return content + htmlAnswer;
  }, ``);
};

const getOption = (option, index) => {
  return `
    <label class="game__answer game__answer--${option.type} ${option.additionClass}">
      <input name="question${index}" type="radio" value="${option.type}">
      <span>${option.text}</span>
    </label>`;
};

const getOptions = (options, index) => {
  return options.reduce((prev, option) => {
    const label = getOption(option, index)
    return prev + label;
  }, ``);
};

const drawAnswer = (gameType, index) => {
  const options = additionGameData[gameType].options;

  return getOptions(options, index);
};

export default (game, state) => {
  const formClass = additionGameData[game.type].formClass;
  return `
  ${getHeader(state)}
  <div class="game">
    <p class="game__task">${game.description}</p>
    <form class="game__content ${formClass}">     
      ${getAnswers(game)}
    </form>
    <div class="stats">
      ${createStats(state.stats)}
    </div>
  </div>
  ${footer}`;
};
