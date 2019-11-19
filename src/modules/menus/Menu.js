/* global Phaser
no-undef: off */
import MenuItem from './MenuItem';

export default class Menu extends Phaser.GameObjects.Container {
  constructor(scene, x, y, heroes) {
    super(scene, x, y);
    Phaser.GameObjects.Container.call(this, scene, x, y);
    this.menuItems = [];
    this.menuItemIndex = 0;
    this.heroes = heroes;
    this.x = x;
    this.y = y;
  }

  addMenuItem(unit) {
    const menuItem = new MenuItem(this.scene, 0, this.menuItems.length * 20, unit);
    this.menuItems.push(menuItem);
    this.add(menuItem);
  }

  moveSelectionUp() {
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex -= 1;
    if (this.menuItemIndex < 0) {
      this.menuItemIndex = this.menuItems.length - 1;
    }
    this.menuItems[this.menuItemIndex].select();
  }

  moveSelectionDown() {
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex += 1;
    if (this.menuItemIndex >= this.menuItems.length) {
      this.menuItemIndex = 0;
    }
    this.menuItems[this.menuItemIndex].select();
  }

  // select the menu as a whole and an element with index from it
  select(index) {
    if (!index) {
      index = 0;
    }
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex = index;
    this.menuItems[this.menuItemIndex].select();
  }

  // deselect this menu
  deselect() {
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex = 0;
  }

  clear() {
    for (let i = 0; i < this.menuItems.length; i += 1) {
      this.menuItems[i].destroy();
    }
    this.menuItems.length = 0;
    this.menuItemIndex = 0;
  }

  remap(units) {
    this.clear();
    for (let i = 0; i < units.length; i += 1) {
      const unit = units[i];
      this.addMenuItem(unit.type);
    }
  }
}
