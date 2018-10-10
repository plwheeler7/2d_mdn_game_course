// JavaScript code for 2d game course

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var ballRadius = 10
var x = canvas.width/2;
var y = canvas.height/2;
var dx = 1;
var dy = 3;
var myColor = "#0095DD";
var rightPressed = false;
var leftPressed = false;
var myScore = 0;
var myLives = 3;

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 375 / brickColumnCount;
var brickHeight = 60 / brickRowCount;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30+(10-brickPadding)*(brickColumnCount+1);
var brickCount = brickRowCount * brickColumnCount;
var bricks = [];

for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
      bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
  }

for(var c=0; c<brickColumnCount; c++) {
    // console.log("i am here c loop" + c);
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        // console.log("i am here r loop" + r);
        bricks[c][r] = {x: (c*(brickWidth+brickPadding))+brickOffsetLeft,y: (r*(brickHeight+brickPadding))+brickOffsetTop, status:1};
        ctx.beginPath();
        ctx.rect(bricks[c][r].x, bricks[c][r].y, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
}

function drawBricks() {
    brickCount = 0;
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            // var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            // var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            var brickX = bricks[c][r].x;
            var brickY = bricks[c][r].y;
            var brickStatus = bricks[c][r].status;
            
            if (brickStatus == 1) {
                brickCount += 1;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
            
        }
    }
    console.log(brickCount);
}

// function eraseBrick(c,r,x,y,flashColor) {

// }


function getRandom(min,max) {
    return Math.random()*(max-min)+min;
  }

function newColor() {
    var r = Math.round(Math.random()*256);
    var g = Math.round(Math.random()*256);
    var b = Math.round(Math.random()*256);
    var myRandColor = 'rgb(' + r +','+g+','+b+')';
    return myRandColor;
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = myColor;
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle =  "#0095DD"; 
    ctx.fillText ("Score: "+myScore, 8, 20);
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+myLives, canvas.width-65, 20);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    if(brickCount == 0) {
        alert("Winner, Winner, Chicken Dinner!!");
        document.location.reload();
    }
    drawBall();
    drawPaddle();
    x += dx;
    y += dy;

    // if(y + dy > canvas.height-ballRadius || y + dy < 0+ballRadius) {
    if(y + dy < ballRadius) {    
        dy = -dy;
        myColor = newColor();
    }
    else if(y + dy > canvas.height-ballRadius-paddleHeight) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy*1.1;
            dx = dx+getRandom(-1,1);
            myColor = newColor();
        }
        else if(y+dy > canvas.height+ballRadius*2) {
            myLives -=1;
            if(myLives == 0) {
                alert("Game Over LOSER! Your score was "+myScore);
                document.location.reload();
            }
            else {
                alert("Watch out! only "+myLives+" lives left!!!!");
            x = canvas.width/2;
            y = canvas.height/2;
            dx = 0;
            dy = 3;
            }
        }
    }

    if(x + dx > canvas.width-ballRadius || x + dx < 0+ballRadius) {
        dx = -dx;
        myColor = newColor();
    }
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 3;
    }
        else if(leftPressed && paddleX > 0) {
        paddleX -= 3;
    }
    collissionDetection();
    drawScore();
    drawLives();
    // alternative to set Interval below
    requestAnimationFrame(draw);
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

function keyDownHandler(e) {
    // console.log(e.keyCode);
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    // console.log(e.keyCode);
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

function collissionDetection () {
    for (var c=0; c < brickColumnCount; c++) {
        for(var r = 0; r< brickRowCount; r++) {
            var block = bricks[c][r];
            if ((block.y + brickHeight) > (y - ballRadius) && (block.x < (x+ballRadius)) && (block.x+brickWidth) > (x-ballRadius)) {
                dy = -dy;
                myColor = newColor();
                ctx.beginPath();
                ctx.clearRect(block.x,block.y, brickWidth,brickHeight);
                ctx.closePath();
                // do I need to set new coordinates?
                bricks[c][r].x = 0 - brickWidth;
                bricks[c][r].y = 0 - brickHeight;
                bricks[c][r].status = 0;
                myScore += 1;
                
            }
        }

    }
}
// Alternative to set animation
// setInterval(draw, 10);

draw();
