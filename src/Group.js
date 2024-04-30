import { Item } from "./Item.js";
var _ = require("lodash");
class Group {
  constructor(title, list = []) {
    this.title = title;
    this.list = list;
    this.id = _.camelCase(this.title);
    this.selected = false;
  }

  updateTitle(newTitle) {
    this.title = newTitle;
  }
  createItem(name, priority) {
    return new Item(name, priority);
  }
  setItemId() {
    const formattedTitle = this.title.toLowerCase().replace(" ", "-");

    this.list.forEach((item, index) => {
      item.id = `${formattedTitle}-${index}`;
    });
  }
  addItemToList(item) {
    this.list.push(item);
  }
  deleteItemFromList(itemName) {
    const itemToDelete = this.list.findIndex(
      (element) => (element.name = itemName)
    );

    this.list.splice(itemToDelete, 1);

    this.setItemId();
  }
}

const ALL_GROUP = new Group("All");
const TODAY_GROUP = new Group("Today");
const DEFAULT_GROUP = new Group("Default Group");
DEFAULT_GROUP.selected = true;

export { Group, ALL_GROUP, TODAY_GROUP, DEFAULT_GROUP };
