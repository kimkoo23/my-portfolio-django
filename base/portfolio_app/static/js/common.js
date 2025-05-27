document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const stage = new createjs.Stage(canvas);

  // 캔버스 사이즈를 전체 창으로
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", () => {
    resizeCanvas();
    stage.update();
  });

  const spriteData = {
    images: [walkImg],  // Django 템플릿에서 전달된 static 경로
    frames: {
      width: 500,
      height: 310,
      count: 3
    },
    animations: {
      walk: [0, 2, "walk", 0.2]
    }
  };

  const spriteSheet = new createjs.SpriteSheet(spriteData);
  const character = new createjs.Sprite(spriteSheet, "walk");

  // 중앙 정렬
  character.regX = 256;
  character.regY = 158;
  character.x = canvas.width / 2;
  character.y = canvas.height / 2;

  // 크기 조절 (선택)
  character.scaleX = 1;
  character.scaleY = 1;

  stage.addChild(character);

  // 캐릭터를 좌우로 왔다 갔다 움직이게
  createjs.Tween.get(character, { loop: true })
    .to({ x: canvas.width - 100 }, 2000)
    .to({ x: 100 }, 2000);

  createjs.Ticker.framerate = 60;
  createjs.Ticker.addEventListener("tick", stage);
});
