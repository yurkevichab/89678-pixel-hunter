import assert from 'assert';
import {checkAnswer, getAnswerType} from './answer';
import {setLives} from './lives';
import {getNextQuestion} from './question';

describe(`Game`, () => {
  describe(`Answers`, () => {
    it(`should check right answer`, () => {
      const answer =
        {
          'image': `https://k42.kn3.net/CF42609C8.jpg`,
          'type': `paint`
        };
      const rightAnswer =
        {
          'image': `https://k42.kn3.net/CF42609C8.jpg`,
          'type': `paint`
        };
      assert(checkAnswer(answer, rightAnswer));
    });

    it(`should check wrong answer`, () => {
      const answers = [
        {
          'isRight': true
        },
        {
          'isRight': false
        }
      ];
      assert.ifError(checkAnswer(answers));
    });
  });

  describe(`Timer`, () => {
    it(`should check fast answer`, () => {
      const state = {'timer': 25, 'stats': []};
      assert.equal(getAnswerType(state).stats.pop(), `fast`);
    });

    it(`should check slow answer`, () => {
      const state = {'timer': 8, 'stats': []};
      assert.equal(getAnswerType(state).stats.pop(), `slow`);
    });
  });

  describe(`Lives`, () => {
    it(`should update lives`, () => {
      const state = {'lives': 3};
      assert.equal(2, setLives(state, 2).lives);
    });

    it(`should throw exception max lives`, () => {
      const state = {'lives': 3};
      const maxRangeError = () => {
        setLives(state, 4);
      };
      assert.throws(maxRangeError, Error);
    });

    it(`should throw exception min lives`, () => {
      const state = {'lives': 3};
      const minRangeError = () => {
        setLives(state, -1);
      };
      assert.throws(minRangeError, Error);
    });
  });
  describe(`Questions`, () => {
    it(`should get next question`, () => {
      const state = {'questionNumber': 2, 'game': 0};
      assert.notEqual(-1, getNextQuestion(state).game);
      assert.equal(state.questionNumber + 1, getNextQuestion(state).questionNumber);
    });

    it(`should check is last question`, () => {
      const state = {'questionNumber': 10, 'game': 0, 'isLastQuestion': false};
      assert.equal(true, getNextQuestion(state).isLastQuestion);
      assert.equal(10, getNextQuestion(state).questionNumber);
    });
  });
});
