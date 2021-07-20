
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var ground, stopper
var score=0;

function preload(){
  
  
monkey_running =  loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
createCanvas(600,300);  

  ground=createSprite(300,300,700,70);
  ground.shapeColor="rgb(100,300,0)"
  
  monkey=createSprite(100,250);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
  banana=createSprite(800,150,20,50);
  banana.addImage(bananaImage);
  banana.scale=0.1;
  
  bananaG = new Group();
  obstacleG = new Group();
  
  obstacle=createSprite(900,250);
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.2;
  
  stopper = createSprite(100,220,200,50);
  stopper.shapeColor="rgb(20,150,300)";
  stopper.depth=-2;
  
  score=0;
}


function draw() {
background("rgb(20,150,300)");
  fill("black");
  textSize(25);
  text("Points: "+ score, 450,50);
  
  text("Survival Time: ", 50,50);
  text(Math.round(World.frameCount/10), 220, 50);  
  
  
  
  if(keyDown("space") && monkey.y >= 230) {
      monkey.velocityY = -25;
    }
    monkey.velocityY = monkey.velocityY + 1.6
  
  
  if (World.frameCount%80===0){
    spawnBanana1()
    spawnObstacles()
  }
   
  if (monkey.isTouching(bananaG)) {
    bananaG.destroyEach();
    score=score+3;
  }
  
  if (obstacleG.isTouching(monkey)) {
    bananaG.destroyEach();
    bananaG.velocityX=5;
    obstacleG.setLifetimeEach(-1);
    obstacleG.setVelocityXEach(0);
    obstacleG.setVelocityYEach(0);
    textSize(40);
    text("YOU LOSE", 250,150);
    monkey.collide(stopper);
  }
  
  monkey.setCollider("rectangle", 0, 0, 10, 500, -45);
  obstacleG.setColliderEach("rectangle", 0, 0, 900, 100, -45);
  monkey.collide(ground);
  obstacleG.collide(monkey);
  
  drawSprites();
}


function spawnBanana1() {
  var banana1 = createSprite(700,100,20,50);
  banana1.x = Math.round(random(650,800));
  banana1.y = Math.round(random(80,120));
  banana1.addImage(bananaImage)
  banana1.scale=0.08;
  banana1.velocityX=-5;
  banana1.velocityX = -(6 + 3*score/10);
  bananaG.add(banana1)
}


function spawnObstacles() { 
  var obstacle = createSprite(2500,250,20,50);
  obstacle.x = Math.round(random(2000,3000));
  obstacle.y = Math.round(random(240,250));
  obstacle.addImage(obstacleImage)
  obstacle.scale=0.2;
  obstacle.velocityX=-5;
  obstacle.velocityX = -(6 + 3*score/10);
  obstacleG.add(obstacle)
}

