import {DefaultAdapter} from '../model';
import {QUESTION_TYPE} from '../data';

const AnswerType = {
  PAINTING: `painting`,
  PHOTO: `photo`
};

export default new class extends DefaultAdapter {
  preprocess(data) {
    for (const game of data) {
      if (game.type === QUESTION_TYPE.ONE_OF_THREE) {
        const rightAnswerType = Object.values(AnswerType)
         .find((at) => game.answers.filter((answer) => answer.type === at).length === 1);
        game.answers.map((answer) => {
          answer.type = answer.type === rightAnswerType ? answer.type : null;
          return answer;
        });
      }
    }
    return data;
  }
}();

