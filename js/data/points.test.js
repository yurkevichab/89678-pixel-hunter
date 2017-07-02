import assert from 'assert';
import {getPointByLives, getPointsByAnswerType, getTotalPoints, getRightPoints, getPointCount} from './points';

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
