import assert from 'assert';
import {checkAnswer, getAnswerType, setState} from './answer';
import {setLives} from './lives';
import {getNextQuestion} from './question';

describe(`Game`, () => {
  describe(`Answers`, () => {
    it(`should check right answer`, () => {
      const answer =
        {
          'type': `paint`
        };
      const rightAnswer =
        {
          'type': `paint`
        };
      assert(checkAnswer(answer, rightAnswer));
    });

    it(`should check wrong answer`, () => {
      const answer =
        {
          'type': `paint`
        };
      const rightAnswer =
        {
          'type': `photo`
        };
      assert.ifError(checkAnswer(answer, rightAnswer));
    });
  });

  describe(`Add point in state`, () => {
    it(`check add correct point to stats`, () => {
      const state = {stats: []};
      const lastAddPoint = setState(state, `correct`).stats.pop();
      assert.equal(lastAddPoint, `correct`);
    });
  });

  describe(`Changing the timer`, () => {
    it(`should return fast answer point`, () => {
      const state = {'timer': 25};
      const verifiedPoint = getAnswerType(true, state);
      assert.equal(verifiedPoint, `fast`);
    });

    it(`should return slow answer type`, () => {
      const state = {'timer': 8};
      const verifiedPoint = getAnswerType(true, state);
      assert.equal(verifiedPoint, `slow`);
    });

    it(`should return wrong answer type`, () => {
      const state = {'timer': 8};
      const verifiedPoint = getAnswerType(false, state);
      assert.equal(verifiedPoint, `wrong`);
    });

    it(`should return correct answer type`, () => {
      const state = {'timer': 15};
      const verifiedPoint = getAnswerType(true, state);
      assert.equal(verifiedPoint, `correct`);
    });
  });

  describe(`Changing the lives`, () => {
    it(`should check changes lives`, () => {
      const state = {'lives': 3};
      const verifiedLives = setLives(state, 2).lives;
      assert.equal(2, verifiedLives);
    });

    it(`should throw exception if lives more than max possible`, () => {
      const state = {'lives': 3};
      const maxRangeError = () => {
        setLives(state, 4);
      };
      assert.throws(maxRangeError, Error);
    });

    it(`should throw exception if lives less than zero`, () => {
      const state = {'lives': 3};
      const minRangeError = () => {
        setLives(state, -1);
      };
      assert.throws(minRangeError, Error);
    });
  });

  describe(`Changing the question number`, () => {
    it(`should get next question`, () => {
      const state = {'questionNumber': 2, 'game': 0};
      const verifiedState = getNextQuestion(state);
      assert.notEqual(-1, verifiedState.game);
      assert.equal(state.questionNumber + 1, verifiedState.questionNumber);
    });

    it(`should check is last question`, () => {
      const state = {'questionNumber': 10, 'game': 0, 'isLastQuestion': false};
      const verifiedState = getNextQuestion(state);
      assert.equal(true, verifiedState.isLastQuestion);
      assert.equal(10, verifiedState.questionNumber);
    });
  });
});
