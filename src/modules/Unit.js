/* global Phaser
no-undef: off */
export default class Unit extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame, type, hp, damage) {
    super(scene);
    Phaser.GameObjects.Sprite.call(this, scene, x, y, texture, frame);
    this.type = type;
    this.hp = hp;
    this.maxHp = hp;
    this.damage = damage; // default damage
  }

  attack(target) {
    target.takeDamage(this.damage);
  }

  takeDamage(damage) {
    this.hp -= damage;
  }
}
