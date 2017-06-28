import assert from 'assert';
import {checkAnswer, getAnswerType, setStats} from './answer';
import {setLives, isLivesEnded} from './lives';
import {initialState} from '../data';
import {setTimer, cleanTimer} from './timer';
import {changeGame} from './game';
import {getPointByLives, getPointsByAnswerType, getTotalPoints, getRightPoints, getPointCount} from './points';
import resizeImage from './resizeImage';

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
      const timer = 25;
      const verifiedAnswerType = getAnswerType(true, timer);
      assert.equal(verifiedAnswerType, `fast`);
    });

    it(`should return slow answer type`, () => {
      const timer = 8;
      const verifiedAnswerType = getAnswerType(true, timer);
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
      const lastAddAnswerType = setStats(state, `correct`).stats.pop();
      assert.equal(lastAddAnswerType, `correct`);
    });
  });

  describe(`Changing the timer`, () => {
    it(`should decrease timer value`, () => {
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
    it(` should correct change lives value`, () => {
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
      const verifiedLives = isLivesEnded(state.lives);
      assert.equal(true, verifiedLives);
    });
  });

  describe(`Changing the game number`, () => {
    it(`should check changes game`, () => {
      const state = {'game': 5};
      const games = [{}, {}, {}, {}, {}, {}, {}];
      const verifiedQuestion = changeGame(state, games).game;
      assert.equal(6, verifiedQuestion);
    });

    it(`should throw exception if game more than max possible`, () => {
      const state = {'game': 10};
      const maxRangeError = () => {
        changeGame(state);
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

  const createTestForFrame = (frame) => {
    const assertRatio = (given, expected) => {
      const actual = resizeImage(frame, given);
      assert.deepEqual(actual, expected);
    };

    const createTest = (expected, multiplier) => {
      const given = {
        width: Math.floor(expected.width * multiplier),
        height: Math.floor(expected.height * multiplier)
      };
      it(`shrink ${multiplier}x: ${given.width}x${given.height} => ${expected.width}x${expected.height}`, () => {
        assertRatio(given, expected);
      });
    };

    const sequence = (expected) => {
      createTest(expected, 8);
      createTest(expected, 7);
      createTest(expected, 5);
      createTest(expected, 4);
      createTest(expected, 3);
      createTest(expected, 2);
      createTest(expected, 1);
    };

    describe(`Resize into frame: ${frame.width}x${frame.height}`, () => {

      describe(`when "width === height"`, () => {
        sequence({width: frame.width, height: frame.height});
      });

      describe(`when "width > height"`, () => {
        sequence({width: frame.width, height: Math.floor(frame.height / 2)});
      });

      describe(`when "width < height"`, () => {
        sequence({width: Math.floor(frame.width / 2), height: frame.height});
      });

    });
  };

  createTestForFrame({width: 256, height: 256});
  createTestForFrame({width: 256, height: 128});

  createTestForFrame({width: 468, height: 458});
  createTestForFrame({width: 705, height: 455});
  createTestForFrame({width: 304, height: 455});
});
