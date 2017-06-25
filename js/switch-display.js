const mainBlock = document.querySelector(`main.central`);

export default (view) => {
  mainBlock.innerHTML = ``;
  mainBlock.appendChild(view.element);
};
