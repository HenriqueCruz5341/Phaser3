import "phaser";
import config from "../config/config";
import gameSettings from "../config/gameSettings";
import Tiles from "../gameObjects/tiles";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  create() {
    this.tiles = this.add.group();
    let t;

    for (let i = 0; i <= 672; i += 96) {
      for (let j = 40; j <= 72; j += 32) {
        if (j == 40) t = new Tiles(this, i, j, "tileYellow", 20);
        else if (j == 72) t = new Tiles(this, i, j, "tilePurple", 30);
      }
    }

    for (let i = 0; i <= 672; i += 96) {
      if (i % 192) t = new Tiles(this, i, 104, "tileBlue", 10);
      else t = new Tiles(this, i, 136, "tileRed", 10);
    }

    for (let i = 0; i <= 672; i += 96) {
      for (let j = 168; j <= 200; j += 32) {
        if (i == 288 || i == 384) t = new Tiles(this, i, j, "tileBlue", 10);
        else if (j == 168) t = new Tiles(this, i, j, "tileYellow", 20);
        else if (j == 200) t = new Tiles(this, i, j, "tilePurple", 30);
      }
    }

    this.powerUp = this.add.group();
    this.powerUp.add(
      this.physics.add
        .staticImage(96, 136, "powerUp")
        .setOrigin(0, 0)
        .setScale(0.25)
        .refreshBody()
    );
    this.powerUp.add(
      this.physics.add
        .staticImage(576, 104, "powerUp")
        .setOrigin(0, 0)
        .setScale(0.25)
        .refreshBody()
    );

    this.ground = this.physics.add.staticImage(
      config.width / 2,
      config.height - 7,
      "ground"
    );
    this.roof = this.physics.add.staticImage(config.width / 2, 20, "ground");
    this.player = this.physics.add
      .sprite(config.width / 2, config.height - 30, "player")
      .setScale(0.25);
    this.cursorKeeys = this.input.keyboard.createCursorKeys();
    this.player.setCollideWorldBounds(true);
    this.audioGrow = this.sound.add("audioGrow");
    this.audioDecrease = this.sound.add("audioDecrease");

    this.ball = this.physics.add
      .sprite(this.player.x, config.height - 70, "ball")
      .setScale(0.25);
    this.ball.body.onWorldBounds = true;
    this.audioBall = this.sound.add("audioBall");
    this.audioBurn = this.sound.add("audioBurn");

    this.ball.setCollideWorldBounds(true);
    this.qtdHitPlayer = 1;
    this.physics.add.overlap(
      this.player,
      this.ball,
      this.hitPlayer,
      null,
      this
    );

    this.physics.add.collider(this.ball, this.tiles, this.hitTile, null, this);
    this.physics.add.collider(
      this.ball,
      this.roof,
      () => this.audioBall.play(gameSettings.sound),
      null,
      this
    );
    for (let i = 0; i < this.powerUp.children.entries.length; i++) {
      this.powerUp.children.entries[i].collider = this.physics.add.collider(
        this.ball,
        this.powerUp,
        this.randomPowerUp,
        null,
        this
      );
    }

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

    this.physics.world.on(
      "worldbounds",
      () => this.audioBall.play(gameSettings.sound),
      this
    );

    var graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.beginPath();
    graphics.moveTo(0, 0);
    graphics.lineTo(config.width, 0);
    graphics.lineTo(config.width, 40);
    graphics.lineTo(0, 40);
    graphics.lineTo(0, 0);
    graphics.closePath();
    graphics.fillPath();

    this.score = 0;
    this.scoreLabel = this.add.bitmapText(615, 10, "pixelFont", "SCORE ", 30);
    let scoreFormated = this.zeroPad(this.score, 5);
    this.scoreLabel.text = "SCORE " + scoreFormated;

    this.lifes = { heart: this.add.group(), qtd: 3 };
    for (let i = 0, j = 20; i < this.lifes.qtd; i++, j += 35)
      this.lifes.heart.add(this.add.image(j, 20, "heart").setScale(0.2));
    this.gameOverBool = false;

    this.fallPowerUp = this.add.group();
  }

  randomPowerUp(ball, tile) {
    this.physics.world.removeCollider(tile.collider);
    let texture,
      x = tile.x,
      y = tile.y;
    if (Math.random() > 0.5) {
      texture = "bigPlayerPU";
    } else {
      texture = "smallPlayerPU";
    }
    tile.destroy();
    tile = this.physics.add
      .sprite(x, y, texture)
      .setScale(0.25)
      .setOrigin(0, 0);
    tile.setVelocityY(100);
    this.physics.add.overlap(this.player, tile, this.getPowerUp, null, this);
  }

  getPowerUp(player, powerUp) {
    if (powerUp.texture.key == "bigPlayerPU") {
      this.audioGrow.play(gameSettings.sound);
      player.setTexture("bigPlayer");
      player.body.setSize(693, 128, true);
    } else {
      this.audioDecrease.play(gameSettings.sound);
      player.setTexture("smallPlayer");
      player.body.setSize(230, 128, true);
    }
    powerUp.destroy();
    setTimeout(this.setDefaultBody, 5000, this);
  }

  setDefaultBody(scene) {
    scene.player.body.setSize(485, 128, false);
    scene.player.setTexture("player");
  }

  startGame() {
    this.ball.setVelocity(0, -gameSettings.ball.speed);
    this.startTxt.setVisible(false);
    this.gameStarted = true;
  }

  hitPlayer(player, ball) {
    this.audioBall.play(gameSettings.sound);
    let newSpeed = ball.body.velocity.y;
    if (this.qtdHitPlayer < 4) {
      newSpeed += (this.qtdHitPlayer / 20) * newSpeed;
      this.qtdHitPlayer++;
    }
    ball.y = config.height - 64;
    ball.setVelocityY(-newSpeed);

    let newXVelocityX = Math.abs(gameSettings.ball.speed);
    if (ball.x < player.x - player.body.width / 2 + 20) {
      ball.setVelocityX(-newXVelocityX);
    } else if (ball.x > player.x + player.body.width / 2 - 20) {
      ball.setVelocityX(newXVelocityX);
    }
  }

  hitTile(ball, tile) {
    this.audioBall.play(gameSettings.sound);
    tile.update();
    if (tile.destroyed) {
      this.score += tile.value;
      let scoreFormated = this.zeroPad(this.score, 5);
      this.scoreLabel.text = "SCORE " + scoreFormated;
      tile.destroy();
    }
  }

  zeroPad(number, size) {
    let stringNumber = String(number);
    while (stringNumber.length < (size || 2)) stringNumber = "0" + stringNumber;

    return stringNumber;
  }

  hitGround(ball, ground) {
    this.audioBurn.play(gameSettings.sound);
    if (this.lifes.qtd) {
      this.lifes.heart.children.entries[this.lifes.qtd - 1].destroy();
      this.lifes.qtd--;
      this.resetGame();
    } else this.gameOver();
  }

  gameOver() {
    this.add
      .bitmapText(
        config.width / 2,
        config.height / 2 + 100,
        "pixelFont",
        "Game Over",
        50
      )
      .setOrigin(0.5, 0.5);
    this.gameOverTxt = this.add
      .bitmapText(
        config.width / 2,
        config.height / 2 + 140,
        "pixelFont",
        "Press SPACE to restart",
        50
      )
      .setOrigin(0.5, 0.5);
    this.gameOverBool = true;
    this.ball
      .setPosition(config.width / 2, config.height / 2)
      .setVelocity(0, 0);
    this.ball.setVisible(false);
  }

  resetGame() {
    this.ball.setPosition(this.player.x, config.height - 70).setVelocity(0, 0);
    this.startTxt.setVisible(true);
    this.qtdHitPlayer = 0;
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
    if (!this.gameStarted) this.ball.setX(this.player.x);
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      if (!this.gameStarted) this.startGame();
      if (this.gameOverBool) this.scene.start("LoadingScene");
    }
  }
}
