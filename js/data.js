export const initialState = Object.freeze({
  game: `game-1`,
  lives: 3,
  timer: 0
});

export const games = Object.freeze({
  'game-1': {
    description: `Угадайте для каждого изображения фото или рисунок?`,
    questions: [
      {
        'image': `https://k42.kn3.net/CF42609C8.jpg`,
        'withAnswers': true
      },
      {
        'image': `https://k42.kn3.net/D2F0370D6.jpg`,
        'withAnswers': true
      }],
    stats: [`wrong`, `slow`, `fast`, `correct`, ``, ``, ``, ``, ``, ``]
  },

  'game-2': {
    description: `Угадай, фото или рисунок?`,
    questions: [
      {
        'image': `http://i.imgur.com/1KegWPz.jpg`,
        'withAnswers': true
      }],
    stats: [`wrong`, `slow`, `fast`, `correct`, `wrong`, ``, `slow`, ``, `fast`, ``]
  }
});
