import assert from 'assert';
import {checkAnswer, getAnswerType, setState} from './answer';
import {setLives} from './lives';
import {getNextQuestion} from './question';
import {getPointByAnswerType, getPointByLives} from './points';

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
      const lastAddAnswerType = setState(state, `correct`).stats.pop();
      assert.equal(lastAddAnswerType, `correct`);
    });
  });

  describe(`Changing the timer`, () => {
    it(`should return fast answer point`, () => {
      const state = {'timer': 25};
      const verifiedAnswerType = getAnswerType(true, state);
      assert.equal(verifiedAnswerType, `fast`);
    });

    it(`should return slow answer type`, () => {
      const state = {'timer': 8};
      const verifiedAnswerType = getAnswerType(true, state);
      assert.equal(verifiedAnswerType, `slow`);
    });

    it(`should return wrong answer type`, () => {
      const state = {'timer': 8};
      const verifiedAnswerType = getAnswerType(false, state);
      assert.equal(verifiedAnswerType, `wrong`);
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

  describe(`Bonus points calculation`, () => {
    it(`should get right total points for lives`, () => {
      const state = {'lives': 2};
      const totalPoints = 100;
      const verifiedTotalPoints = getPointByLives(state.lives, totalPoints);
      assert.equal(200, verifiedTotalPoints);
    });

    it(`should get right total points with fast bonus`, () => {
      const totalPoints = 100;
      const verifiedTotalPoints = getPointByAnswerType(`fast`, totalPoints);
      assert.equal(150, verifiedTotalPoints);
    });

    it(`should get right total points with slow bonus`, () => {
      const totalPoints = 100;
      const verifiedTotalPoints = getPointByAnswerType(`slow`, totalPoints);
      assert.equal(50, verifiedTotalPoints);
    });
  });
});
