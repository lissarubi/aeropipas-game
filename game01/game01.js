function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
var MENU = 0;
var pipa;
var passedMenu = false;
var pipa01img;
var pipa02img;
var DKeyPossible = true;

var pipa01 = "https://raw.githubusercontent.com/edersonferreira/aeropipas-game/main/assets/pipa01.png";
var pipa02 = "https://raw.githubusercontent.com/edersonferreira/aeropipas-game/main/assets/pipa02.png";
var pipa03 = "https://raw.githubusercontent.com/edersonferreira/aeropipas-game/main/assets/pipa03.png";
var pipa04 = "https://raw.githubusercontent.com/edersonferreira/aeropipas-game/main/assets/pipa04.png";
var pipa05 = "https://raw.githubusercontent.com/edersonferreira/aeropipas-game/main/assets/pipa05.png";
var pipa06 = "https://raw.githubusercontent.com/edersonferreira/aeropipas-game/main/assets/pipa06.png";
var pipa07 = "https://raw.githubusercontent.com/edersonferreira/aeropipas-game/main/assets/pipa07.png";
var pipa08 = "https://raw.githubusercontent.com/edersonferreira/aeropipas-game/main/assets/pipa08.png";
var pipa09 = "https://raw.githubusercontent.com/edersonferreira/aeropipas-game/main/assets/pipa09.png";

var speedFromChangedDirection = 2;
var angles = ["0", "45", "90", "135", "180", "225", "270", "315"];
var pipaAngleIndex = 0;

function setup() {
  createCanvas(700, 700);

  pipa01img = createImg(pipa01);
  pipa01img.position(19, 39);

  pipa02img = createImg(pipa02);
  pipa02img.position(200, 39);

  pipa03img = createImg(pipa03);
  pipa03img.position(381, 39);

  pipa04img = createImg(pipa04);
  pipa04img.position(562, 39);

  pipa05img = createImg(pipa05);
  pipa05img.position(19, 170);

  pipa06img = createImg(pipa06);
  pipa06img.position(200, 170);

  pipa07img = createImg(pipa07);
  pipa07img.position(381, 170);

  pipa08img = createImg(pipa08);
  pipa08img.position(562, 170);

  pipa09img = createImg(pipa09);
  pipa09img.position(19, 301);
}

function changePipaDirection(pipa) {
  pipaAngleIndex = Math.floor(Math.random() * angles.length);
  angle = angles[pipaAngleIndex];

  speedFromChangedDirection = getRandomArbitrary(2, 4);
  pipa.setSpeed(speedFromChangedDirection, angle);
}

function mousePressed(e) {
  targetSrcURL = new URL(e.target.src);
  console.log(targetSrcURL.pathname);
  if (targetSrcURL.pathname.includes("assets/pipa")) {
    targetURL = targetSrcURL.pathname.replace("/edersonferreira/aeropipas-game/main/assets/", "https://raw.githubusercontent.com/edersonferreira/aeropipas-game/main/assets/")
    pipaImg = loadImage(targetURL);
    pipa = createSprite(450, 450);
    pipa.addImage(pipaImg);
    pipa.rotateToDirection = true;
    changePipaDirection(pipa);

    setInterval(() => {
      changePipaDirection(pipa);
    }, 4000);
  }

  passedMenu = true;
}

function draw() {
  background(200, 200, 200);
  fill(0);
  drawSprites();

  if (passedMenu == true) {
    pipa01img.remove();
    pipa02img.remove();
    pipa03img.remove();
    pipa04img.remove();
    pipa05img.remove();
    pipa06img.remove();
    pipa07img.remove();
    pipa08img.remove();
    pipa09img.remove();

    console.log(pipa.position.y);
    if (
      pipa.position.x >= 700 ||
      pipa.position.y >= 700 ||
      pipa.position.y <= 0 ||
      pipa.position.x <= 0
    ) {
      pipa.remove();
      alert("Você Perdeu a sua pipa!");
      window.location.reload();
    }

    if (!keyWentDown("Space")) {
      DKeyPossible = true;
      pipa.setSpeed(speedFromChangedDirection, angles[pipaAngleIndex]);
    } else if (DKeyPossible) {
      DKeyPossible = false;
      speed = pipa.getSpeed();
      pipa.setSpeed(0.4, angles[pipaAngleIndex]);
      if (pipaAngleIndex == angles.length) {
        pipaAngleIndex = 0;
      } else {
        pipaAngleIndex++;
      }
    }
  } else {
    textSize(15);
    textToSelectPipa = text("Escolha sua pipa", 300, 20);
  }
}
