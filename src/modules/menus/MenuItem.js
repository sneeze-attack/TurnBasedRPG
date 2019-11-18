/* global Phaser
no-undef: off */
export default class MenuItem extends Phaser.GameObjects.Text {
  constructor(x, y, text, scene) {
    super(scene);
    Phaser.GameObjects.Text.call(this, scene, x, y, text, { color: '#ffffff', align: 'left', fontSize: 15 });
  }

  select() {
    // turn text yellow
    this.setColor('#f8ff38');
  }

  deselect() {
    // turn text white
    this.setColor('#ffffff');
  }
}
