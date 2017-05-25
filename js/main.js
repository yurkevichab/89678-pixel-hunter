const mainBlock = document.querySelector(`main.central`);
const leftBtnKey = 37;
const rightBtnKey = 39;
const altBtnKey = 18;
const displays = [
  mainBlock.cloneNode(true),
  document.getElementById(`greeting`).content,
  document.getElementById(`rules`).content,
  document.getElementById(`game-1`).content,
  document.getElementById(`game-2`).content,
  document.getElementById(`game-3`).content,
  document.getElementById(`stats`).content
];
let activeElementNumber = 0;

const switchDisplay = (number) => {
  mainBlock.innerHTML = ``;
  const display = displays[number];
  mainBlock.appendChild(display.cloneNode(true));
};

const prevDisplay = () => {
  if (activeElementNumber > 0) {
    --activeElementNumber;
    switchDisplay(activeElementNumber);
  }
};

const nextDisplay = () => {
  if (activeElementNumber < displays.length - 1) {
    ++activeElementNumber;
    switchDisplay(activeElementNumber);
  }
};

document.addEventListener(`keydown`,
    (e) => {
      const currentkey = e.keyCode;
      if (altBtnKey && (currentkey === leftBtnKey || currentkey === rightBtnKey)) {
        e.preventDefault();
        if (currentkey === leftBtnKey) {
          prevDisplay();
        } else {
          nextDisplay();
        }
      }
    });
