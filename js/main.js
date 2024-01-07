// object to score skins
class skin {
  constructor(headColor, color1, color2, color3, customStyle) {
    this.headColor = headColor;
    this.color1 = color1;
    this.color2 = color2;
    this.color3 = color3 || false;
    this.customStyle = customStyle || false;
  }
}
// object to store global data
let main = {
  data: {},
  game: {},
  skins: {
    worm: new skin("rgb(112, 65, 112)", "deepPink", "rgb(165, 127, 165)"),
    goldenSnake: new skin(
      "rgb(227, 174, 14)",
      "rgb(207, 159, 9)",
      "rgb(187, 144, 5)",
      "rgb(187, 129, 0)"
    ),
    germany: new skin("yellow", "red", "black"),
  },
  currentSkin: "worm",
};
// main function that starts game and sets main interval of the game that allows the snake to move
const start = (skinCurrent) => {
  document.querySelector(".score").style.display = "block";
  document.querySelector(".menu").style.display = "none";
  main.currentSkin = skinCurrent;
  restart.basicData();
  main.game = setInterval(() => {
    restart.map();
    if (!createSnake.checkDirection(main.data.direction, checksData.previousDirection)) {
      main.data.direction = checksData.previousDirection;
    }
    checks.mapEscaped();
    if (!main.data.mapEscaped) {
      createSnake.longerSnake();
      createApple.spawn(main.data.snake, main.data.lenght);
      checksData.previousDirection = main.data.direction;
      createSnake.move(main.data.direction);
      if (!main.data.mapEscaped) {
        createSnake.printSnake(main.data.snake, main.data.lenght);
        checks.appleEaten(main.data.snake[0]);
        update.refreshPoints();
        if (checks.tailHit(main.data.snake, main.data.lenght)) {
          finish.finishGame(false);
        }
        createSnake.snakeStyle(main.data.snake[0]);
      }
    }
  }, 250 * main.data.speed);
};
