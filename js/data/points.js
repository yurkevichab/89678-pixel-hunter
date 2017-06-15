import {POINTS, ANSWER_TYPES} from '../data';

export const getPointsByAnswerType = (type, stats) => {
  const countStatType = stats.filter((stat) => stat === type).length;
  return countStatType * POINTS[type];
};

export const getPointByLives = (lives) => {
  return lives * POINTS.heart;
};

export const getTotalPoints = ({lives, stats}) => {
  const sumAnswerPoint = Object.keys(ANSWER_TYPES).reduce((sum, type) => {
    return sum + getPointsByAnswerType(ANSWER_TYPES[type], stats);
  }, 0);
  const sumLivesPoints = getPointByLives(lives);
  return sumAnswerPoint + sumLivesPoints;
};
