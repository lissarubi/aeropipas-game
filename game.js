//Sprite creation
//Click to create a new pipa with random speed

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

var pipa;
var GRAVITY = 1;
var JUMP = 15;
var speedFromChangedDirection = 2;
var angles = [
  '0',
  '45',
  '90',
  '135',
  '180',
  '225',
  '270',
  '315'
]
var pipaAngleIndex = 0

function setup() {
  createCanvas(1600, 1600);

  pipaImg = loadImage('assets/pipa.png')
  pipa = createSprite(300, 1000)
  pipa.addImage(pipaImg)
  pipa.rotateToDirection = true
  changePipaDirection(pipa)

  setInterval(() => {
    changePipaDirection(pipa)
  }, 4000)
}

function changePipaDirection(pipa){
    pipaAngleIndex = Math.floor(Math.random() * angles.length)
    angle = angles[pipaAngleIndex];
    
    speedFromChangedDirection = getRandomArbitrary(2, 4);
    console.log(angle, speedFromChangedDirection)
    pipa.setSpeed(speedFromChangedDirection, angle);
}

function draw() {
  background(200, 200, 200);

  fill(0);
  drawSprites()

  if (!keyDown('d')){

    console.log(speedFromChangedDirection)
    pipa.setSpeed(speedFromChangedDirection, angles[pipaAngleIndex])
  }

  if(keyDown('w')){
    pipa.position.y -= 5
  }

  else if(keyDown('s')){
    pipa.position.y += 5
  }

  else if(keyDown('a')){
    pipa.position.x -= 5
  }

  else if(keyDown('d')){
    speed = pipa.getSpeed()
    console.log(speed)
    pipa.setSpeed(0.4, angles[pipaAngleIndex])
    if (pipaAngleIndex == angles.length){
      pipaAngleIndex = 0
    }
    else{
      pipaAngleIndex++
    }
  }
}

