import {games} from '../data';

export const setQuestion = (state) => {
  let game = state.game;
  game++;
  if (game > games.length) {
    throw new RangeError(`Number of games can not be more than ${games.length}`);
  }
  return Object.assign({}, state, {'game': game});
};
