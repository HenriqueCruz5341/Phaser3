import Phaser from "phaser";
import config from "./config/config";
import GameScene from "./scenes/GameScene";
import StartScene from "./scenes/StartScene";
import LoadingScene from "./scenes/LoadingScene";

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add("StartScene", StartScene);
    this.scene.add("LoadingScene", LoadingScene);
    this.scene.add("GameScene", GameScene);
    this.scene.start("StartScene");
  }
}

window.onload = () => {
  window.game = new Game();
};
