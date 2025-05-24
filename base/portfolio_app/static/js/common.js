document.addEventListener("DOMContentLoaded", () => {
  const stage = new createjs.Stage("canvas");

  const queue = new createjs.LoadQueue();
  queue.loadFile({ id: "walk", src: walkImg });
  queue.on("complete", handleComplete);

  function handleComplete() {
    const image = queue.getResult("walk");
    const character = new createjs.Bitmap(image);

    character.x = 0;
    character.y = 100;

    stage.addChild(character);

    createjs.Tween.get(character, { loop: true })
      .to({ x: 600 }, 2000)
      .to({ x: 0 }, 2000);

    createjs.Ticker.framerate = 60;
    createjs.Ticker.addEventListener("tick", stage);
  }
});
