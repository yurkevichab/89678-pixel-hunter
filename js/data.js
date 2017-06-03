export const initialState = Object.freeze({
  game: `game-1`,
  lives: 3,
  timer: 0
});

export const games = Object.freeze({
  'game-1': {
    'description': `Угадайте для каждого изображения фото или рисунок?`,
    'questions': [
      {
        'image': `https://k42.kn3.net/CF42609C8.jpg`,
        'answers': [
          {
            'text': `Фото`,
            'value': `photo`,
            'classes': `game__answer game__answer--photo`
          },
          {
            'text': `Рисунок`,
            'value': `paint`,
            'classes': `game__answer game__answer--paint`
          }
        ]
      },
      {
        'image': `https://k42.kn3.net/D2F0370D6.jpg`,
        'answers': [
          {
            'text': `Фото`,
            'value': `photo`,
            'classes': `game__answer game__answer--photo`
          },
          {
            'text': `Рисунок`,
            'value': `paint`,
            'classes': `game__answer game__answer--paint`
          }
        ]
      }],
    'stats': [`wrong`, `slow`, `fast`, `correct`, ``, ``, ``, ``, ``, ``]
  },
  'game-2': {
    'description': `Угадай, фото или рисунок?`,
    'questions': [
      {
        'image': `http://i.imgur.com/1KegWPz.jpg`,
        'answers': [
          {
            'text': `Фото`,
            'value': `photo`,
            'classes': `game__answer game__answer--photo`
          },
          {
            'text': `Рисунок`,
            'value': `paint`,
            'classes': `game__answer game__answer--wide game__answer--paint`
          }
        ]
      }],
    'stats': [`wrong`, `slow`, `fast`, `correct`, `wrong`, ``, `slow`, ``, `fast`, ``]
  },
  'game-3': {
    'description': `Найдите рисунок среди изображений`,
    'questions': [
      {
        'image': `http://i.imgur.com/1KegWPz.jpg`,
        'answers': []
      },
      {
        'image': `https://k42.kn3.net/CF42609C8.jpg`,
        'answers': []
      },
      {
        'image': `https://k42.kn3.net/D2F0370D6.jpg`,
        'answers': []
      }
    ],
    'stats': [`wrong`, `slow`, `fast`, `correct`, `wrong`, ``, `slow`, ``, `fast`, ``]
  }
});
