export const initialState = Object.freeze({
  game: 0,
  lives: 3,
  timer: 30,
  maxLives: 3,
  stats: [`wrong`, `slow`, `fast`, `correct`, `wrong`, ``, `slow`, ``, `fast`, ``]
});

export const games = Object.freeze([
  {
    'type': `game-1`,
    'description': `Угадайте для каждого изображения фото или рисунок?`,
    'questions': [
      {
        'image': `https://k42.kn3.net/CF42609C8.jpg`,
      },
      {
        'image': `https://k42.kn3.net/D2F0370D6.jpg`,
      }]
  },
  {
    'type': `game-2`,
    'description': `Угадай, фото или рисунок?`,
    'questions': [
      {
        'image': `http://i.imgur.com/1KegWPz.jpg`,
      }
    ]
  },
  {
    'type': `game-3`,
    'description': `Найдите рисунок среди изображений`,
    'questions': [
      {
        'image': `http://i.imgur.com/1KegWPz.jpg`,
        'right': false
      },
      {
        'image': `https://k42.kn3.net/CF42609C8.jpg`,
        'right': true
      },
      {
        'image': `https://k42.kn3.net/D2F0370D6.jpg`,
        'right': false
      }
    ]
  }
]);
