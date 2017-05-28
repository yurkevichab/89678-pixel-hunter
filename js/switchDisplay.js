const mainBlock = document.querySelector(`main.central`);
const switchDisplay = (element) => {
  mainBlock.innerHTML = ``;
  const display = element;
  mainBlock.appendChild(display);
};
export default switchDisplay;
