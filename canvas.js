var canvas = document.querySelector('canvas'); // searches for canvas in html

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d'); // returning drawing context to variable c <- toolset to use on canvas

var color_Array = [
    '#562135',
    '#c3829e',
    '#e9b1cd',
    '#ffe7de',
    '#fcd1d7',
    '#5bc8b2',
    '#7ed9ca',
    '#a2e8dc',
    '#d8fff8',
    '#2fbcbc'
]

class Circle{
    constructor(x = (Math.random() * (innerWidth - 60)) + 30, y = (Math.random() * (innerHeight - 60)) + 30, radius = Math.random() * 30){
        this.x = x;
        this.y = y;
        this.min_Radius = radius + 1;
        this.max_Radius = radius + 50;
        this.radius = radius;

        this.dx = (Math.random() - 0.5) * 4;
        this.dy = (Math.random() - 0.5) * 4;

        this.color = color_Array[Math.floor(Math.random() * color_Array.length)];
        this.bouncing_x = false;
        this.bouncing_y = false;
    }

    Draw(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = '#999999';
        c.stroke();
        c.fillStyle = this.color;
        c.fill();
    }

    Update(){

        if(this.x < this.radius){
            if(Math.abs(this.dx) > 0.4){
                this.dx = Math.abs(this.dx) * 0.7;
            }
            else{
                this.dx = 0;
            }
            this.x = this.radius;
        }
        else if(this.x > canvas.width - this.radius){
            if(Math.abs(this.dx) > 0.4){
                this.dx = -Math.abs(this.dx) * 0.7;
            }
            else{
                this.dx = 0;
            }
            this.x = canvas.width - this.radius;
        }
        if(this.y < this.radius){
            if(Math.abs(this.dy) > 0.4){
                this.dy = Math.abs(this.dy) * 0.7;
            }
            else{
                this.dy = 0;
            }
            this.y = this.radius;
        }
        else if(this.y > canvas.height - this.radius){
            if(Math.abs(this.dy) > 0.4){
                this.dy = -Math.abs(this.dy) * 0.7;
            }
            else{
                this.dy = 0;
            }
            this.y = canvas.height - this.radius;
        }
        else{
            //this.dy += 0.1;
        }


        this.x += this.dx;
        this.y += this.dy;

        if(Math.sqrt((mouse.x - this.x) ** 2 + (mouse.y - this.y) ** 2) < 100){
            if(this.radius < this.max_Radius){
                this.radius += 2.0;
            }
        }

        else{
            if(this.radius > this.min_Radius){
                this.radius -= 2.0;
            }
        }
    }
}

var mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', function(event) { mouse.x = event.x; mouse.y = event.y; } )

var circles = [];
var num_Circles = 1500;

for(i = 0; i < num_Circles; i++){
    circles.push(new Circle());
}

function animate(){
    requestAnimationFrame(animate);

    c.clearRect(0, 0, canvas.width, canvas.height);
    c.globalCompositeOperation = "darken";

    for(i = 0; i < circles.length; i++){
        circles[i].Update();
        circles[i].Draw();
    }
}

animate();