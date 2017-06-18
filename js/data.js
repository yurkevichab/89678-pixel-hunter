export const FAST_ANSWER = 10;
export const SLOW_ANSWER = 20;
export const MIN_COUNT_LIVES = 0;
export const MIN_TIMER_VALUE = 0;

export const ANSWER_TYPES = {
  'fast': `fast`,
  'slow': `slow`,
  'correct': `correct`,
  'wrong': `wrong`,
};

export const POINTS = {
  [ANSWER_TYPES.correct]: 100,
  [ANSWER_TYPES.fast]: 50,
  [ANSWER_TYPES.slow]: -50,
  [ANSWER_TYPES.wrong]: 0,
  'heart': 50
};

export const initialState = Object.freeze({
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
  'ratio': POINTS[ANSWER_TYPES.correct],
  'bonuses': [
    {
      'title': `Бонус за скорость:`,
      'type': `fast`,
      'ratio': POINTS[ANSWER_TYPES.fast]
    },
    {
      'title': `Бонус за жизни:`,
      'type': `heart`,
      'ratio': POINTS.heart
    },
    {
      'title': `Штраф за медлительность:`,
      'type': `slow`,
      'ratio': POINTS[ANSWER_TYPES.slow]
    }
  ]
});

export const lastGames = Object.freeze([
  {
    'stats': [
      `wrong`,
      `slow`,
      `fast`,
      `correct`,
      `wrong`,
      `unknown`,
      `slow`,
      `unknown`,
      `fast`,
      `unknown`
    ],
    'lives': 0
  },
  {
    'stats': [
      `wrong`,
      `slow`,
      `fast`,
      `correct`,
      `wrong`,
      `unknown`,
      `slow`,
      `unknown`,
      `fast`,
      `unknown`
    ],
    'lives': 1
  }
]
);

export const GAMES_TYPES = {
  'twoQuestions': `game-1`,
  'oneQuestion': `game-2`,
  'threeQuestions': `game-3`
};

export const games = Object.freeze([
  {
    'type': GAMES_TYPES.twoQuestions,
    'description': `Угадайте для каждого изображения фото или рисунок?`,
    'answers': [
      {
        'image': `https://k42.kn3.net/CF42609C8.jpg`,
        'type': `paint`
      },
      {
        'image': `https://k42.kn3.net/D2F0370D6.jpg`,
        'type': `photo`
      }]
  },
  {
    'type': GAMES_TYPES.oneQuestion,
    'description': `Угадай, фото или рисунок?`,
    'answers': [
      {
        'image': `http://i.imgur.com/1KegWPz.jpg`,
        'type': `paint`
      }
    ]
  },
  {
    'type': GAMES_TYPES.threeQuestions,
    'description': `Найдите рисунок среди изображений`,
    'answers': [
      {
        'image': `http://i.imgur.com/1KegWPz.jpg`,
      },
      {
        'image': `https://k42.kn3.net/CF42609C8.jpg`,
      },
      {
        'image': `https://k42.kn3.net/D2F0370D6.jpg`,
        'type': `photo`
      }
    ]
  },
  {
    'type': GAMES_TYPES.twoQuestions,
    'description': `Угадайте для каждого изображения фото или рисунок?`,
    'answers': [
      {
        'image': `https://k42.kn3.net/CF42609C8.jpg`,
        'type': `paint`
      },
      {
        'image': `https://k42.kn3.net/D2F0370D6.jpg`,
        'type': `photo`
      }]
  },
  {
    'type': GAMES_TYPES.oneQuestion,
    'description': `Угадай, фото или рисунок?`,
    'answers': [
      {
        'image': `http://i.imgur.com/1KegWPz.jpg`,
        'type': `paint`
      }
    ]
  },
  {
    'type': GAMES_TYPES.threeQuestions,
    'description': `Найдите рисунок среди изображений`,
    'answers': [
      {
        'image': `http://i.imgur.com/1KegWPz.jpg`
      },
      {
        'image': `https://k42.kn3.net/CF42609C8.jpg`
      },
      {
        'image': `https://k42.kn3.net/D2F0370D6.jpg`,
        'type': `photo`
      }
    ]
  },
  {
    'type': GAMES_TYPES.twoQuestions,
    'description': `Угадайте для каждого изображения фото или рисунок?`,
    'answers': [
      {
        'image': `https://k42.kn3.net/CF42609C8.jpg`,
        'type': `paint`
      },
      {
        'image': `https://k42.kn3.net/D2F0370D6.jpg`,
        'type': `photo`
      }]
  },
  {
    'type': GAMES_TYPES.oneQuestion,
    'description': `Угадай, фото или рисунок?`,
    'answers': [
      {
        'image': `http://i.imgur.com/1KegWPz.jpg`,
        'type': `paint`
      }
    ]
  },
  {
    'type': GAMES_TYPES.threeQuestions,
    'description': `Найдите рисунок среди изображений`,
    'answers': [
      {
        'image': `http://i.imgur.com/1KegWPz.jpg`,
      },
      {
        'image': `https://k42.kn3.net/CF42609C8.jpg`,
      },
      {
        'image': `https://k42.kn3.net/D2F0370D6.jpg`,
        'type': `photo`
      }
    ]
  },
  {
    'type': GAMES_TYPES.threeQuestions,
    'description': `Найдите рисунок среди изображений`,
    'answers': [
      {
        'image': `http://i.imgur.com/1KegWPz.jpg`,
      },
      {
        'image': `https://k42.kn3.net/CF42609C8.jpg`,
      },
      {
        'image': `https://k42.kn3.net/D2F0370D6.jpg`,
        'type': `photo`
      }
    ]
  }
]);
