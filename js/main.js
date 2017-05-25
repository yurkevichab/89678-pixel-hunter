const mainBlock = document.querySelector(`main.central`);
const LEFT_BTN_KEY = 37;
const RIGHT_BTN_KEY = 39;
const MIN_DISPLAY_INDEX = 0;

const displays = [
  ...[mainBlock].map((node) => {
    const fragment = document.createDocumentFragment();
    const main = node.querySelector(`.central__content`).cloneNode(true);
    const footer = node.querySelector(`.footer`).cloneNode(true);
    fragment.appendChild(main);
    fragment.appendChild(footer);
    return fragment;
  }),
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

const onDocumentKeyDown = (e) => {
  if (!e.altKey) {
    return;
  }
  const currentKey = e.keyCode;
  if (currentKey === LEFT_BTN_KEY) {
    activeDisplayIndex = decreaseIndex(activeDisplayIndex, MIN_DISPLAY_INDEX);
    switchDisplay(activeDisplayIndex);
  }
  if (currentKey === RIGHT_BTN_KEY) {
    const maxDisplaysIndex = displays.length - 1;
    activeDisplayIndex = increaseIndex(activeDisplayIndex, maxDisplaysIndex);
    switchDisplay(activeDisplayIndex);
  }
};

document.addEventListener(`keydown`, onDocumentKeyDown);
