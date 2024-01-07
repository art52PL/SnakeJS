// updates things
class update {
    // updates points number
    static refreshPoints = () => {
        const scoreDiv = document.querySelector('.score')
        let points = main.data.points;
        scoreDiv.innerHTML = `score: ${points}`;
    }
}
// restarts game and creates start data
class restart {
    static map = () => {
        const mapSize = 81;
        for (let i = 1; i <= mapSize; i++) {
            let div = document.querySelector(`.div${i}`);
            div.style.boxShadow = '';
            div.style.border = '';
            (i % 2 == 1) ? document.querySelector(`.div${i}`).style.backgroundColor = 'darkGreen' : document.querySelector(`.div${i}`).style.backgroundColor = 'green';
        }
    }
    // creates start data
    static basicData = () => {
        main.data = {
            points: 0,
            speed: 1,
            lenght: 4,
            direction: 'right',
            appleEaten: true,
            applePos: { x: 0, y: 0 },
            mapEscaped: false,

            snake: [
                { x: 4, y: 1 },
                { x: 3, y: 1 },
                { x: 2, y: 1 },
                { x: 1, y: 1 }
            ]
        }
    }
}
// creates finish screen and finishes game
class finish {
    static finishGame = (win) => {
        clearInterval(main.game);
        win ? this.winScreen() : this.loseScreen();
    };
    static winScreen = () => {
        this.finishGameScreen('You win')
    }
    static loseScreen = () => {
        this.finishGameScreen('You lose')
    }
    static finishGameScreen = (textMessage) => {
        const body = document.querySelector('body');
        const points = main.data.points;
        const messageParts = {
            header: `<div class="middle"><h2>${textMessage}</h2>`,
            description: `<p>Your score: ${points}</p></div>`
        }
        const message = `${messageParts.header} <br> ${messageParts.description}`;
        document.querySelector('.parent').style.display = 'none';
        body.innerHTML += message;
    }
}
// checks connected with death and scoring points
class checks {
    // checks if map is escaped
    static mapEscaped = () => {
        let head = main.data.snake[0];
        let x = head.x;
        let y = head.y;
        if (x < 0 || x > 9 || y < 0 || y > 9) {
            finish.finishGame(false);
            main.data.mapEscaped = true;
        }
    };
    // checks if apple is eaten
    static appleEaten = (head) => {
        let apple = main.data.applePos;
        if (head.x == apple.x && head.y == apple.y) {
            main.data.points += 0.5;
            main.data.appleEaten = true;
        }
    };
    // checks if snakes tail is hit
    static tailHit = (snake, lenght) => {
        let head = snake[0];
        for (let i = 0; i < lenght - 1; i++) {
            let tailPart = snake[i + 1];
            if (head.x == tailPart.x && head.y == tailPart.y) {
                return true;
            }
        }
        return false;
    };
}

let checksData = {
    previousDirection: "right",
};
