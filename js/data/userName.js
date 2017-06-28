export default (state, userName) => {
  if (!userName) {
    throw new RangeError(`Username can not be empty`);
  }
  return Object.assign({}, state, {'userName': userName});
};
