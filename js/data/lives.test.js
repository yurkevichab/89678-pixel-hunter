import assert from 'assert';
import {setLives, isLivesEnded} from './lives';

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
