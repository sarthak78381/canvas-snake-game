const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const upButton = document.getElementById('up_button');
const leftButton = document.getElementById('left_button');
const bottomButton = document.getElementById('bottom_button');
const rightButton = document.getElementById('right_button');


// let {innerWidth, innerHeight} = window;

canvas.height = 600;
canvas.width = 1000;

// window.addEventListener('resize', () => {
//     innerWidth = window.innerWidth;
//     innerHeight = window.innerHeight;
//     canvas.height = innerHeight;
//     canvas.width = innerWidth;
// })


function init() {
    for (let i = 10; i < canvas.height; i += 20) {
        for (let j = 10; j < canvas.width; j += 20) {
            ctx.beginPath();
            ctx.arc(j, i, 10,0, Math.PI * 2, false)
            ctx.stroke()
        }
    }
}

init()

const getRandomWidthAndHeight = () => {
    const randomWidth = Math.random() * (0 + canvas.width);
    const width = randomWidth - (randomWidth % 20);
    
    const randomHeight = Math.random() * (0 + canvas.height);
    const height = randomHeight - (randomHeight % 20);
    
    return { width, height };
}
let random = getRandomWidthAndHeight();
let random2 = getRandomWidthAndHeight();

let speed = 0;
let x = 20;
let y = 20;
let hue = 0;
let direction = "width";
let snakeLength = [];

class Snake {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.arc(this.x, this.y, 10,0, Math.PI * 2, false);
        ctx.fill();
    }
    update() {
        if (this.x > canvas.width - 20) {
            this.x = 0;
        }
        if (this.x < 0) {
            this.x = canvas.width-20;
        }
        if (this.y < 0) {
            this.y = canvas.height - 20;
        }
        if (this.y > canvas.height - 20) {
            this.y = 0
        }
        if (this.x === random2.width && this.y === random2.height) {
            let newSnake;
            if (direction === "width") {
                newSnake = {
                    width: random2.width - x,
                    height: random2.height
                }
            }
            if (direction === "height") {
                newSnake = {
                    width: random2.width,
                    height: random2.height - y
                }
            }
            snakeLength.push(new Snake(newSnake.width, newSnake.height));
            random2 = getRandomWidthAndHeight();
        }
        this.draw();
    }
    updatePostion(newPositionX, newPositionY) {
        this.x = newPositionX;
        this.y = newPositionY;
        this.draw();
    }
}

snakeLength.push(new Snake(random.width, random.height));

const changePosition = () => {
    ctx.fillStyle = 'red'
    for (let i = 0; i < snakeLength.length; i++) {
        let previousPostionX = 0;
        let previousPostionY = 0;
        let newPostionX = 0;
        let newPostionY = 0;
        if (speed === 20) {
            if (i === 0) {
                if (direction === "width") {
                    previousPostionX = snakeLength[i].x;
                    previousPostionY = snakeLength[i].y;
                    newPostionX = previousPostionX + x;
                    newPostionY = previousPostionY
                }
                if (direction === "height") {
                    previousPostionY = snakeLength[i].y;
                    previousPostionX = snakeLength[i].x;
                    newPostionX = previousPostionX;
                    newPostionY = previousPostionY + y;
                }
                snakeLength[i].updatePostion(newPostionX, newPostionY);
                for (let j = i+1; j<snakeLength.length; j++) {
                    if (snakeLength[0].x === snakeLength[j].x && snakeLength[0].y === snakeLength[j].y) {
                        snakeLength = snakeLength.slice(0, j);
                        break;
                    }
                    let currentPositionX = snakeLength[j].x;
                    let currentPositionY = snakeLength[j].y;
                    snakeLength[j].updatePostion(previousPostionX,previousPostionY);
                    previousPostionX = currentPositionX;
                    previousPostionY = currentPositionY;
                }
            }
            speed = 0;
        };
    }
    if (snakeLength[0].x === random2.width && snakeLength[0].y === random2.height) {
        let newSnake;
        if (direction === "width") {
            newSnake = {
                width: random2.width - x,
                height: random2.height
            }
        }
        if (direction === "height") {
            newSnake = {
                width: random2.width,
                height: random2.height - y
            }
        }
        snakeLength.push(new Snake(newSnake.width, newSnake.height));
        random2 = getRandomWidthAndHeight();
    }
}

const animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    // init();
    changePosition();
    ctx.beginPath();
    ctx.fillStyle = `hsl(${hue}, 50%, 50%)`;
    ctx.arc(random2.width, random2.height, 10,0,Math.PI*2,false);
    ctx.fill();
    ctx.fillStyle = 'red';
    for (let i = 0; i < snakeLength.length; i++) {
        snakeLength[i].update();
    }
    hue += 1;
    speed += 1;
}

animate()

window.addEventListener('keypress', (e) => {
    let {keyCode} = e;
    if (keyCode === 119) {
        direction = 'height';
        y = -20;
    }
    if (keyCode === 97) {
        direction = 'width';
        x = -20;
    }
    if (keyCode === 100) {
        direction = 'width';
        x = 20;
    }
    if (keyCode === 115) {
        direction = 'height';
        y = 20;
    }
})

upButton.addEventListener('click', () => {
    direction = 'height';
    y = -20;
})
leftButton.addEventListener('click', () => {
    direction = 'width';
    x = -20;
})
bottomButton.addEventListener('click', () => {
    direction = 'height';
    y = 20;
})
rightButton.addEventListener('click', () => {
    direction = 'width';
    x = 20;
})









