var gamePiece;
var gameObstacle = [];
var gameScore;



function startGame(){
    gamePiece = new component(10 , 120 , 40 , 40 , "red");
    gameScore = new component (280, 40, "30px", "Consolas", "black", "text");
    // gameObstacle = new component(300, 0, 15, 300, "green");
    gameArea.start();
}

var gameArea = {
    canvas : document.getElementById('canvas'),
    start : function(){
        this.canvas.width =800;
        this.canvas.height =450;
        // this.canvas.style.cursor = "none";
        this.context = this.canvas.getContext('2d');
        this.interval = setInterval(updateGameArea,50);
        this.key;
        this.frameNo = 0;
        window.addEventListener('keydown', function(e){
            gameArea.key = (gameArea.key || [])
            gameArea.key[e.keyCode] = true;
        });
        window.addEventListener('keyup', function(e){
            gameArea.key[e.keyCode] = false;
        });
        // window.addEventListener('mousemove' , function(e){
        //     gamePiece.x = e.pageX;
        //     gamePiece.y = e.pageY;
        // })
    },
    clear : function(){
        this.context.clearRect(0 , 0, this.canvas.width, this.canvas.height)
    },
    stop : function(){
        clearInterval(this.interval);
    }
}

function component  (x, y, width, height, color, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.update = function(){
    ctx = gameArea.context;
    // ctx.stroke();
        if(this.type === "text"){
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        }
        else{
            ctx.fillStyle = color;
            ctx.fillRect(this.x , this.y , this.width , this.height);    
        }
    };  
    this.newPos = function(){
        gamePiece.x += this.speedX;
        gamePiece.y += this.speedY;
    };
    this.crashWith = function(otherObj){
        var myLeft = this.x;
        var myRight = this.x + (this.width);
        var myTop = this.y;
        var myBottom = this.y + (this.height);
        var otherLeft = otherObj.x;
        var otherRight = otherObj.x + (otherObj.width);
        var otherTop = otherObj.y;
        var otherBottom = otherObj.y + (otherObj.height);
        var crash = true;
        if((myRight < otherLeft) || (myTop > otherBottom) || (myBottom < otherTop) || (myLeft >  otherRight))
            {
                crash = false;
            }
        return crash;
    };
}


function everyInterval(n){
    if((gameArea.frameNo / n) % 1 == 0){
        return true;
    }
    return false;
}


function updateGameArea(){
    var x, height, minHeight, maxHeight, minGap, maxGap, gap;
    for(var i=0; i<gameObstacle.length; i+=1){
    if(gamePiece.crashWith(gameObstacle[i]))
        { 
            gameArea.stop();
            return;
        }
    }
    gameArea.clear();   
    arrowKey();
    gameArea.frameNo += 1;
    if( gameArea.frameNo == 1 || everyInterval(150)){
        minHeight = 20;
        maxHeight = 300;
        height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
        minGap = 50;
        maxGap = 200;
        x = gameArea.canvas.width;
        gap = Math.floor(Math.random()*(maxGap - minGap + 1)+minGap);
        gameObstacle.push(new component(x, 0, 15, height, "green"));
        gameObstacle.push(new component(x, height + gap, 15, x-height-gap, "green" ))
    }   
    for(var i=0; i<gameObstacle.length; i+=1){
        gameObstacle[i].update();
        gameObstacle[i].x += -2;
    }
    gameScore.text = "SCORE: " + gameArea.frameNo;
    gameScore.update();
    gamePiece.newPos();
    gamePiece.update();
   
} 

function arrowKey(){
     stopMove();
     if(gameArea.key && gameArea.key[37])
     moveLeft();
     if(gameArea.key && gameArea.key[38])
         moveUp();
     if(gameArea.key && gameArea.key[39])
         moveRight();
     if(gameArea.key && gameArea.key[40])
             moveDown();
}

function moveUp(){
    gamePiece.speedY += -2;
}
function moveDown(){
    gamePiece.speedY += +2;
}
function moveLeft(){
    gamePiece.speedX += -2;
}
function moveRight(){
    gamePiece.speedX += +2;
}
function stopMove(){
    gamePiece.speedY = 0;
    gamePiece.speedX = 0;
}
