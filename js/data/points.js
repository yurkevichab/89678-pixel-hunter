import {Points, Result} from '../data';

export const getPointsByAnswerType = (type, stats) => {
  const countStatType = stats.filter((stat) => stat === type).length;
  return countStatType * Points[type];
};

export const getPointByLives = (lives) => {
  return lives * Points.heart;
};

export const getRightPoints = (stats) => {
  return stats.filter((stat) => stat !== Result.wrong).length * Points[Result.correct];
};

export const getTotalPoints = ({lives, stats}) => {
  const sumFastAswerPoints = getPointsByAnswerType(Result.fast, stats);
  const sumSlowAswerPoints = getPointsByAnswerType(Result.slow, stats);
  const sumLivesPoints = getPointByLives(lives);
  const sumRightPoints = getRightPoints(stats);
  return sumFastAswerPoints + sumSlowAswerPoints + sumLivesPoints + sumRightPoints;
};

export const getPointCount = (stats, type) => stats.filter((s) => {
  return s === type;
}).length;
