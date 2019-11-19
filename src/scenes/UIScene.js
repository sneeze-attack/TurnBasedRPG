import Phaser from 'phaser';
import HeroesMenu from '../modules/menus/HeroesMenu';
import ActionsMenu from '../modules/menus/ActionsMenu';
import EnemiesMenu from '../modules/menus/EnemiesMenu';
import Message from '../modules/menus/Message';

export default class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene' });
  }

  create() {
    // creates bottom 3 blue boxes
    this.graphics = this.add.graphics();
    this.graphics.lineStyle(1, 0xffffff);
    this.graphics.fillStyle(0x031f4c, 1);
    this.graphics.strokeRect(2, 150, 90, 100);
    this.graphics.fillRect(2, 150, 90, 100);
    this.graphics.strokeRect(95, 150, 90, 100);
    this.graphics.fillRect(95, 150, 90, 100);
    this.graphics.strokeRect(188, 150, 130, 100);
    this.graphics.fillRect(188, 150, 130, 100);

    // container to hold all menus
    this.menus = this.add.container();

    this.heroesMenu = new HeroesMenu(this, 195, 153);
    this.actionsMenu = new ActionsMenu(this, 100, 153);
    this.enemiesMenu = new EnemiesMenu(this, 8, 153);

    // currently selected menu
    this.currentMenu = this.actionsMenu;

    // add menus to container
    this.menus.add(this.heroesMenu);
    this.menus.add(this.actionsMenu);
    this.menus.add(this.enemiesMenu);

    // load data from BattleScene
    this.battleScene = this.scene.get('BattleScene');

    this.remapHeroes();
    this.remapEnemies();
    this.input.keyboard.on('keydown', this.onKeyInput, this);

    // listen for 'PlayerSelect' event
    this.battleScene.events.on('PlayerSelect', this.onPlayerSelect, this);

    this.events.on('Enemy', this.onEnemy, this);

    this.message = new Message(this, this.battleScene.events);
    this.add.existing(this.message);

    this.battleScene.nextTurn();
  }

  remapHeroes() {
    let heroes = this.battleScene.heroes;
    this.heroesMenu.remap(heroes);
  }

  remapEnemies() {
    let enemies = this.battleScene.enemies;
    this.enemiesMenu.remap(enemies);
  }

  onKeyInput(event) {
    if (this.currentMenu) {
      if (event.keyCode === 'ArrowUp') {
        this.currentMenu.moveSelectionUp();
      } else if (event.code === 'ArrowRight' || event.code === 'Shift') {
        //
      } else if (event.code === 'Space' || event.code === 'ArrowLeft') {
        this.currentMenu.confirm();
      }
    }
  }

  onPlayerSelect(id) {
    this.heroesMenu.select(id);
    this.actionsMenu.select(0);
    this.currentMenu = this.actionsMenu;
  }

  onSelectEnemies() {
    this.currentMenu = this.enemiesMenu;
    this.enemiesMenu.select(0);
  }

  onEnemy(index) {
    this.heroesMenu.deselect();
    this.actionsMenu.deselect();
    this.enemiesMenu.deselect();
    this.currentMenu = null;
    this.battleScene.receivePlayerSelection('attack', index);
  }
}
