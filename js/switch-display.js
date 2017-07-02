const mainBlock = document.querySelector(`main.central`);
const CROSSFADE_CLASS = `slide`;

export default (view, isCrossfade = false) => {
  if (!isCrossfade) {
    mainBlock.innerHTML = ``;
    mainBlock.appendChild(view.element);
    return;
  }
  const newContainer = view.element;
  const container = mainBlock.firstElementChild;
  newContainer.classList.add(CROSSFADE_CLASS);
  mainBlock.appendChild(newContainer);
  container.classList.add(CROSSFADE_CLASS);
  let opacityValue = 0.5;
  newContainer.style.opacity = opacityValue;
  const interval = setInterval(()=> {
    const step = 0.5;
    opacityValue = step + opacityValue;
    newContainer.style.opacity = opacityValue;
    if (opacityValue >= 5) {
      clearInterval(interval);
      container.remove();
    }
  }, 300);
};
