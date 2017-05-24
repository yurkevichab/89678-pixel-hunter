const mainBlock = document.querySelector("main.central");
let index = 0;
const displays = [
    document.getElementById("greeting"),
    document.getElementById("rules"),
    document.getElementById("game-1"),
    document.getElementById("game-2"),
    document.getElementById("game-3"),
    document.getElementById("stats")
];

const switchDisplay = (number) => {
    mainBlock.innerHTML = '';
    const display = displays[number].innerHTML;
    mainBlock.innerHTML = display;
};

document.onkeydown = (e) => {
    if (e.altKey && e.keyCode == 37) {
        e.preventDefault();
        if (index > 0) {
            --index;
            switchDisplay(index);

        }
    }
    if (e.altKey && e.keyCode == 39) {
        e.preventDefault();
        if (index < displays.length - 1) {
            ++index;
            switchDisplay(index);

        }
    }
};