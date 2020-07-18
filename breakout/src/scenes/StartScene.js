import "phaser";
import logo from "../assets/images/logo.png";
import font from "../assets/font/font.png";
import xmlFont from "../assets/font/font.xml";
import config from "../config/config";

export default class StartScene extends Phaser.Scene {
  constructor() {
    super("StartScene");
  }

  preload() {
    this.load.image("logo", logo);
    this.load.bitmapFont("pixelFont", font, xmlFont);
  }

  create() {
    var logo = this.add.image(400, 150, "logo");
    this.playBtn = this.add
      .bitmapText(
        config.width / 2,
        config.height / 2 + 100,
        "pixelFont",
        "PLAY ",
        50
      )
      .setOrigin(0.5, 0.5);
    this.playBtn.setOriginFromFrame();
    this.playBtn.setInteractive({ useHandCursor: true });
    this.input.on("pointerover", this.pointerOver, this);
    this.input.on("pointerout", this.pointerOut, this);
    this.input.on(
      "gameobjectdown",
      () => this.scene.start("LoadingScene"),
      this
    );

    this.configBtn = this.add
      .bitmapText(
        config.width / 2,
        config.height / 2 + 160,
        "pixelFont",
        "CONFIG ",
        50
      )
      .setOrigin(0.5, 0.5);
    this.configBtn.setOriginFromFrame();
  }

  pointerOver(pointer, gameObject) {
    gameObject[0].setScale(1.5, 1.5);
  }

  pointerOut(pointer, gameObject) {
    gameObject[0].setScale(1, 1);
  }
}
