import { Item } from "./Item.js";

class Group {
  constructor(title, list = []) {
    this.title = title;
    this.list = list;
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

const DEFAULT_GROUP = new Group("Default Group");

DEFAULT_GROUP.addItemToList(DEFAULT_GROUP.createItem("Go Shopping"));

DEFAULT_GROUP.setItemId();

// DEFAULT_GROUP.deleteItemFromList("go shopping");
console.log(DEFAULT_GROUP);
