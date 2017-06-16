import {games} from '../data';
import {cleanTimer} from './timer';

export const setGame = (state) => {
  let game = state.game;
  game++;
  if (game > games.length) {
    throw new RangeError(`Number of games can not be more than ${games.length}`);
  }
  const timer = cleanTimer(state).timer;
  return Object.assign({}, state, {'game': game, 'timer': timer});
};

export const isLastGame = (game) => {
  return game === games.length - 1;
};
