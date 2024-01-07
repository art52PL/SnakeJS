const easy = document.getElementById("easy");
const normal = document.getElementById("normal");
const hardcore = document.getElementById("hardcore");
const Start = document.getElementById("start");
let gameStarted = false;

const menuColors = {
    active: "#696969",
    normal: "#242424",
};

const difficulties = {
    easy: 0.5,
    normal: 1,
    hardcore: 2
}

const setDificulty = (element, diff) => {

    let difficulty = (!element) ? diff : element.target.id;
    main.data.speed = eval(`difficulties.${difficulty}`);
    easy.style.backgroundColor = menuColors.normal;
    normal.style.backgroundColor = menuColors.normal;
    hardcore.style.backgroundColor = menuColors.normal;

    let button = eval(difficulty);
    button.style.backgroundColor = menuColors.active;
}

easy.addEventListener("click", setDificulty);
normal.addEventListener("click", setDificulty);
hardcore.addEventListener("click", setDificulty);

document.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        if (!gameStarted) {
            start(main.skins.goldenSnake);
            gameStarted = true;
        }
    }
    switch (e.key) {
        case 'z': setDificulty(null, 'easy'); break;
        case 'x': setDificulty(null, 'normal'); break;
        case 'c': setDificulty(null, 'hardcore'); break;
    }
})
Start.addEventListener("click", () => {
    start(main.skins.goldenSnake);
    gameStarted = true;
});

keybindsHandler = (event) => {
    switch (event.key) {
        case 'ArrowRight': case 'd': main.data.direction = 'right'; break;
        case 'ArrowLeft': case 'a': main.data.direction = 'left'; break;
        case 'ArrowDown': case 's': main.data.direction = 'down'; break;
        case 'ArrowUp': case 'w': main.data.direction = 'up'; break;
    }
}
document.addEventListener('keydown', keybindsHandler, false);