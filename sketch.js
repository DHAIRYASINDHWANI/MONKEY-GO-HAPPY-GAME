var bg, monkey, monkeyrunning, ground, Foodgroup, bananaImg, obstaclesgroup, obstacleimg, bgimg, groundimg;
var score = 0;
var PLAY = 1;
var END = 0;
var Gamestate = "PLAY";
function preload() {
  bgimg = loadImage("jungle.jpg");

  monkeyrunning = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  bananaImg = loadImage("banana.png");
 obstacleimg = loadImage("stone.png");
  gameoverimg = loadImage("gameover img.png")
}


function setup() {
  createCanvas(400, 400);

  bg = createSprite(0, 170 );
  bg.addImage(bgimg);
  bg.x = bg.width / 2;

  ground = createSprite(400, 350, 400, 10);
  ground.x = ground.width / 2;
  ground.visible = false;

  monkey = createSprite(60, 300);
  monkey.addAnimation("monkeyrunning", monkeyrunning);
  monkey.scale = 0.1;

  score = 0;
  gameover = createSprite(200,200)
  gameover.addImage( gameoverimg);
  gameover.scale = 0.7;
  Foodgroup = createGroup();
  obstaclesgroup = createGroup();
  textSize(20);
  fill("white");
}

function draw() {
if (mousePressedOver(gameover) && Gamestate === "END") {
    reset();
}
if(Gamestate === "PLAY"){
  food();
  Obstacles();
  
  gameover.visible = false;
  if (bg.x < 100) {
    bg.x = bg.width / 2;
  }
    bg.velocityX = -5;

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
  ground.velocityX = -4;
   switch (score) {
    case 10:
      monkey.scale = 0.12;
      break;
    case 20:
      monkey.scale = 0.14;
      break;
    case 30:
      monkey.scale = 0.16;
      break;
    case 40:
      monkey.scale = 0.18;
      break;
    default:
      break;
  }
  if (keyDown("space") && monkey.y >= 240) {
    monkey.velocityY = -12;
  }
  
    monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
 if (monkey.isTouching(Foodgroup)){
    Foodgroup.destroyEach();
    score = score + 2;
  } else if (obstaclesgroup.isTouching(monkey)) {
   Gamestate = "END";
    end();
  }
}
  drawSprites();
  text("Score: " + score, 300, 30);
}

function food() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(400, random(120, 200));
    banana.addImage(bananaImg);
    banana.scale = 0.05;
    banana.velocityX = -5;
    banana.lifetime = 90;
    Foodgroup.add(banana);
  }
}

function Obstacles() {
  if (frameCount % 200 === 0) {
    var obstacle = createSprite(400, 310, 10, 40);
    obstacle.addImage(obstacleimg);
    obstacle.velocityX = -6;
    obstacle.lifetime = 300;
        obstacle.scale = 0.2;
    obstaclesgroup.add(obstacle);
  }
}

function end(){
   ground.velocityX = 0;
  bg.velocityX = 0;
  monkey.velocityX = 0;
  monkey.velocityY = 0;
  //monkey.destroy();
  obstaclesgroup.velocityX = 0;
  obstaclesgroup.destroyEach();
  Foodgroup.velocityX = 0;
 Foodgroup.destroyEach();
  gameover.visible = true;
}

function reset() {
  Gamestate = "PLAY";
  obstaclesgroup.destroyEach();
  Foodgroup.destroyEach();
  score = 0
}