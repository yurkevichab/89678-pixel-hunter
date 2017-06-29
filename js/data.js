export const FAST_ANSWER = 10;
export const SLOW_ANSWER = 20;
export const MIN_COUNT_LIVES = 0;
export const MAX_COUNT_LIVES = 10;
export const MIN_TIMER_VALUE = 0;

export const Result = {
  'fast': `fast`,
  'slow': `slow`,
  'correct': `correct`,
  'wrong': `wrong`,
};

export const Points = {
  [Result.correct]: 100,
  [Result.fast]: 50,
  [Result.slow]: -50,
  [Result.wrong]: 0,
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
  'ratio': Points[Result.correct],
  'bonuses': [
    {
      'title': `Бонус за скорость:`,
      'type': Result.fast,
      'ratio': Points[Result.fast]
    },
    {
      'title': `Бонус за жизни:`,
      'type': `heart`,
      'ratio': Points.heart
    },
    {
      'title': `Штраф за медлительность:`,
      'type': Result.slow,
      'ratio': Points[Result.slow]
    }
  ]
});

export const GameType = {
  'twoQuestions': `game-1`,
  'oneQuestion': `game-2`,
  'threeQuestions': `game-3`
};

export const QuestionType = {
  TWO_OF_TWO: `two-of-two`,
  TINDER_LIKE: `tinder-like`,
  ONE_OF_THREE: `one-of-three`
};

export const AnswerType = {
  PAINTING: `painting`,
  PHOTO: `photo`
};
