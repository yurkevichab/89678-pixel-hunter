export const initialState = Object.freeze({
  'game': 0,
  'lives': 3,
  'timer': 30,
  'stats': [``, ``, ``, ``, ``, ``, ``, ``, ``, ``]
});

export const statInfo = Object.freeze({
  'title': `Победа!`,
  'ratio': 100,
  'bonuses': [
    {
      'title': `Бонус за скорость:`,
      'type': `fast`,
      'ratio': 50
    },
    {
      'title': `Бонус за жизни:`,
      'type': `heart`,
      'ratio': 50
    },
    {
      'title': `Штраф за медлительность:`,
      'type': `slow`,
      'ratio': -50
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

export const games = Object.freeze([
  {
    'type': `game-1`,
    'description': `Угадайте для каждого изображения фото или рисунок?`,
    'answers': [
      {
        'image': `https://k42.kn3.net/CF42609C8.jpg`,
        'width': 468,
        'height': 458,
        'type': `paint`
      },
      {
        'image': `https://k42.kn3.net/D2F0370D6.jpg`,
        'width': 468,
        'height': 458,
        'type': `photo`
      }]
  },
  {
    'type': `game-2`,
    'description': `Угадай, фото или рисунок?`,
    'answers': [
      {
        'image': `http://i.imgur.com/1KegWPz.jpg`,
        'width': 705,
        'height': 455,
        'type': `paint`
      }
    ]
  },
  {
    'type': `game-3`,
    'description': `Найдите рисунок среди изображений`,
    'answers': [
      {
        'image': `http://i.imgur.com/1KegWPz.jpg`,
        'width': 304,
        'height': 455,
        'isRight': false,
        'type': `photo`
      },
      {
        'image': `https://k42.kn3.net/CF42609C8.jpg`,
        'width': 304,
        'height': 455,
        'isRight': true,
        'type': `paint`
      },
      {
        'image': `https://k42.kn3.net/D2F0370D6.jpg`,
        'width': 304,
        'height': 455,
        'isRight': false,
        'type': `photo`
      }
    ]
  }
]);
