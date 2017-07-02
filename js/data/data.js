export const FAST_ANSWER = 10;
export const SLOW_ANSWER = 20;
export const MIN_COUNT_LIVES = 0;
export const MIN_TIMER_VALUE = 0;
export const MAX_COUNT_LIVES = 10;

export const Result = {
  'FAST': `fast`,
  'SLOW': `slow`,
  'CORRECT': `correct`,
  'WRONG': `wrong`,
  'UNKNOWN': `unknown`
};

export const Points = {
  [Result.CORRECT]: 100,
  [Result.FAST]: 50,
  [Result.SLOW]: -50,
  [Result.WRONG]: 0,
  'heart': 50
};

export const initialState = Object.freeze({
  'userName': ``,
  'game': 0,
  'lives': 3,
  'timer': 30,
  'stats': []
});

export const statInfo = Object.freeze({
  'title': {
    'win': `Победа!`,
    'loss': `Поражение`
  },
  'ratio': Points[Result.CORRECT],
  'bonuses': [
    {
      'title': `Бонус за скорость:`,
      'type': Result.FAST,
      'ratio': Points[Result.FAST]
    },
    {
      'title': `Бонус за жизни:`,
      'type': `heart`,
      'ratio': Points.heart
    },
    {
      'title': `Штраф за медлительность:`,
      'type': Result.SLOW,
      'ratio': Points[Result.SLOW]
    }
  ]
});

export const QuestionType = {
  TWO_OF_TWO: `two-of-two`,
  TINDER_LIKE: `tinder-like`,
  ONE_OF_THREE: `one-of-three`
};

export const AnswerType = {
  PAINTING: `painting`,
  PHOTO: `photo`
};
