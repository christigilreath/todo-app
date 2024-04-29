function Display(group) {
  const renderGroupListItems = (group) => {
    const UL = document.querySelector("ul");
    group.list.forEach((listItem) => {
      const li = document.createElement("li");
      li.textContent = listItem.name;
      li.id = listItem.id;
      listItem.completed
        ? li.classList.add("clicked")
        : li.classList.remove("clicked");
      listItem.priority === "high"
        ? li.classList.add("high")
        : li.classList.remove("high");
      const span = document.createElement("span");
      span.classList.add("due-date");
      span.textContent = `Due: ${listItem.dueDate}`;
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "X";
      deleteBtn.classList.add("delete-btn");
      li.append(span, deleteBtn);
      UL.append(li);
    });
  };
}
