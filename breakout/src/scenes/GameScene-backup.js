import "phaser";
import config from "../config/config";
import gameSettings from "../config/gameSettings";
import Tiles from "../gameObjects/tiles";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  create() {
    this.tileBlue = this.physics.add.staticGroup();
    this.tileRed = this.physics.add.staticGroup();
    this.tileYellow = this.physics.add.staticGroup();
    this.tilePurple = this.physics.add.staticGroup();

    // this.tiles = new Tiles(this, 264, 250, 2, "tileBlue");
    console.log(this);

    for (let i = 0; i <= 672; i += 96) {
      for (let j = 0; j <= 96; j += 32) {
        if (j == 0)
          this.tileBlue
            .create(i, j, "tileBlue")
            .setOrigin(0, 0)
            .setScale(0.25)
            .refreshBody();
        else if (j == 32)
          this.tileRed
            .create(i, j, "tileRed")
            .setOrigin(0, 0)
            .setScale(0.25)
            .refreshBody();
        else if (j == 64)
          this.tileYellow
            .create(i, j, "tileYellow")
            .setOrigin(0, 0)
            .setScale(0.25)
            .refreshBody();
        else if (j == 96)
          this.tilePurple
            .create(i, j, "tilePurple")
            .setOrigin(0, 0)
            .setScale(0.25)
            .refreshBody();
      }
    }

    this.ground = this.physics.add.staticImage(
      config.width / 2,
      config.height - 7,
      "ground"
    );
    this.player = this.physics.add
      .sprite(config.width / 2, config.height - 30, "player")
      .setScale(0.25);
    this.cursorKeeys = this.input.keyboard.createCursorKeys();
    this.player.setCollideWorldBounds(true);

    this.ball = this.physics.add
      .sprite(config.width / 2, config.height / 2, "ball")
      .setScale(0.25);

    this.ball.setCollideWorldBounds(true);
    this.qtdHitPlayer = 1;
    this.physics.add.overlap(
      this.player,
      this.ball,
      this.hitPlayer,
      null,
      this
    );
    this.physics.add.collider(
      this.ball,
      this.tilePurple,
      this.hitTile,
      null,
      this
    );
    this.physics.add.collider(
      this.ball,
      this.tileRed,
      this.hitTile,
      null,
      this
    );
    this.physics.add.collider(
      this.ball,
      this.tileBlue,
      this.hitTile,
      null,
      this
    );
    this.physics.add.collider(
      this.ball,
      this.tileYellow,
      this.hitTile,
      null,
      this
    );
    this.ball.setBounce(1);

    this.spacebar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.startTxt = this.add
      .bitmapText(
        config.width / 2,
        config.height / 2 + 100,
        "pixelFont",
        "Press SPACE to start",
        50
      )
      .setOrigin(0.5, 0.5);
    this.gameStarted = false;

    this.physics.add.overlap(
      this.ball,
      this.ground,
      this.hitGround,
      null,
      this
    );
  }

  startGame() {
    this.ball.setVelocity(gameSettings.ball.speed, gameSettings.ball.speed);
    this.startTxt.setAlpha(0);
    this.gameStarted = true;
  }

  hitPlayer(player, ball) {
    let newSpeed = ball.body.velocity.y;
    if (this.qtdHitPlayer < 4) {
      newSpeed += (this.qtdHitPlayer / 20) * newSpeed;
      this.qtdHitPlayer++;
    }
    ball.y = config.height - 64;
    ball.setVelocityY(-newSpeed);
  }

  hitTile(ball, tile) {
    console.log(tile);
    tile.destroy();
  }

  hitGround(ball, ground) {
    this.resetGame();
  }

  resetGame() {
    this.ball
      .setPosition(config.width / 2, config.height / 2)
      .setVelocity(0, 0);
    this.startTxt.setAlpha(1);
    this.gameStarted = false;
  }

  movePlayerManager() {
    this.player.setVelocity(0);

    if (this.cursorKeeys.left.isDown)
      this.player.setVelocityX(-gameSettings.player.speed);
    else if (this.cursorKeeys.right.isDown)
      this.player.setVelocityX(gameSettings.player.speed);
  }

  update() {
    this.movePlayerManager();
    // console.log(this.ball);
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      if (!this.gameStarted) this.startGame();
    }
  }
}
