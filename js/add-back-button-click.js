export default (element, callback) => {
  const backButton = element.querySelector(`.back`);
  backButton.addEventListener(`click`, () => callback());
};
