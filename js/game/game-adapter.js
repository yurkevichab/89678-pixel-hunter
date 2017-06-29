import {DefaultAdapter} from '../model';
import {QUESTION_TYPE, ANSWER_TYPE} from '../data';

const getAnswersCountByType = (answers, type) => {
  return answers.filter((answer) => answer.type === type).length;
};

const getRightAnswerType = (answers) => {
  return Object.values(ANSWER_TYPE)
    .find((type) => getAnswersCountByType(answers, type) === 1);
};

const cleanWrongAnswerTypes = (answers) => {
  const type = getRightAnswerType(answers);
  answers.forEach((answer) => {
    answer.type = answer.type === type ? answer.type : null;
    return answer;
  });
};

export default new class extends DefaultAdapter {

  preprocessQuestions(data) {
    for (const game of data) {
      if (game.type === QUESTION_TYPE.ONE_OF_THREE) {
        cleanWrongAnswerTypes(game.answers);
      }
    }
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

