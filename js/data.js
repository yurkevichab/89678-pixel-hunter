export const initialState = Object.freeze({
  game: 0,
  lives: 3,
  timer: 30,
  stats: [``, ``, ``, ``, ``, ``, ``, ``, ``, ``]
});

export const games = Object.freeze([
  {
    'type': `game-1`,
    'description': `Угадайте для каждого изображения фото или рисунок?`,
    'questions': [
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
    'type': `game-2`,
    'description': `Угадай, фото или рисунок?`,
    'questions': [
      {
        'image': `http://i.imgur.com/1KegWPz.jpg`,
        'type': `paint`
      }
    ]
  },
  {
    'type': `game-3`,
    'description': `Найдите рисунок среди изображений`,
    'questions': [
      {
        'image': `http://i.imgur.com/1KegWPz.jpg`,
        'isRight': false,
        'type': `photo`
      },
      {
        'image': `https://k42.kn3.net/CF42609C8.jpg`,
        'isRight': true,
        'type': `paint`
      },
      {
        'image': `https://k42.kn3.net/D2F0370D6.jpg`,
        'isRight': false,
        'type': `photo`
      }
    ]
  }
]);
