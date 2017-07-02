import assert from 'assert';
import {checkAnswer, getAnswerType, setStats} from './answer';

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

  it(`should add correct point to stats`, () => {
    const state = {stats: []};
    const lastAddAnswerType = setStats(state, `correct`).stats.pop();
    assert.equal(lastAddAnswerType, `correct`);
  });
});
