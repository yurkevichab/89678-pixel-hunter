import assert from 'assert';
import {setTimer, cleanTimer} from './timer';
import {initialState} from './data';

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
