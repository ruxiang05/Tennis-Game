var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 4;
var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100;
window.onload = function() {
  canvas = document.getElementById('canvas');
  canvasContext = canvas.getContext('2d');
  var framesPerSecond = 30;
  setInterval(function () {
    moveEverything();
    drawEverything();
  },1000/framesPerSecond);
  canvas.addEventListener('mousemove',function(evt){
    var mousePos = calculateMousePosition(evt);
    paddle1Y = mousePos.y - PADDLE_HEIGHT/2;
  });
}

function calculateMousePosition(evt) {//fires every time the mouse moves
  var rect = canvas.getBoundingClientRect(); //retrieve canvas area
  var root = document.documentElement; //retrieve document/HTML page
  var mouseX = evt.clientX - rect.left - root.scrollLeft; //retrieve X position for the mouse
  var mouseY = evt.clientY - rect.top - root.scrollTop; //retrieve Y position for the mouse
  return {
    x: mouseX,
    y: mouseY
  };
}

function ballReset() {
    ballSpeedX = -ballSpeedX;
    ballX = canvas.width/2;
    ballY = canvas.height/2;
}

function moveEverything() {
    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;

    if(ballX > canvas.width || ballX < 0){
      ballReset();
    }


    if(ballY > canvas.height || ballY < 0){
      ballSpeedY = -ballSpeedY;
    }
}

function drawEverything() {
  //make game board
  colorRect(0,0,canvas.width,canvas.height,'black');
  //left player paddle
  colorRect(0,paddle1Y,10,PADDLE_HEIGHT,'white');
  //right player paddle
  colorRect(canvas.width,210,-10, PADDLE_HEIGHT,'white');
  //ball
  colorCircle(ballX,ballY,10);
}

function colorCircle(x,y,radius,color) {
  canvasContext.fillStyle = color;
  canvasContext.beginPath();
  canvasContext.arc(x, y, radius,0, Math.PI * 2, true);
  canvasContext.fill();
}

function colorRect(x,y,width,height,color){
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x,y,width,height);
}
