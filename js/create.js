const divsAll = document.querySelector('div');
let divDelCords = { x: 1, y: 1 };

// creates snake's pos and prints it
class createSnake {
    // create snake's head's pos
    static createHead = (direction) => {
        let head = main.data.snake[0];
        let x = head.x;
        let y = head.y;

        switch (direction) {
            case 'left': x -= 1; break;
            case 'right': x += 1; break;
            case 'up': y -= 1; break;
            case 'down': y += 1; break;
        }
        return { x: x, y: y };
    }
    // create snake's pos
    static move = (direction) => {
        checks.mapEscaped();
        if (!main.data.mapEscaped) {
            for (let i = main.data.lenght - 1; i > 0; i--) {
                main.data.snake[i] = main.data.snake[i - 1];
            }
            main.data.snake[0] = this.createHead(direction);
        }
    }
    // makes snake longer
    static longerSnake = () => {
        if (main.data.appleEaten) {
            main.data.lenght += 1;
        }
    }
    // print Snake
    static printSnake = (snake, lenght) => {
        snake.forEach((element) => {
            let div = document.querySelector(`#div${element.y}${element.x}`);
            divsAll.style.backgroundColor = '#000';
            div.style.backgroundColor = main.currentSkin.color2;
            divDelCords = main.data.snake[main.data.lenght - 1];
        })
    }
    // puts skin onto a snake
    static snakeStyle = (headCords) => {
        let snake = main.data.snake;

        snake.forEach((element, index) => {
            const i = index;
            const cords = element;
            const div = document.querySelector(`#div${cords.y}${cords.x}`)

            if (main.currentSkin.color3) {
                if (i % 3 == 0) { div.style.backgroundColor = main.currentSkin.color1 };
                if (i % 3 == 1) { div.style.backgroundColor = main.currentSkin.color2 };
                if (i % 3 == 2) { div.style.backgroundColor = main.currentSkin.color3 };
            } else {
                if (i % 2 == 0) { div.style.backgroundColor = main.currentSkin.color1 };
            }

            let previous = (snake[i - 1]) ? snake[i - 1] : false;
            let next = (snake[i + 1]) ? snake[i + 1] : false;
            let border = '3px solid black';
            let borders = {
                top: border,
                bottom: border,
                left: border,
                right: border
            };

            if (previous && next) {
                borders.top = (previous.y < cords.y || next.y < cords.y) ? '' : border;
                borders.bottom = (previous.y > cords.y || next.y > cords.y) ? '' : border;
                borders.left = (previous.x < cords.x || next.x < cords.x) ? '' : border;
                borders.right = (previous.x > cords.x || next.x > cords.x) ? '' : border;
            } else {
                if (!next) {
                    borders.top = (previous.y < cords.y) ? '' : border;
                    borders.bottom = (previous.y > cords.y) ? '' : border;
                    borders.left = (previous.x < cords.x) ? '' : border;
                    borders.right = (previous.x > cords.x) ? '' : border;
                }
            }


            div.style.borderTop = borders.top;
            div.style.borderBottom = borders.bottom;
            div.style.borderLeft = borders.left;
            div.style.borderRight = borders.right;
        })
        let head = document.querySelector(`#div${headCords.y}${headCords.x}`);
        head.style.backgroundColor = main.currentSkin.headColor;
    }
    // checks if current direction isn't oposit of the previouse one
    static checkDirection = (direction, previousDirection) => {
        switch (direction) {
            case "up":
                return previousDirection == "down" ? false : true;
            case "down":
                return previousDirection == "up" ? false : true;
            case "left":
                return previousDirection == "right" ? false : true;
            case "right":
                return previousDirection == "left" ? false : true;
        }
    };
}

class createApple {
    // spawns apple
    static spawn = (snake, lenght) => {
        if (main.data.appleEaten) {
            checks.appleEaten(main.data.snake[0]);
            main.data.appleEaten = false;
            let pos = this.applePos(snake, lenght);
            let div = document.querySelector(`#div${pos.y}${pos.x}`);
            div.style.backgroundColor = 'red';
            main.data.applePos = pos;
        }
        let mainPos = main.data.applePos;
        let mainDiv = document.querySelector(`#div${mainPos.y}${mainPos.x}`);
        mainDiv.style.backgroundColor = 'red';
    }
    // creates apples pos
    static applePos = (snake, lenght) => {
        while (true) {
            let isEmpty = true;
            let pos = {
                x: Math.floor(Math.random() * (10 - 1)) + 1,
                y: Math.floor(Math.random() * (10 - 1)) + 1
            }
            snake.forEach((element) => {
                if (pos.x == element.x && pos.y == element.y) {
                    isEmpty = false;
                }
            });
            if (isEmpty) {
                return pos;
            }
        }
    }
}