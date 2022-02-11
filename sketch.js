var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost=createSprite(200,200,50,50)
  ghost.addImage("ghostrider",ghostImg)
  ghost.scale=0.3
  
  doorGroup=new Group()
  climberGroup=new Group()
  blockGroup=new Group()

  spookySound.loop()
  
}

function draw() {
  
  background(0);
  if (gameState==="play"){
    if(keyDown("left")){
     ghost.x -=3
    }
    if(keyDown("right")){
      ghost.x +=3
     }
     if(keyDown("space")){
      ghost.velocityY=-10
     }
     ghost.velocityY +=0.8
  
  if(tower.y > 400){
      tower.y = 300
    }
    if(ghost.y>600 || ghost.isTouching(blockGroup)){
      gameState="end"
    }
    spawndoor()
    if(ghost.isTouching(climberGroup)){
      ghost.velocityY=0
    }
    drawSprites();
  }
   if(gameState==="end"){
    textSize(35)
    fill("yellow")
    text("Game Over",210,300)
   }
}
function spawndoor(){
if(frameCount%240===0){
  door=createSprite(200,-50)
  climber=createSprite(200,10)
  block=createSprite(200,5)
  block.width=climber.width
  block.height=2
  block.debug=true 
  door.x=Math.round(random(100,500))
  climber.x=door.x
  block.x=door.x
  door.addImage(doorImg)
  climber.addImage(climberImg)
  door.lifetime=700
  climber.lifetime=700
  block.lifetime=700
  door.velocityY=1
  climber.velocityY=1
  block.velocityY=1
  ghost.depth=door.depth
  ghost.depth +=1
  doorGroup.add(door)
  climberGroup.add(climber)
  blockGroup.add(block)
}
}
