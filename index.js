var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 4;
var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;
var player1Score = 0;
var player2Score = 0;
const WINNING_SCORE = 3;
var showingWinScreen = false;
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
    if(player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE){
      player1Score = 0;
      player2Score = 0;
      showingWinScreen = true;
    }
    ballSpeedX = -ballSpeedX;
    ballX = canvas.width/2;
    ballY = canvas.height/2;
}

function computerMovement() {
  var paddle2YCenter = paddle2Y + PADDLE_HEIGHT/2;
  if(paddle2Y < ballY - 35) {
    paddle2Y += 6;
  } else if(paddle2Y > ballY + 35){
    paddle2Y -= 6;
  }
}

function moveEverything() {
    if(showingWinScreen){
      return;
    }
    computerMovement();

    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;

    if(ballX < 0) {
      if(ballY > paddle1Y && ballY < (paddle1Y + PADDLE_HEIGHT)){
        ballSpeedX = -ballSpeedX;
        var deltaY = ballY - (paddle1Y + PADDLE_HEIGHT/2);
        ballSpeedY = deltaY * 0.35;
      } else {
        player2Score++;
        ballReset();

      }
    }

    if(ballX > canvas.width) {
      if(ballY > paddle2Y && ballY < (paddle2Y + PADDLE_HEIGHT)){
        ballSpeedX = -ballSpeedX;
        var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT/2);
        ballSpeedY = deltaY * 0.35;
      } else {
        player1Score++;
        ballReset();

      }
    }

    if(ballY > canvas.height || ballY < 0){
      ballSpeedY = -ballSpeedY;
    }
}

function drawEverything() {
  //make game board
  colorRect(0,0,canvas.width,canvas.height,'black');
  if(showingWinScreen){
    canvasContext.fillStyle = 'white';
    canvasContext.fillText('Click to continue',canvas.width/2,100);
    return;
  }
  //left player paddle
  colorRect(0,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');
  //right player paddle
  colorRect(canvas.width - PADDLE_THICKNESS,paddle2Y ,PADDLE_THICKNESS, PADDLE_HEIGHT,'white');
  //ball
  colorCircle(ballX,ballY,10);
  canvasContext.fillText(player1Score,canvas.width/4,100);
  canvasContext.fillText(player2Score,canvas.width * 3/4,100);
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
