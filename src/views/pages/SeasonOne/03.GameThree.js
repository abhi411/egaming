import React from "react";
import { useEffect, useState, useRef, useContext } from "react";
import { PlayerContext } from "util/PlayerContext";
import "./breakout.css"
import "./breakout.js"
import {GlobalScore,setGlobalScore} from '../../components/GlobalScore';
import { updatePlayerDatabase,updatePlayerDatabaseBefore } from "util/interactions-game";

const GameFour = (props) => {
  // This is the ID of the current player so we can pass it to the DB later
  const [activePlayer, setActivePlayer] = useContext(PlayerContext);
   const [ruleshow, setruleshow] = useState(true)
  const canvasRef = useRef(null);
  // const [playerScore, setPlayerScore] = useState("0");

  // Update the DB with the score. Move this wherever it needs to go.
  // updatePlayerDatabase(activePlayer.playerID, playerScore);


useEffect(() => {
  const rulesBtn = document.getElementById('rules-btn');
  const closeBtn = document.getElementById('close-btn');
  const rules = document.getElementById('rules');
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  
  let score = 0;
  updatePlayerDatabaseBefore()
  const brickRowCount = 9;
  const brickColumnCount = 5;
  const delay = 500; //delay to reset the game
  
  // Create ball props
  const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4,
    visible: true
  };
  
  // Create paddle props
  const paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0,
    visible: true
  };
  
  // Create brick props
  const brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
  };
  
  // Create bricks
  const bricks = [];
  for (let i = 0; i < brickRowCount; i++) {
    bricks[i] = [];
    for (let j = 0; j < brickColumnCount; j++) {
      const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
      const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
      bricks[i][j] = { x, y, ...brickInfo };
    }
  }
  
  // Draw ball on canvas
  function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fillStyle = ball.visible ? '#ed1b76' : 'transparent';
    ctx.fill();
    ctx.closePath();
  }
  
  // Draw paddle on canvas
  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = paddle.visible ? '#ed1b76' : 'transparent';
    ctx.fill();
    ctx.closePath();
  }
  
  // Draw score on canvas
  function drawScore() {
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
  }
  
  // Draw bricks on canvas
  function drawBricks() {
    bricks.forEach(column => {
      column.forEach(brick => {
        ctx.beginPath();
        ctx.rect(brick.x, brick.y, brick.w, brick.h);
        ctx.fillStyle = brick.visible ? '#ed1b76' : 'transparent';
        ctx.fill();
        ctx.closePath();
      });
    });
  }
  
  // Move paddle on canvas
  function movePaddle() {
    paddle.x += paddle.dx;
  
    // Wall detection
    if (paddle.x + paddle.w > canvas.width) {
      paddle.x = canvas.width - paddle.w;
    }
  
    if (paddle.x < 0) {
      paddle.x = 0;
      }
  }
  
  // Move ball on canvas
  function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;
  
    // Wall collision (right/left)
    if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
      ball.dx *= -1; // ball.dx = ball.dx * -1
    }
  
    // Wall collision (top/bottom)
    if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
      ball.dy *= -1;
    }
  
    // console.log(ball.x, ball.y);
  
    // Paddle collision
    if (
      ball.x - ball.size > paddle.x &&
      ball.x + ball.size < paddle.x + paddle.w &&
      ball.y + ball.size > paddle.y
    ) {
      ball.dy = -ball.speed;
    }
  
    // Brick collision
    bricks.forEach(column => {
      column.forEach(brick => {
        if (brick.visible) {
          if (
            ball.x - ball.size > brick.x && // left brick side check
            ball.x + ball.size < brick.x + brick.w && // right brick side check
            ball.y + ball.size > brick.y && // top brick side check
            ball.y - ball.size < brick.y + brick.h // bottom brick side check
          ) {
            ball.dy *= -1;
            brick.visible = false;
  
            increaseScore();
          }
        }
      });
    });
  
    // Hit bottom wall - Lose
    if (ball.y + ball.size > canvas.height) {
      showAllBricks();
      score = 0;
    }
  }
  
  // Increase score
  function increaseScore() {
    score++;
    setGlobalScore(score)
    if (score % (brickRowCount * brickColumnCount) === 0) {
  
        ball.visible = false;
        paddle.visible = false;
  
        //After 0.5 sec restart the game
        setTimeout(function () {
            showAllBricks();
            score = 0;
            setGlobalScore(score)
            paddle.x = canvas.width / 2 - 40;
            paddle.y = canvas.height - 20;
            ball.x = canvas.width / 2;
            ball.y = canvas.height / 2;
            ball.visible = true;
            paddle.visible = true;
        },delay)
    }
  }
  
  // Make all bricks appear
  function showAllBricks() {
    bricks.forEach(column => {
      column.forEach(brick => (brick.visible = true));
    });
  }
  
  // Draw everything
  function draw() {
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    drawBall();
    drawPaddle();
    drawScore();
    drawBricks();
  }
  
  // Update canvas drawing and animation
  function update() {
    movePaddle();
    moveBall();
  
    // Draw everything
    draw();
  
    requestAnimationFrame(update);
  }
  
  update();
  
  // Keydown event
  function keyDown(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      paddle.dx = paddle.speed;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      paddle.dx = -paddle.speed;
    }
  }
  
  // Keyup event
  function keyUp(e) {
    if (
      e.key === 'Right' ||
      e.key === 'ArrowRight' ||
      e.key === 'Left' ||
      e.key === 'ArrowLeft'
    ) {
      paddle.dx = 0;
    }
  }
  
  // Keyboard event handlers
  document.addEventListener('keydown', keyDown);
  document.addEventListener('keyup', keyUp);
  
  // Rules and close event handlers
  // rulesBtn.addEventListener('click', () => {
  //   console.log("rulevar",ruleshow)
  //   if(ruleshow){
  //     rules.classList.add('show')
  //   } else{
  //     rules.classList.remove('show')
  //   }
  // });
  // closeBtn.addEventListener('click', () => {  alert(`Game Over.`);
  // showAllBricks();
  //     score = 0;});
},[])

function displayrule(){
  const rulesBtn = document.getElementById('rules-btn');
  const rules = document.getElementById('rules');

  if(ruleshow){
    rules.classList.add('show')
  } else{
    rules.classList.remove('show')
  }
 setruleshow(!ruleshow)
}
function onGameOver() {

}
  return (
     <div style={{height: '100%'}}>
       <GlobalScore game="Breakout Game" score="10"/>

        <div id="rules" class="rules">
        <h2>How To Play:</h2>
        <p>
          Use your right and left keys to move the paddle to bounce the ball up
          and break the blocks.
        </p>
        <p>If you miss the ball, your score and the blocks will reset.</p>
       
        </div>
        <div class="div-center">
          <canvas style={{width:"60%",height:"100%"}} width="800" height="500" ref={canvasRef} id="canvas"></canvas>
        </div>
        <div className="btn-c-one">
         
            <span  className="button button__cta" onClick={ () =>displayrule(!ruleshow)} >{ ruleshow?"Open Rules" : "Close Rules"} </span>
            
          
            {/* <button className="button button__cta"  id="close-btn">End Game</button> */}

        </div>
      </div>
    )
  }

export default GameFour;