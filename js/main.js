const mainBlock = document.querySelector(`main.central`);
const LEFT_BTN_KEY = 37;
const RIGHT_BTN_KEY = 39;
const MIN_DISPLAY_INDEX = 0;
const displays = [
  mainBlock.cloneNode(true),
  ...[
    document.getElementById(`greeting`),
    document.getElementById(`rules`),
    document.getElementById(`game-1`),
    document.getElementById(`game-2`),
    document.getElementById(`game-3`),
    document.getElementById(`stats`)
  ].map((template) => template.content)
];
let activeDisplayIndex = 0;

const switchDisplay = (number) => {
  mainBlock.innerHTML = ``;
  const display = displays[number];
  mainBlock.appendChild(display.cloneNode(true));
};

const decreaseIndex = (displayIndex, minIndex = 0) => {
  return Math.max(--displayIndex, minIndex);
};

const increaseIndex = (displayIndex, maxIndex) => {
  return Math.min(++displayIndex, maxIndex);
};

document.addEventListener(`keydown`,
    (e) => {
      if (!e.altKey) {
        return;
      }
      const currentkey = e.keyCode;
      if (currentkey === LEFT_BTN_KEY || currentkey === RIGHT_BTN_KEY) {
        e.preventDefault();
        if (currentkey === LEFT_BTN_KEY) {
          activeDisplayIndex = decreaseIndex(activeDisplayIndex, MIN_DISPLAY_INDEX);
          switchDisplay(activeDisplayIndex);
        }
        if (currentkey === RIGHT_BTN_KEY) {
          const maxDisplaysIndex = Math.max(displays.length - 1, MIN_DISPLAY_INDEX);
          activeDisplayIndex = increaseIndex(activeDisplayIndex, maxDisplaysIndex);
          switchDisplay(activeDisplayIndex);
        }
      }
    });
