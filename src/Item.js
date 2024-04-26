class Item {
  constructor(name, priority = "regular") {
    this.name = name;
    this.id;
    this.dueDate;
    this.priority = priority;
    this.completed = false;
  }
}

export { Item };
