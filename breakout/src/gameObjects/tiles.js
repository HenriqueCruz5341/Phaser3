export default class Tiles extends Phaser.GameObjects.Sprite {
  //sprite = 0 -> tileBlue
  //sprite = 1 -> tileRed
  //sprite = 2 -> tileYellow
  //sprite = 4 -> tilePurple
  constructor(scene, x, y, texture, lifes) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    this.lifes = lifes;

    this.setPosition(x, y).setOrigin(0, 0);
    scene.physics.world.enableBody(this, 1);
    scene.tiles.add(this);
  }

  hitTile() {
    this.setTexture("tilePurple");
    this.lifes--;
  }

  update() {
    // if (this.sprite == 3 && this.lifes > 1) hitTile();
  }
}
