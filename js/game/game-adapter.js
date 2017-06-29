import {DefaultAdapter} from '../model';
import {QUESTION_TYPE, ANSWER_TYPE} from '../data';

const getAnswersCountByType = (answers, type) => {
  return answers.filter((answer) => answer.type === type).length;
};

const getRightAnswerType = (game) => {
  return Object.values(ANSWER_TYPE)
    .find((type) => getAnswersCountByType(game.answers, type) === 1);
};

const cleanWrongAnswerTypes = (game) => {
  const type = getRightAnswerType(game);
  game.answers.forEach((answer) => {
    answer.type = answer.type === type ? answer.type : null;
    return answer;
  });
};

export default new class extends DefaultAdapter {

  preprocess(data) {
    for (const game of data) {
      if (game.type === QUESTION_TYPE.ONE_OF_THREE) {
        cleanWrongAnswerTypes(game);
      }
    }
    return data;
  }
}();

