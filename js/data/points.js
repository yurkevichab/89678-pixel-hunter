const points = {
  'correct': 100,
  'fast': 50,
  'slow': -50,
  'heart': 50
};

export const getPointByAnswerType = (type, totalPoints) => {
  return totalPoints + points[type];
};

export const getPointByLives = (lives, totalPoints) => {
  const sumPointForLives = lives * points.heart;
  return totalPoints + sumPointForLives;
};
