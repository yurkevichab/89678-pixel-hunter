import assert from 'assert';
import setUserName from './userName';
import {initialState} from './data';

describe(`Changing the userName`, () => {
  it(`should set userName`, () => {
    const state = {'username': `Ivan`};
    const verifiedUserName = setUserName(initialState, `Ivan`).userName;
    assert.equal(state.username, verifiedUserName);
  });

  it(`should throw exception if userName is empty`, () => {
    const emptyUserNameError = () => {
      setUserName(initialState, ``);
    };
    assert.throws(emptyUserNameError, Error);
  });

  it(`should throw exception if userName is not a sting`, () => {
    const numericUserNameError = () => {
      setUserName(initialState, 2);
    };
    assert.throws(numericUserNameError, Error);
  });
});
