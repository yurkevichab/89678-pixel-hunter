import {QuestionType, AnswerType} from '../data/data';
import resizeImage from '../data/resizeImage';

export default new class {

  preprocessQuestions(data) {
    for (const game of data) {
      if (game.type === QuestionType.ONE_OF_THREE) {
        cleanWrongAnswerTypes(game.answers);
      }
    }
    return data;
  }

  loadImages(data) {
    const images = data.reduce((accumulator, game) =>
      accumulator.concat(game.answers.map((answer) => answer.image)), []);
    return Promise
      .all(images.map((image) => loadImage(image)))
      .then(() => data)
      .catch(window.console.log.warning);
  }

  preprocessStats(data) {
    return data.reverse();
  }

  postProcessStats(state) {
    return JSON.stringify({
      lives: state.lives,
      stats: state.stats
    });
  }

  parseJSON(response) {
    return response.json();
  }
}();

const getAnswersCountByType = (answers, type) => {
  return answers.filter((answer) => answer.type === type).length;
};

const getRightAnswerType = (answers) => {
  return Object.values(AnswerType)
    .find((type) => getAnswersCountByType(answers, type) === 1);
};

const cleanWrongAnswerTypes = (answers) => {
  const type = getRightAnswerType(answers);
  answers.forEach((answer) => {
    answer.type = answer.type === type ? answer.type : null;
    return answer;
  });
};

const setImageSize = (img, answerImage, resolve) => {
  const correctedSizes = resizeImage({
    width: answerImage.width,
    height: answerImage.height
  }, img);
  answerImage.width = correctedSizes.width;
  answerImage.height = correctedSizes.height;
  resolve();
};

const loadImage = (answerImage) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.addEventListener(`load`, () => setImageSize(img, answerImage, resolve));
    img.addEventListener(`error`, resolve);
    img.src = answerImage.url;
  });
};


