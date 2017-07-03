import assert from 'assert';
import {changeGame} from './game';

describe(`Game`, () => {
  describe(`Changing the game number`, () => {
    it(`should change game`, () => {
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
});
