import Phaser from 'phaser';

export default class WorldScene extends Phaser.Scene {
  constructor() {
    super({ key: 'WorldScene' });
  }

  create() {
    // creates map
    const map = this.make.tilemap({ key: 'map' });
    // creates tileset image
    const tiles = map.addTilesetImage('spritesheet', 'tiles');
    // add layers to map using "grass" and "obstacles"
    const grass = map.createStaticLayer('Grass', tiles, 0, 0);
    // using setCollisionByExclusion -1.. we make all tiles in "Obstacles" layer collidable
    const obstacles = map.createStaticLayer('Obstacles', tiles, 0, 0).setCollisionByExclusion([-1]);
    // create player avatar
    this.player = this.physics.add.sprite(50, 100, 'player', 6);
    // create world bounds so player stays within map borders
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    // player set to stay within borders
    this.player.setCollideWorldBounds(true);
    // process keyboard input
    this.cursors = this.input.keyboard.createCursorKeys();
    // limit camera to stay within map boundaries
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    // follow the player with camera
    this.cameras.main.startFollow(this.player);
    // prevent tiles bleeding (showing border lines) # TODO: this does not work
    // this.cameras.main.roundPixels = true;
    // animation with 'left' key, same as 'right' as we use flipX in animations later
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13] }),
      frameRate: 10,
      repeat: -1
    });
    // animation with 'right' key
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13] }),
      frameRate: 10,
      repeat: -1
    });
    // animation with 'up' key
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('player', { frames: [2, 8, 2, 14] }),
      frameRate: 10,
      repeat: -1
    });
    // animation with 'down' key
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('player', { frames: [0, 6, 0, 12] }),
      frameRate: 10,
      repeat: -1
    });
    // creates collisions for player and obstacles
    this.physics.add.collider(this.player, obstacles);
    // create Phaser.GameObjects.Zone, an invisible object
    this.spawns = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
    // create 30 spawns on the map
    for (let i = 0; i < 30; i += 1) {
      const x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
      const y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
      // params are x, y, width, height
      this.spawns.create(x, y, 20, 20);
    }
    // make player and zones interact.. when player overlaps the zone the onMeetEnemy method is called
    this.physics.add.overlap(this.player, this.spawns, this.onMeetEnemy, false, this);
  }

  onMeetEnemy(player, zone) {
    // move zone to another location
    zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
    zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
    // add shake effect for battle start
    this.cameras.main.shake(300);
    // switch to BattleScene
    this.scene.switch('BattleScene');
  }

  update() {
    // set body velocity to 0
    this.player.body.setVelocity(0);
    // horizontal movement
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-80);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(80);
    }
    // vertical movement
    if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-80);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(80);
    }
    // code for switching to correct animation
    if (this.cursors.left.isDown) {
      this.player.anims.play('left', true);
      this.player.flipX = true;
    } else if (this.cursors.right.isDown) {
      this.player.anims.play('right', true);
      this.player.flipX = false;
    } else if (this.cursors.up.isDown) {
      this.player.anims.play('up', true);
    } else if (this.cursors.down.isDown) {
      this.player.anims.play('down', true);
    } else {
      this.player.anims.stop();
    }
  }
}
