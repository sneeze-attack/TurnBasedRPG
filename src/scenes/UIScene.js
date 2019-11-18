import Phaser from 'phaser';
import HeroesMenu from '../modules/menus/HeroesMenu';
import ActionsMenu from '../modules/menus/ActionsMenu';
import EnemiesMenu from '../modules/menus/EnemiesMenu';

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
  }

  remapHeroes() {
    let heroes = this.battleScene.heroes;
    this.heroesMenu.remap(heroes);
  }
}
