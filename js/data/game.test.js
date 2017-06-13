import assert from 'assert';
import {checkAnswer, addPoint} from './answer';
import {setNewLives} from './lives';
import {getNextQuestion} from './question';

describe(`Game`, () => {
  describe(`Answers`, () => {
    it(`should check right answer`, () => {
      const answers = [
        {
          'isRight': true
        },
        {
          'isRight': true
        }
      ];
      assert(checkAnswer(answers));
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
      assert.equal(addPoint(state).stats.pop(), `fast`);
    });

    it(`should check slow answer`, () => {
      const state = {'timer': 8, 'stats': []};
      assert.equal(addPoint(state).stats.pop(), `slow`);
    });
  });

  describe(`Lives`, () => {
    it(`should update lives`, () => {
      const state = {'lives': 3};
      assert.equal(2, setNewLives(state, 2).lives);
    });

    it(`should throw exception max lives`, () => {
      const state = {'lives': 3};
      const maxRangeError = () => {
        setNewLives(state, 4);
      };
      assert.throws(maxRangeError, Error);
    });

    it(`should throw exception min lives`, () => {
      const state = {'lives': 3};
      const minRangeError = () => {
        setNewLives(state, -1);
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
