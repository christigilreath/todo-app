class Item {
  constructor(name, dueDate, priority = "regular") {
    this.name = name;
    this.id;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = false;
  }
}

export { Item };
