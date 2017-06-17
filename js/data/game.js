import {games} from '../data';

export const changeGame = (state) => {
  let game = state.game;
  game++;
  if (game > games.length) {
    throw new RangeError(`Number of games can not be more than ${games.length}`);
  }
  return Object.assign({}, state, {'game': game});
};

export const isLastGame = (game) => {
  return game === games.length - 1;
};
