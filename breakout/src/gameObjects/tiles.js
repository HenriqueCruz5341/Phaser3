export default class Tiles extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, value) {
    super(scene, x, y, texture);
    scene.add.existing(this);

    this.value = value;
    this.destroyed = false;
    this.setPosition(x, y).setOrigin(0, 0);
    scene.physics.world.enableBody(this, 1);
    scene.tiles.add(this);
  }

  hitTile() {
    if (this.texture.key == "tilePurple") this.setTexture("tilePurple1");
    else if (this.texture.key == "tilePurple1") this.setTexture("tilePurple2");
    else if (this.texture.key == "tileYellow") this.setTexture("tileYellow1");
    else this.destroyed = true;
  }

  update() {
    this.hitTile();
  }
}
