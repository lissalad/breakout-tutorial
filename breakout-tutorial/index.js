let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let x = canvas.width/2;
let y = canvas.height-30;
let dx = 2;
let dy = -2;

let ballRadius = 10; 

let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width-paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

let brickRowCount = 2;
let brickColumnCount = 5;
let brickWidth = 30;
let brickHeight = 20;
let brickPadding = 60;
let brickOffsetTop = 40;
let brickOffsetLeft =45;

let score = 0;
let lives = 3;

let background = new Image(); // space background
background.src = "/images/lunar-landscape.jpg";

let bricks = [];
for(let c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
for(let r=0; r<brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}


function collisionDetection() {
    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
            let b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score == brickRowCount*brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                        requestAnimationFrame(draw);
            }
                }
            }
        }
    }
}


function drawBricks() {
    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                // ctx.beginPath();
                // ctx.rect(brickX, brickY, brickWidth, brickHeight);
                // ctx.fillStyle = "#0095DD";
                // ctx.fill();
                // ctx.closePath();
                let strawberry = new Image()
                strawberry.src = "/images/strawberry.png"
                let w = strawberry.width/15
                let h = strawberry.height/15

                ctx.drawImage(strawberry,brickX,brickY,w,h);
            }
        }
    }
}

function drawBall() {
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius)
        dx = -dx;
    if(y + dy < ballRadius) {
        dy = -dy;
    } else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
    }
    else {
        lives--;
        if(!lives) {
            alert("GAME OVER");
            document.location.reload();
            requestAnimationFrame(draw);
        }
        else {
            x = canvas.width/2;
            y = canvas.height-30;
            dx = 2;
            dy = -2;
            paddleX = (canvas.width-paddleWidth)/2;
        }
    }
}
// jar ball    
let jar = new Image()
jar.src = "/images/jar.png"
let w = jar.width/12
let h = jar.height/12
let topOffset = h*1.7;
let leftOffset = w*1.4;
ctx.drawImage(jar,x-leftOffset,y-topOffset-paddleHeight,w,h);

// blue circle ball
    // ctx.beginPath();
    // ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    // ctx.fillStyle = "#0095DD";
    // ctx.fill();
    // ctx.closePath();
}

function drawPaddle() {
// blue rectangle paddle    
    // ctx.beginPath();
    // ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    // ctx.fillStyle = "#0095DD";
    // ctx.fill();
    // ctx.closePath();
    let butler = new Image();
    butler.src = "/images/butler.png";
    let butlerW = butler.width/5;
    let butlerH = butler.height/5;
    ctx.drawImage(butler,paddleX,canvas.height-butlerH,butlerW,butlerH);

}

function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function draw() {
    // ctx.clearRect(0, 0, canvas.width, canvas.height); // white background
    ctx.drawImage(background,0,0,canvas.width,canvas.height); // space background
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();
    if(rightPressed)
        paddleX += 7;
    else if(leftPressed)
        paddleX -= 7;
    x += dx;
    y += dy;
    requestAnimationFrame(draw);

}
    draw();
