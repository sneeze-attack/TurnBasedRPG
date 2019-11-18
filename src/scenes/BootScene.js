import Phaser from 'phaser';
import tilesImg from '../assets/map/spritesheet.png';
import mapImg from '../assets/map/map.json';
import playerImg from '../assets/RPG_assets.png';
import dragonBlueImg from '../assets/dragonblue.png';
import dragonOrangeImg from '../assets/dragonorange.png';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    // map tiles
    this.load.image('tiles', tilesImg);
    // map in json format
    this.load.tilemapTiledJSON('map', mapImg);
    // load our two characters
    this.load.spritesheet('player', playerImg, { frameWidth: 16, frameHeight: 16 });
    // load our dragons
    this.load.image('dragonBlue', dragonBlueImg);
    this.load.image('dragonOrange', dragonOrangeImg);
  }

  create() {
    this.scene.start('WorldScene');
  }
}
