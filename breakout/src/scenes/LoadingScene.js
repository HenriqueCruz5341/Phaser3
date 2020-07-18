import "phaser";
import player from "../assets/sprites/50-Breakout-Tiles.png";
import tileBlue from "../assets/sprites/01-Breakout-Tiles.png";
import tileRed from "../assets/sprites/07-Breakout-Tiles.png";
import tileYellow from "../assets/sprites/13-Breakout-Tiles.png";
import tilePurple from "../assets/sprites/05-Breakout-Tiles.png";
import ball from "../assets/sprites/58-Breakout-Tiles.png";
import ground from "../assets/sprites/ground.png";

export default class LoadingScene extends Phaser.Scene {
  constructor() {
    super("LoadingScene");
  }

  preload() {
    this.load.image("player", player);
    this.load.image("tileBlue", tileBlue);
    this.load.image("tileRed", tileRed);
    this.load.image("tileYellow", tileYellow);
    this.load.image("tilePurple", tilePurple);
    this.load.image("ball", ball);
    this.load.image("ground", ground);
  }

  create() {
    this.scene.start("GameScene");
  }
}
