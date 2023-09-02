// Game Board
var board;
var blocksize = 30;  //size of one single box
var rows = 20;
var cols = 20;
var context; 

// Food
var foodlocx;
var foodlocy;
var apple = document.getElementById("apple");

// snake
var snakex = blocksize*5; 
var snakey = blocksize*5;
var velocityx = 0;
var velocityy = 0;

// Snake Body
var snakebody = [];

var Score = 0;
var dispScore = document.getElementById("score").innerText;

var replay = document.getElementById("replay-btn");

window.onload = function(rep){
    board= document.getElementById("game-board");
    board.height = rows * blocksize;
    board.width = cols * blocksize;
    context = board.getContext('2d');  // Used to draw on canvas or board
    food(); // create an image of food
    setInterval(update, 100); //100 millisec
}

// where to draw on canvas
function update(){
    // Draw Playground
    context.fillStyle = "black";
    context.fillRect(0,0,board.height,board.width);

    // Draw Food
    // context.fillStyle = "red";
    // context.fillRect(foodlocx,foodlocy,blocksize,blocksize);
    context.drawImage(apple,foodlocx,foodlocy,blocksize,blocksize);

    // Draw snake head
    context.fillStyle = "lime";
    snakex += velocityx;    //To make snake head move
    snakey += velocityy;    //To make snake haed move
    context.fillRect(snakex,snakey,blocksize,blocksize);
    document.addEventListener("keyup", changeDir);  //When should snake move and where

    // To check if snake collided with the food or not
    if(foodlocx == snakex && foodlocy == snakey){
        snakebody.push([foodlocx,foodlocy]); // to get loc of the food
        Score += 1;
        document.getElementById("score").innerHTML = dispScore.replace('0',Score);
        food();
    }
    

    // to draw the body part where the snake collided with food
    for (let i = 0; i < snakebody.length; i++) {
        context.fillRect(snakebody[i][0],snakebody[i][1],blocksize,blocksize);
    }

    // making head of the snake 1st element of snakebody
    if(snakebody){
        snakebody[0] = [snakex,snakey];
    }

    // making whole snake move
    // by making each part to move up to the part in front of it
    for (let j = snakebody.length-1; j >0; j--) {
        snakebody[j] = snakebody[j-1];
    } 

    //game over conditions
    if (snakex < 0 || snakex > cols*blocksize || snakey < 0 || snakey > rows*blocksize) {
        // gameOver = true;
        // alert("Game Over");
        gameOver();
    }

    // for (let i = 0; i < snakebody.length; i++) {
    //     if (snakex == snakebody[i-1][0] && snakey == snakebody[i-1][1]) {
    //         alert(snakebody[i-1][0]);
    //     }
    // }
}

// how to create an image if food
function food(){
    foodlocx = Math.floor(Math.random()*cols)*blocksize;
    foodlocy = Math.floor(Math.random()*rows)*blocksize;
}

// How should the snake move (with keyboard)
function changeDir(e){
    if(e.code == "ArrowUp" && velocityy != blocksize){
        velocityx = 0;
        velocityy = -blocksize;
    }
    else if(e.code == "ArrowDown" && velocityy != -blocksize){
        velocityx = 0;
        velocityy = blocksize;
    }
    else if(e.code == "ArrowLeft" && velocityx != blocksize){
        velocityx = -blocksize;
        velocityy = 0;
    }
    else if(e.code == "ArrowRight" && velocityx != -blocksize){
        velocityx = blocksize;
        velocityy = 0;
    }
}

function gameOver(){
    context.fillStyle = "White";
    context.font = "70px serif";
    context.fillText("Game Over",5*blocksize,10*blocksize);
}

replay.addEventListener("click",function(){
    window.location.reload();
});

