const mainBlock = document.querySelector(`main.central`);

export default (view, isCrossfade = false) => {
  if (!isCrossfade) {
    mainBlock.innerHTML = ``;
    mainBlock.appendChild(view.element);
    return;
  }

  const newContainer = view.element;
  let introBlock = mainBlock.firstElementChild;
  newContainer.classList.add(`slide`);
  mainBlock.appendChild(newContainer);
  introBlock.classList.add(`slide`);

  newContainer.style.opacity = 0.2;
  const interval = setInterval(()=> {
    const step = 0.1;
    const result = step + parseFloat(newContainer.style.opacity);
    newContainer.style.opacity = result;
    if (result >= 1) {
      clearInterval(interval);
      introBlock.remove();
    }
  }, 500);
};
