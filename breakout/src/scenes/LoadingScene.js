import "phaser";
import player from "../assets/sprites/50-Breakout-Tiles.png";
import tileBlue from "../assets/sprites/01-Breakout-Tiles.png";
import tileRed from "../assets/sprites/07-Breakout-Tiles.png";
import tileYellow from "../assets/sprites/13-Breakout-Tiles.png";
import tileYellow1 from "../assets/sprites/14-Breakout-Tiles.png";
import tilePurple from "../assets/sprites/05-Breakout-Tiles.png";
import tilePurple1 from "../assets/sprites/06-Breakout-Tiles.png";
import tilePurple2 from "../assets/sprites/06-1-Breakout-Tiles.png";
import ball from "../assets/sprites/58-Breakout-Tiles.png";
import ground from "../assets/sprites/ground.png";
import heart from "../assets/sprites/60-Breakout-Tiles.png";
import powerUp from "../assets/sprites/49-Breakout-Tiles.png";
import bigPlayerPU from "../assets/sprites/47-Breakout-Tiles.png";
import smallPlayerPU from "../assets/sprites/46-Breakout-Tiles.png";
import bigPlayer from "../assets/sprites/56-Breakout-Tiles.png";
import smallPlayer from "../assets/sprites/57-Breakout-Tiles.png";

export default class LoadingScene extends Phaser.Scene {
  constructor() {
    super("LoadingScene");
  }

  preload() {
    this.load.image("player", player);
    this.load.image("tileBlue", tileBlue);
    this.load.image("tileRed", tileRed);
    this.load.image("tileYellow", tileYellow);
    this.load.image("tileYellow1", tileYellow1);
    this.load.image("tilePurple", tilePurple);
    this.load.image("tilePurple1", tilePurple1);
    this.load.image("tilePurple2", tilePurple2);
    this.load.image("ball", ball);
    this.load.image("ground", ground);
    this.load.image("heart", heart);
    this.load.image("powerUp", powerUp);
    this.load.image("bigPlayerPU", bigPlayerPU);
    this.load.image("smallPlayerPU", smallPlayerPU);
    this.load.image("bigPlayer", bigPlayer);
    this.load.image("smallPlayer", smallPlayer);
  }

  create() {
    this.scene.start("GameScene");
  }
}
