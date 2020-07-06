//Global Variables
var monkey, Banana, stone, back;
var monkey_Animation, monkey_collided, Banana_image, stone_image, back_image;
var bananaGroup, stoneGroup;
var invisibleGround;
var count;
var gameState, PLAY, END;
var gameOver, restart, gameOver_image, restart_image;


function preload() {
  back_image = loadImage("jungle.jpg");

  monkey_Animation = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  Banana_image = loadImage("Banana.png");

  stone_image = loadImage("stone.png");

  monkey_collided = loadAnimation("Monkey_01.png");

  gameOver_image = loadImage("gameOver.png");

  restart_image = loadImage("restart.png");
  
}


function setup() {
  createCanvas(600, 300);
  background(255);


  back = createSprite(300, 70);
  back.addImage(back_image);
  back.scale = 1;
  back.velocityX= -2;

  monkey = createSprite(50, 250);
  monkey.addAnimation("moving", monkey_Animation);
  monkey.addAnimation("collided", monkey_collided);
  monkey.scale = 0.10;

  
  invisibleGround = createSprite(300, 295, 1200, 10);

  count = 0;

  bananaGroup = new Group();

  stoneGroup = new Group();

  PLAY = 1;

  END = 0;

  gameState = PLAY;

  gameOver = createSprite(300, 240);
  gameOver.addImage(gameOver_image);
  gameOver.scale=0.5;

  restart = createSprite(300, 270);
  restart.addImage(restart_image);
  restart.scale=0.5;
}


function draw() {
  
  invisibleGround.visible = false;
  gameOver.visible = false;
  restart.visible = false;

  monkey.collide(invisibleGround);



  if (gameState === PLAY) {

    if(back.x<100){
      back.x=back.width/2;
    }
    makeBanana();
    makeStone();

    if (monkey.isTouching(bananaGroup)) {
      count = count + 2;
      bananaGroup.destroyEach();
    }

    switch (count) {

      case 10:
        monkey.scale = 0.12;
        break;
      case 20:
        monkey.scale = 0.14;
        break;
      case 30:
        monkey.scale = 0.14;
        break;
      case 40:
        monkey.scale = 0.16;
        break;
      default:
        break;
    }

  
      
    }
    
    if (keyDown("space") && monkey.y > 240) {
      monkey.velocityY = -15;
    }
    monkey.velocityY = monkey.velocityY + 0.75;


    if (stoneGroup.collide(monkey)) {
      stoneGroup.setVelocityXEach = 0;
      gameState = END;
      stoneGroup.collide(invisibleGround);
    }
  
  if (gameState === END) {
    stoneGroup.setVelocityXEach = 0;
    bananaGroup.setVelocityXEach= 0;
    stoneGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    monkey.scale = 0.10;
    monkey.changeAnimation("collided", monkey_collided);
    gameOver.visible = true;
    restart.visible = true;
    back.x=300;
    back.velocityX=0;

    if (mousePressedOver(restart)) {
      reset();
    }
  }

  drawSprites();

  if (count >= 40) {

    stroke("white");
    textSize(20);
    fill("white");
    text("YOU HAVE BECOME AN ADULT!", 100, 50);


  }
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + count, 500, 50);
}
function makeBanana() {
  if (frameCount % 60 === 0) {
    Banana = createSprite(650, 150);
    Banana.addImage(Banana_image);
    Banana.scale = 0.05;
    Banana.velocityX = -5;
    Banana.y = random(100, 200);
    bananaGroup.add(Banana);
    bananaGroup.setLifetimeEach(650);

  }
}

function makeStone() {
  if (frameCount % 200 === 0) {
    stone = createSprite(650, 250);
    stone.addImage(stone_image);
    stone.scale = 0.20;
    stone.velocityX = -7;
    stoneGroup.add(stone);
    stoneGroup.setLifetimeEach(650);

  }
 }
function reset() {
  gameState = PLAY;
  monkey.changeAnimation("moving",monkey_Animation);
  gameOver.visible = false;
  restart.visible = false;
  count=0;
  bananaGroup.destroyEach();
  stoneGroup.destroyEach();
  back.velocityX=-3;
  
  
  
  
}