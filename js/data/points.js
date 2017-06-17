import {POINTS, ANSWER_TYPES} from '../data';

export const getPointsByAnswerType = (type, stats) => {
  const countStatType = stats.filter((stat) => stat === type).length;
  return countStatType * POINTS[type];
};

export const getPointByLives = (lives) => {
  return lives * POINTS.heart;
};

export const getRightPoints = (stats) => {
  return stats.filter((stat) => stat !== ANSWER_TYPES.wrong).length * POINTS[ANSWER_TYPES.correct];
};

export const getTotalPoints = ({lives, stats}) => {
  const sumFastAswerPoints = getPointsByAnswerType(ANSWER_TYPES.fast, stats);
  const sumSlowAswerPoints = getPointsByAnswerType(ANSWER_TYPES.slow, stats);
  const sumLivesPoints = getPointByLives(lives);
  const sumRightPoints = getRightPoints(stats);
  return sumFastAswerPoints + sumSlowAswerPoints + sumLivesPoints + sumRightPoints;
};

export const getPointCount = (stats, type) => stats.filter((s) => {
  return s === type;
}).length;
