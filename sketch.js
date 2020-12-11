
var monkey , monkey_running
var banana ,bananaImage, obstacleImage
var FoodGroup, obstacleGroup,bananaGroup
var score
var jungle , jungleimage

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  jungleimage = loadImage("jungle.jpg");
 
}



function setup() {
  
  createCanvas(400, 200);
  
 monkey = createSprite(50,150,20,50);
 monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(250,190,600,20);
  ground.x = ground.width /2;
  ground.velocityX = -3
  
  jungle = createSprite(200,100,2000,400)
  jungle.addImage(jungleimage);
  jungle.scale = 0.5
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  
  score = 0
  
}


function draw() {

  background(600);
  
  if (ground.x < 600){
      ground.x = ground.width/2;
  }
  
   monkey.collide(ground)
  
  if(keyDown("space")&& monkey.y >= 140) {
        monkey.velocityY = -13;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8
  
 spawnbanana();
 spawnobstacle();
  
  if(obstacleGroup.isTouching(monkey)){
    monkey.scale = 0.1
    obstacleGroup.setLifetimeEach(0)
    bananaGroup.setLifetimeEach(0)
  }
  
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.setLifetimeEach(0);
    score = score+1;
  }
  
  switch(score){
    case 10: monkey.scale = 0.105
      break;
      
     case 20: monkey.scale = 0.11
      break;
      
      case 30: monkey.scale = 0.115
      break;
      
      case 40: monkey.scale = 0.12
      break;
      
      default: break
  }
  
  drawSprites();
  
  //text(mouseX+ "," +mouseY , 300,20);
  
  fill("black")
  text("SCORE: "+ score, 300,50);
  
}

function spawnbanana() {
  //write code here to spawn the clouds
  if (frameCount % 200 === 0) {
     banana = createSprite(600,100,40,10);
    banana.y = Math.round(random(30,60));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //adding cloud to the group
   bananaGroup.add(banana);
    }
}

function spawnobstacle() {
  //write code here to spawn the clouds
  if (frameCount % 120 === 0) {
     obstacle = createSprite(600,155,30,0);
     obstacle.addImage(obstacleImage);
    obstacle.scale = 0.14;
    obstacle.velocityX = -5;
    
    obstacle.setCollider("circle",0,0,150)
    
    //obstacle.debug = true
    
     //assign lifetime to the variable
    obstacle.lifetime = 200;
    
    //adjust the depth
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //adding cloud to the group
   obstacleGroup.add(obstacle);
    }
}

