import {Points, Result} from './data';

export const getPointsByAnswerType = (type, stats) => {
  const countStatType = getStatsCount(stats, type);
  return countStatType * Points[type];
};

export const getPointByLives = (lives) => lives * Points.LIVES;

export const getRightPoints = (stats) => {
  return stats.filter((stat) => stat !== Result.WRONG).length * Points[Result.CORRECT];
};

export const getTotalPoints = ({lives, stats}) => {
  const sumFastAswerPoints = getPointsByAnswerType(Result.FAST, stats);
  const sumSlowAswerPoints = getPointsByAnswerType(Result.SLOW, stats);
  const sumLivesPoints = getPointByLives(lives);
  const sumRightPoints = getRightPoints(stats);
  return sumFastAswerPoints + sumSlowAswerPoints + sumLivesPoints + sumRightPoints;
};

export const getStatsCount = (stats, type) => {
  return stats.filter((stat) => stat === type).length;
};
