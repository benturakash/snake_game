/*
to do list:
add window event listner
complete eat function
complete rondom position of food
complete score upate 
complete reset play and stop button
*/
const gameBoard=document.querySelector("#gameBoard");
const ctx=gameBoard.getContext("2d");
const stop =document.querySelector("#stop-btn");
const reset=document.querySelector("#reset-btn");
const play=document.querySelector("#play-btn");
const scoreText=document.querySelector("#score");
const gameWidth=gameBoard.width;
const gameHeight=gameBoard.height;
const snakeBorder="black";
const snakeColor="pink";
const foodColor="yellow";
const foodBorder="black";
let running = false;
let unitsize=15;
let xVelocity=unitsize;
let yVelocity=0;
let foodX;
let foodY;
let score=0;

let snake=[
{x:unitsize*4,y:0},
{x:unitsize*3,y:0},
{x:unitsize*2,y:0},
{x:unitsize,y:0},
{x:0,y:0}
];
let food={
    Width:"15",
    Height:"15" 
}
window.addEventListener("keydown",changeDirection);
reset.addEventListener("click",resetGame);
play.addEventListener("click",startStart);



function startStart()
{
    gameStart();
};

function gameStart(){
running=true;
scoreText.textContent=score;
moveFood();
drawFood();
nextTick();
};

function nextTick(){
    if(running){
        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        },75);
    }else {
        displayGameOver();
    }
};

function clearBoard(){
    ctx.fillStyle="white";
    ctx.fillRect(0,0,gameWidth,gameHeight);
};

function moveFood(){
    function randomFood(min,max)
    {
        const randNum=Math.round((Math.random()*(max-min)+min)/unitsize)*unitsize;
        return randNum;
    }
    foodX=randomFood(0,gameWidth-unitsize);
    foodY=randomFood(0,gameWidth-unitsize);

};

function drawFood(){
    
    ctx.strokeStyle=snakeBorder;
    ctx.fillStyle=foodColor;
    ctx.fillRect(foodX,foodY,food.Width,food.Height);
    ctx.strokeRect(foodX,foodY,food.Width,food.Height);
};

function moveSnake(){
    const head={x: snake[0].x + xVelocity,
                y: snake[0].y + yVelocity};
                snake.unshift(head);
    if(snake[0].x==foodX && snake[0].y==foodY){
        score+=1;
        scoreText.textContent=score;
        moveFood();
    }else{
        snake.pop();
    }
};

function drawSnake(){
    ctx.strokeStyle=snakeBorder;
    ctx.fillStyle=snakeColor;
    snake.forEach(snakePart=>{
        ctx.fillRect(snakePart.x,snakePart.y,unitsize,unitsize);
        ctx.strokeRect(snakePart.x,snakePart.y,unitsize,unitsize);})
};

function changeDirection(event){
    const keyPressed=event.keyCode;
    const left=37;
    const up=38;
    const right=39;
    const down=40;

    const goingUp =(yVelocity==-unitsize);
    const goingDown=(yVelocity==unitsize);
    const goingRight=(xVelocity==unitsize);
    const goingLeft=(xVelocity==-unitsize);

    switch(true)
    {
        case(keyPressed==left && !goingRight):
        xVelocity=-unitsize;
        yVelocity=0;
        break;

        case(keyPressed==up && !goingDown):
        yVelocity=-unitsize;
        xVelocity=0;
        break;

        case(keyPressed==right && !goingLeft):
        xVelocity=unitsize;
        yVelocity=0;
        break;

        case(keyPressed==down && !goingUp):
        yVelocity=unitsize;
        xVelocity=0;
        break;

    }
};

function checkGameOver(){
    switch(true){
        case(snake[0].x<0):
        running=false;
        break;
        case(snake[0].x>=gameWidth):
        running=false;
        break;
        case(snake[0].y<0):
        running=false;
        break;
        case(snake[0].y>=gameHeight):
        running=false;
        break;
    }
    for(let i=1;i<snake.length;i+=1)
    {
        if(snake[i].x==snake[0].x && snake[i].y==snake[0].y)
        {
            running=false;
        }
    }
};

function displayGameOver(){
    ctx.font="50px Lucida Grande";
    ctx.fillStyle="black";
    ctx.textAlign="center";
    ctx.fillText("Game Over!!",gameWidth/2,gameHeight/2);
    running=false;
};

function resetGame(){
score=0;
xVelocity=unitsize;
yVelocity=0;
snake=[
    {x:unitsize*4,y:0},
    {x:unitsize*3,y:0},
    {x:unitsize*2,y:0},
    {x:unitsize,y:0},
    {x:0,y:0}
    ];
    gameStart();
};