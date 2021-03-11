const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');


let {innerWidth, innerHeight} = window;

canvas.height = innerHeight;
canvas.width = innerWidth;

// context.fillStyle = 'rgba(255,0,0,.4)'
// context.fillRect(100,100,200,200);


// context.beginPath();
// context.moveTo(100, 100);
// context.lineTo(20, 80);
// context.lineTo(350, 250);
// context.lineTo(500, 500);
// context.strokeStyle = 'green';
// context.stroke();

// for (let i = 0; i < 200; i++) {
    //     let y = Math.random() * window.innerHeight;
    //     let x = Math.random() * window.innerWidth;
    //     context.beginPath();
    //     context.arc(x,y,30,0, Math.PI * 2, false);
    //     context.strokeStyle = 'pink';
    //     context.stroke();
    // }

let radius = 30;

let circleArray = [];
let colorArray = ['red','green','blue','yellow'];

for (let i = 0; i < 150; i++) {
    let x = Math.random() * (innerWidth - radius*2) + radius;
    let y = Math.random() * (innerHeight - radius*2) + radius;
    let dx = (Math.random() - 0.5) ;
    let dy = (Math.random() - 0.5) ;
    let randomColor = Math.floor(Math.random() * 4);
    let color = colorArray[randomColor]

    circleArray.push(new Circle(x,y,dx,dy, radius, color));
}

function Circle (x,y,dx,dy,radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;

    this.draw  = () => {
        context.beginPath();
        context.arc(this.x,this.y,this.radius,0, Math.PI * 2, false);
        context.strokeStyle = this.color;
        context.stroke();
    }
    
    this.update = () => {
        if (this.x + this.radius *2 > innerWidth || this.x - radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius*2 > innerHeight || this.y - radius< 0) {
            this.dy = -this.dy
        }
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }

}




const animate = () => {
    requestAnimationFrame(animate);
    context.clearRect(0,0,innerWidth,innerHeight);
    for (let i = 0; i<circleArray.length;i++) {
        circleArray[i].update();
    }
}

animate()