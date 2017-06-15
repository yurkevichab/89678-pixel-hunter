import assert from 'assert';
import {checkAnswer, getAnswerType, setState} from './answer';
import {setLives} from './lives';
import {setTimer} from './timer';
import {setQuestion} from './question';
import {getPointByLives, getPointsByAnswerType, getTotalPoints} from './points';

describe(`Game`, () => {
  describe(`Answers`, () => {
    it(`should check right answer`, () => {
      const answer = `paint`;
      const rightAnswer = `paint`;
      assert(checkAnswer(answer, rightAnswer));
    });

    it(`should check wrong answer`, () => {
      const answer = `paint`;
      const rightAnswer = `photo`;
      assert.ifError(checkAnswer(answer, rightAnswer));
    });

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

  describe(`Add point in state`, () => {
    it(`check add correct point to stats`, () => {
      const state = {stats: []};
      const lastAddAnswerType = setState(state, `correct`).stats.pop();
      assert.equal(lastAddAnswerType, `correct`);
    });
  });

  describe(`Changing the timer`, () => {
    it(`should check changes timer`, () => {
      const state = {'timer': 20};
      const verifiedTimer = setTimer(state).timer;
      assert.equal(19, verifiedTimer);
    });

    it(`should throw exception if timer less than min possible`, () => {
      const state = {'timer': 0};
      const minRangeError = () => {
        setTimer(state);
      };
      assert.throws(minRangeError, Error);
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
    it(`should check changes question`, () => {
      const state = {'game': 5};
      const verifiedQuestion = setQuestion(state).game;
      assert.equal(6, verifiedQuestion);
    });
    it(`should throw exception if question more than max possible`, () => {
      const state = {'game': 10};
      const maxRangeError = () => {
        setQuestion(state);
      };
      assert.throws(maxRangeError, Error);
    });
  });

  describe(`Bonus points calculation`, () => {
    it(`should get right points for lives`, () => {
      const state = {'lives': 2};
      const verifiedPoints = getPointByLives(state.lives);
      assert.equal(100, verifiedPoints);
    });

    it(`should get right points with fast bonus`, () => {
      const state = {'stats': [`fast`, `slow`, `fast`]};
      const verifiedPoints = getPointsByAnswerType(`fast`, state.stats);
      assert.equal(100, verifiedPoints);
    });

    it(`should get right total points`, () => {
      const state = {'stats': [`fast`, `slow`, `fast`, `wrong`, `correct`], 'lives': 3};
      const verifiedTotalPoints = getTotalPoints(state);
      assert.equal(300, verifiedTotalPoints);
    });
  });
});
