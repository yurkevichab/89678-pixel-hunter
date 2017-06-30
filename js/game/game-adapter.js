import {DefaultAdapter} from '../model';
import {QuestionType, AnswerType} from '../data';
import resizeImage from '../data/resizeImage';
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

const processImage = (answerImage) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.addEventListener(`load`, (e) => {
      const correctedSizes = resizeImage(
          {
            width: answerImage.width,
            height: answerImage.height
          },
          img);
      img.width = correctedSizes.width;
      img.height = correctedSizes.height;
      resolve();
    });
    img.src = answerImage.url;
  });
};

export default new class extends DefaultAdapter {

  preprocessQuestions(data) {
    for (const game of data) {
      if (game.type === QuestionType.ONE_OF_THREE) {
        cleanWrongAnswerTypes(game.answers);
      }
    }
    return data;
  }

  loadImages(data) {
    Promise.all(
        data.map((game) => new Promise((resolvedGame) => {
          game.map((answer) => new Promise((resolvedAnswer) => {
            processImage(answer.image);
          }));
        })));
    return data;
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

