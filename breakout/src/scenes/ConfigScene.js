import "phaser";
import arrowL from "../assets/images/arrowL.png";
import arrowR from "../assets/images/arrowR.png";
import rectangle from "../assets/images/rectangle.png";
import config from "../config/config";
import gameSettings from "../config/gameSettings";
import audioTest from "../assets/sounds/ball.ogg";

export default class ConfigScene extends Phaser.Scene {
  constructor() {
    super("ConfigScene");
  }

  preload() {
    this.load.image("arrowL", arrowL);
    this.load.image("arrowR", arrowR);
    this.load.image("rectangle", rectangle);
    this.load.audio("audioTest", audioTest);
  }

  create() {
    this.diffTitle = this.add
      .bitmapText(
        config.width / 2,
        config.height / 2 - 150,
        "pixelFont",
        "DIFFICULTY",
        50
      )
      .setOrigin(0.5);
    this.arrows = this.add.group();
    this.arrows.add(
      this.add.image(config.width / 2 - 100, config.height / 2 - 100, "arrowL")
    );
    this.arrows.add(
      this.add.image(config.width / 2 + 100, config.height / 2 - 100, "arrowR")
    );
    this.diffArray = ["Easy", "Normal", "Hard"];
    this.diffTxt = "";
    this.renderDiffi();

    this.voluTitle = this.add
      .bitmapText(
        config.width / 2,
        config.height / 2,
        "pixelFont",
        "VOLUME",
        50
      )
      .setOrigin(0.5);
    this.arrows.add(
      this.add.image(config.width / 2 - 154, config.height / 2 + 50, "arrowL")
    );
    this.arrows.add(
      this.add.image(config.width / 2 + 154, config.height / 2 + 50, "arrowR")
    );
    this.audioTest = this.sound.add("audioTest");
    this.rectangles = this.add.group();
    this.renderVolum();

    this.backBtn = this.add
      .bitmapText(
        config.width / 2,
        config.height / 2 + 150,
        "pixelFont",
        "SAVE AND BACK",
        50
      )
      .setOrigin(0.5);
    this.backBtn.setInteractive({ useHandCursor: true });
    this.backBtn.on("pointerup", () => this.scene.start("StartScene"), this);

    for (let i = 0; i < this.arrows.children.entries.length; i++) {
      this.arrows.children.entries[i].setInteractive({ useHandCursor: true });
    }
    this.input.on("pointerover", this.pointerOver, this);
    this.input.on("pointerout", this.pointerOut, this);
    this.arrows.children.entries[0].on("pointerup", this.decreaseDiffi, this);
    this.arrows.children.entries[1].on("pointerup", this.increaseDiffi, this);
    this.arrows.children.entries[2].on("pointerup", this.decreaseVolum, this);
    this.arrows.children.entries[3].on("pointerup", this.increaseVolum, this);
  }

  pointerOver(pointer, gameObject) {
    gameObject[0].setScale(1.1, 1.1);
  }

  pointerOut(pointer, gameObject) {
    gameObject[0].setScale(1, 1);
  }

  renderVolum() {
    this.rectangles.clear(true, true);
    for (
      let i = 0, j = -126;
      i < gameSettings.sound.volume * 10;
      i++, j += 28
    ) {
      this.rectangles.add(
        this.add.image(
          config.width / 2 + j,
          config.height / 2 + 50,
          "rectangle"
        )
      );
    }
  }

  increaseVolum() {
    if (gameSettings.sound.volume < 1) {
      gameSettings.sound.volume = (gameSettings.sound.volume * 10 + 1) / 10;
      this.renderVolum();
    }
    this.audioTest.play(gameSettings.sound);
  }

  decreaseVolum() {
    if (gameSettings.sound.volume > 0) {
      gameSettings.sound.volume = (gameSettings.sound.volume * 10 - 1) / 10;
      this.renderVolum();
    }
    this.audioTest.play(gameSettings.sound);
  }

  renderDiffi() {
    if (this.diffTxt !== "") this.diffTxt.destroy();
    this.diffTxt = this.add
      .bitmapText(
        config.width / 2,
        config.height / 2 - 96,
        "pixelFont",
        this.diffArray[gameSettings.difficulty],
        46
      )
      .setOrigin(0.5, 0.5);
    if (gameSettings.difficulty == 0) gameSettings.ball.speed = 200;
    else if (gameSettings.difficulty == 1) gameSettings.ball.speed = 250;
    else if (gameSettings.difficulty == 2) gameSettings.ball.speed = 300;
  }

  increaseDiffi() {
    gameSettings.difficulty += 1;
    if (gameSettings.difficulty > 2) gameSettings.difficulty = 0;
    this.renderDiffi();
  }

  decreaseDiffi() {
    gameSettings.difficulty -= 1;
    if (gameSettings.difficulty < 0) gameSettings.difficulty = 2;
    this.renderDiffi();
  }
}
