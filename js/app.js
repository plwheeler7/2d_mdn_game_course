// JavaScript code for 2d game course

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");

console.log("i am here")

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var ballRadius = 10
var x = canvas.width/2;
var y = canvas.height/2;
var dx = getRandom(-2,2);
var dy = getRandom(-2,2);
var myColor = "#0095DD";
var rightPressed = false;
var leftPressed = false;

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

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    x += dx;
    y += dy;

    // if(y + dy > canvas.height-ballRadius || y + dy < 0+ballRadius) {
    if(y + dy < 0+ballRadius) {    
        dy = -dy;
        myColor = newColor();
    }
    else if(y + dy > canvas.height-ballRadius-paddleHeight) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else if(y+dy > canvas.height+ballRadius) {
            alert("GAME OVER");
            // document.location.reload();
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
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    console.log(e.keyCode);
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    console.log(e.keyCode);
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

setInterval(draw, 10);


// draw rectangle
// ctx.beginPath();
// ctx.rect(20, 40, 50, 50);
// ctx.fillStyle = "#FF0000";
// ctx.fill();
// ctx.closePath();

// draw circle
// ctx.beginPath();
// ctx.arc(240, 160, 20, 0, Math.PI*2, false);
// ctx.fillStyle = "green";
// ctx.fill();
// ctx.closePath()