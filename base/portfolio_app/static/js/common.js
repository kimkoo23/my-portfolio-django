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

  // 중앙 정렬
  character.regX = 256;
  character.regY = 158;
  character.x = canvas.width / 2;
  character.y = canvas.height / 2;

  // 크기 조절 
  character.scaleX = 0.5;
  character.scaleY = 0.5;

  stage.addChild(background);
  stage.addChild(character);

  createjs.Ticker.framerate = 30;
  createjs.Ticker.addEventListener("tick", () => {
    moveCharacter();     // 입력 반영
    stage.update();      // 화면 그리기
  });

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
    character.x =  canvas.width / 2;
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

  canvas.addEventListener("mousedown", startWalking);
  canvas.addEventListener("mouseup", stopWalking);

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
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
