import {DefaultAdapter} from '../model';
import {QUESTION_TYPE, ANSWER_TYPE} from '../data';

const rightAnswerType = (game) => {
  return Object.values(ANSWER_TYPE)
    .find((type) => game.answers.filter((answer) => answer.type === type).length === 1);
};

const cleanWronAnswerTypes = (game, type) => {
  game.answers.map((answer) => {
    answer.type = answer.type === rightAnswerType(game) ? answer.type : null;
    return answer;
  });
};

export default new class extends DefaultAdapter {

  preprocess(data) {
    for (const game of data) {
      if (game.type === QUESTION_TYPE.ONE_OF_THREE) {
        cleanWronAnswerTypes(game);
      }
    }
    return data;
  }
}();

