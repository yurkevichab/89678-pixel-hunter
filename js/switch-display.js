const mainBlock = document.querySelector(`main.central`);
export default (display) => {
  mainBlock.innerHTML = ``;
  mainBlock.appendChild(display);
};
