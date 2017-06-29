export default (state, userName) => {
  if (typeof userName !== `string` && userName === ``) {
    throw new RangeError(`Username can not be empty or not a string type`);
  }
  return Object.assign({}, state, {'userName': userName});
};
