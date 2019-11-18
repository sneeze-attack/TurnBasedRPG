import Phaser from 'phaser';

export const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'phaser-example',
    width: 1366,
    height: 768
  },
  scene: [
    StartScene
  ],
};

const game = new Phaser.Game(config);
export default game;
