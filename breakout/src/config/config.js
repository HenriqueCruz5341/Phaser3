import GameScene from "../scenes/GameScene";

export default {
  type: Phaser.AUTO,
  width: 768,
  height: 600,
  backgroundColor: 0x000000,
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
    },
  },
};
