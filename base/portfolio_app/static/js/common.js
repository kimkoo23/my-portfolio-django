let moving = false; let direction = null;

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const stage = new createjs.Stage(canvas);

  // 캔버스 사이즈를 전체 창으로
  function resizeCanvas() {
    canvas.width = window.innerWidth * 0.98;
    canvas.height = window.innerHeight * 0.97;
  }

  resizeCanvas();
  window.addEventListener("resize", () => {
    resizeCanvas();
    stage.update();
  });

  const spriteData = {
    images: [walkImg],  // Django 템플릿에서 전달된 static 경로
    frames: {
      width: 355,
      height: 225,
      count: 3
    },
    animations: {
      idle: [0],          // 첫 프레임 고정
      walk: [0, 2, "walk", 0.2]
    }
  };

  const spriteSheet = new createjs.SpriteSheet(spriteData);
  const character = new createjs.Sprite(spriteSheet, "idle"); // 캐릭터
  const background = new createjs.Bitmap(backImg); //배경화면
  const cloud1 = new createjs.Bitmap(cloud1Img); //구름1
  const cloud2 = new createjs.Bitmap(cloud2Img); //구름2

  // 캐릭터 정렬
  character.regX = 256;
  character.regY = 158;
  character.x = canvas.width / 2;
  character.y = canvas.height - (canvas.height / 4);
  // 구름 정렬
  cloud1.x = 50;
  cloud1.y = 0;
  cloud2.x = 0;
  cloud2.y = 150;

  // 크기 조절 
  character.scaleX = 0.5;
  character.scaleY = 0.5;
  cloud1.scaleX = 0.5;
  cloud1.scaleY = 0.5;
  cloud2.scaleX = 0.4;
  cloud2.scaleY = 0.4;

  stage.addChild(background);
  stage.addChild(character);
  stage.addChild(cloud1);
  stage.addChild(cloud2);

  createjs.Ticker.framerate = 30;
  createjs.Ticker.addEventListener("tick", () => {
    moveCharacter();     // 입력 반영
    stage.update();      // 화면 그리기
  });

  createjs.Tween.get(cloud1, { loop: true })
    .to({ x: 700 }, 20000)
    .to({ x: 0 }, 20000);

  createjs.Tween.get(cloud2, { loop: true })
    .to({ x: 700 }, 19000)
    .to({ x: 0 }, 19000);

  function moveCharacter() {
    if (!direction) return;

    if (!moving) {
      character.gotoAndPlay("walk");
      moving = true;
    }

    // 이동 속도
    const speed = .2;

    // 이동 방향 처리
    if (direction === "right") {
      character.scaleX = 0.5;
      character.x += speed;
    } else if (direction === "left") {
      character.scaleX = -0.5;
      character.x -= speed;
    }

    // 화면 중앙으로 고정
    character.x = canvas.width / 2;
  }

  function startWalking(direction) {
    if (moving) return;
    moving = true;

    character.gotoAndPlay("walk");

    // 반전 방향 처리
    if (direction === "right") {
      character.scaleX = 0.5;
    } else if (direction === "left") {
      character.scaleX = -0.5;
    }
  }

  function stopWalking() {
    createjs.Tween.removeTweens(character);
    character.gotoAndStop("idle");
    moving = false;
  }

  canvas.addEventListener("mousedown", startWalking); //  마우스 입력 시
  canvas.addEventListener("mouseup", stopWalking); // 마우스 놓을 시

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { //오른쪽 방향
      direction = "right";
    } else if (e.key === "ArrowLeft") {
      direction = "left";
    }
  });

  document.addEventListener("keyup", (e) => {
    if ((e.key === "ArrowRight" && direction === "right") ||
      (e.key === "ArrowLeft" && direction === "left")) {
      direction = null;
      character.gotoAndStop("idle");
      moving = false;
    }
  });
});
