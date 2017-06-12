import assert from 'assert';
import {setNewLives} from './lives';

describe(`Game`, () => {
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
});

