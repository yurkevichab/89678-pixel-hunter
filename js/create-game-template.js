import {getHeader} from './templates/header';
import footer from './templates/footer';
import createStats from './create-stats';

const options = [
  {
    'text': `Рисунок`,
    'type': `paint`
  },
  {
    'text': `Фото`,
    'type': `photo`
  }];

const additionGameData = {
  'game-1': {
    'formClass': ``,
    'haveOption': true,
    'haveAdditionClasses': false
  },
  'game-2': {
    'formClass': `game__content--wide`,
    'haveOption': true,
    'haveAdditionClasses': true,
    'additionClasses': {
      'paint': `game__answer--wide`
    }
  },
  'game-3': {
    'formClass': `game__content--triple`,
    'haveOption': false
  }
};

const getAnswer = (type, answer, index) => {
  const {haveOption, haveAdditionClasses, additionClasses} = additionGameData[type];
  return `
    <div class="game__option">
      <img src="${answer.image}" alt="Option ${index}" width="" height="">
      ${haveOption ? getOptions(haveAdditionClasses, additionClasses, index) : ``}
    </div>`;
};

const getAnswers = (game) => {
  const gameType = game.type;
  return game.answers.reduce((content, answer, index) => {
    const htmlAnswer = getAnswer(gameType, answer, index + 1);
    return content + htmlAnswer;
  }, ``);
};

const getOption = ({type, text}, haveAdditionClasses, additionClasses, index) => {
  const additionClass = haveAdditionClasses ? additionClasses[type] : ``;
  return `
    <label class="game__answer game__answer--${type} ${additionClass}">
      <input name="question${index}" type="radio" value="${type}">
      <span>${text}</span>
    </label>`;
};

const getOptions = (haveAdditionClasses, additionClasses, index) => {
  return options.reduce((prev, option) => {
    const label = getOption(option, haveAdditionClasses, additionClasses, index);
    return prev + label;
  }, ``);
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
