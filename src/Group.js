import { Item } from "./Item.js";
var _ = require("lodash");
class Group {
  constructor(title, list = [], selected = false, required = false) {
    this.title = title;
    this.list = list;
    this.id = _.camelCase(this.title);
    this.selected = selected;
    this.required = required;
  }

  updateTitle(newTitle) {
    this.title = newTitle;
  }
  setSelectedToFalse() {
    this.selected = false;
  }
  setRequiredToTrue() {
    this.required = true;
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
  deleteItemFromList(itemIndex) {
    this.list.splice(itemIndex, 1);

    this.setItemId();
  }
}

const ALL_GROUP = new Group("All");
const TODAY_GROUP = new Group("Today");
const DEFAULT_GROUP = new Group("Default Group");
ALL_GROUP.setRequiredToTrue();
TODAY_GROUP.setRequiredToTrue();
DEFAULT_GROUP.setRequiredToTrue();

DEFAULT_GROUP.selected = true;

export { Group, ALL_GROUP, TODAY_GROUP, DEFAULT_GROUP };
