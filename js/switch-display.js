const mainBlock = document.querySelector(`main.central`);

export default (view, fistTime = false) => {
  if (fistTime) {
    const gree = view.element.querySelector(`.greeting`);
    gree.style.display = `none`;
    gree.classList.add(`slide`);
    mainBlock.insertAdjacentHTML(`afterbegin`, view.element.innerHTML);
    mainBlock.querySelector(`#intro`).classList.add(`slide`);
    mainBlock.querySelector(`.greeting`).style.display = `block`;
    mainBlock.querySelector(`.greeting`).style.opacity = `1`;

  } else {
    mainBlock.innerHTML = ``;
    mainBlock.insertAdjacentHTML(`afterbegin`, view.element.innerHTML);
  }
};
