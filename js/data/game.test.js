import assert from 'assert';
import {checkAnswer, getAnswerType, setState, addAnswerResult} from './answer';
import {setLives, isLastLive} from './lives';
import {initialState} from '../data';
import {setTimer, cleanTimer} from './timer';
import {setGame} from './game';
import {getPointByLives, getPointsByAnswerType, getTotalPoints, getRightPoints, getPointCount} from './points';

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

    it(`should return right state when send with one correct answer`, () => {
      const state = {'timer': 21, "stats": [], 'lives': 2, 'game': 1};
      const rightResult = {'timer': 21, "stats": [`fast`], 'lives': 2, 'game': 1};
      const verifiedAnswerResult = addAnswerResult(state, `paint`);
      assert.deepEqual(rightResult, verifiedAnswerResult);
    });

    it(`should return right state when send  with one wrong answer`, () => {
      const state = {'timer': 21, "stats": [], 'lives': 2, 'game': 1};
      const rightResult = {'timer': 21, "stats": [`wrong`], 'lives': 1, 'game': 1};
      const verifiedAnswerResult = addAnswerResult(state, `photo`);
      assert.deepEqual(rightResult, verifiedAnswerResult);
    });

    it(`should return right state when send with two correct answer`, () => {
      const state = {'timer': 8, "stats": [], 'lives': 2, 'game': 0};
      const rightResult = {'timer': 8, "stats": [`slow`], 'lives': 2, 'game': 0};
      const verifiedAnswerResult = addAnswerResult(state, `paint`, `photo`);
      assert.deepEqual(rightResult, verifiedAnswerResult);
    });

    it(`should return right state when send with two wrong answer`, () => {
      const state = {'timer': 8, "stats": [], 'lives': 2, 'game': 0};
      const rightResult = {'timer': 8, "stats": [`wrong`], 'lives': 1, 'game': 0};
      const verifiedAnswerResult = addAnswerResult(state, `photo`, `photo`);
      assert.deepEqual(rightResult, verifiedAnswerResult);
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

    it(`should return initial timer value`, () => {
      const state = {'timer': 0};
      const verifiedTimer = cleanTimer(state).timer;
      assert.equal(initialState.timer, verifiedTimer);
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

    it(`should return true is last live`, () => {
      const state = {'lives': 0};
      const verifiedLives = isLastLive(state.lives);
      assert.equal(true, verifiedLives);
    });
  });

  describe(`Changing the game number`, () => {
    it(`should check changes game`, () => {
      const state = {'game': 5};
      const verifiedQuestion = setGame(state).game;
      assert.equal(6, verifiedQuestion);
    });
    it(`should throw exception if game more than max possible`, () => {
      const state = {'game': 10};
      const maxRangeError = () => {
        setGame(state);
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
      assert.equal(600, verifiedTotalPoints);
    });

    it(`should return right points by right answers`, () => {
      const state = {'stats': [`fast`, `slow`, `fast`, `wrong`, `correct`]};
      const verifiedPoints = getRightPoints(state.stats);
      assert.equal(400, verifiedPoints);
    });

    it(`should return right count of answer type in stats`, () => {
      const state = {'stats': [`fast`, `slow`, `fast`, `wrong`, `correct`]};
      const verifiedCountTypeAnswer = getPointCount(state.stats, `fast`);
      assert.equal(2, verifiedCountTypeAnswer);
    });
  });
});
