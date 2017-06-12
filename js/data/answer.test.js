import assert from 'assert';
import {checkAnswer} from './answer';

describe(`Game`, () => {
  describe(`answers`, () => {
    it(`should check right answer`, () => {
      const answers = [
        {
          'isRight': true
        },
        {
          'isRight': true
        }
      ];
      assert(checkAnswer(answers));
    });

    it(`should check wrong answer`, () => {
      const answers = [
        {
          'isRight': true
        },
        {
          'isRight': false
        }
      ];
      assert.ifError(checkAnswer(answers));
    });
  });
});
