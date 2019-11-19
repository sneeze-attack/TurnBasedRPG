import Phaser from 'phaser';
import PlayerCharacter from '../modules/PlayerCharacter';
import Enemy from '../modules/Enemy';

export default class BattleScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BattleScene' });
  }

  create() {
    // make background green
    this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');

    // player character - warrior
    const warrior = new PlayerCharacter(this, 250, 50, 'player', 1, 'Warrior', 100, 20);
    this.add.existing(warrior);

    // player character - mage
    const mage = new PlayerCharacter(this, 250, 100, 'player', 4, 'Mage', 80, 8);
    this.add.existing(mage);

    const dragonblue = new Enemy(this, 50, 50, 'dragonBlue', null, 'Dragon', 50, 3);
    this.add.existing(dragonblue);

    const dragonOrange = new Enemy(this, 50, 100, 'dragonOrange', null, 'Dragon2', 50, 3);
    this.add.existing(dragonOrange);

    // array with heroes
    this.heroes = [warrior, mage];
    // array with enemies
    this.enemies = [dragonblue, dragonOrange];
    // array with both parties, who will attack
    this.units = this.heroes.concat(this.enemies);

    // run the UI scene at the same time
    this.scene.launch('UIScene');

    this.index = -1;

    // let timeEvent = this.time.addEvent({ delay: 2000, callback: this.exitBattle, callbackScope: this });

    // this.sys.events.on('wake', this.wake, this);
  }

  nextTurn() {
    this.index += 1;
    // if there are no more units, we start again from the first one
    if (this.index >= this.units.length) {
      this.index = 0;
    }
    if (this.units[this.index]) {
      // if its the player hero
      if (this.units[this.index] instanceof PlayerCharacter) {
        this.events.emit('PlayerSelect', this.index);
      } else { // else if its enemy unit
        // pick random hero
        const r = Math.floor(Math.random() * this.heroes.length);
        // call the enemy's attack function
        this.units[this.index].attack(this.heroes[r]);
        // add timer for the next turn, so will have smooth gameplay
        this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
      }
    }
  }

  receivePlayerSelection(action, target) {
    if (action === 'attack') {
      this.units[this.index].attack(this.enemies[target]);
    }
    this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
  }

  exitBattle() {
    this.scene.sleep('UIScene');
    this.scene.switch('WorldScene');
  }

  wake() {
    this.scene.run('UIScene');
    this.time.addEvent({ delay: 2000, callback: this.exitBattle, callbackScope: this });
  }
}
