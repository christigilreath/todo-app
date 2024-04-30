function Display() {
  const renderNavMenu = (masterGroupList) => {
    const NAV = document.querySelector("nav");
    while (NAV.hasChildNodes()) {
      NAV.removeChild(NAV.firstChild);
    }
    masterGroupList.forEach((group) => {
      const groupDiv = document.createElement("div");
      groupDiv.textContent = group.title;
      groupDiv.id = group.id;
      if (group.selected) {
        groupDiv.classList.add("selected");
        renderGroupListItems(group);
      } else {
        groupDiv.classList.remove("selected");
      }
      const itemCountSpan = document.createElement("span");
      itemCountSpan.textContent = `(${group.list.length})`;
      groupDiv.append(itemCountSpan);
      NAV.append(groupDiv);
    });
    const addGroupBtn = document.createElement("div");
    addGroupBtn.textContent = "+";
    addGroupBtn.id = "addGroupBtn";
    NAV.append(addGroupBtn);
  };

  const renderGroupListItems = (group) => {
    const UL = document.querySelector("ul");
    while (UL.hasChildNodes()) {
      UL.removeChild(UL.firstChild);
    }
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
      listItem.dueDate
        ? (span.textContent = `Due: ${listItem.dueDate}`)
        : (span.textContent = "");
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "X";
      deleteBtn.classList.add("delete-btn");
      li.append(span, deleteBtn);
      UL.append(li);
    });
  };
  const renderNumberOfItemsInGroup = (groupList) => {
    return `(${groupList.length})`;
  };
  return {
    renderNavMenu,

    renderGroupListItems,
    renderNumberOfItemsInGroup,
  };
}

export { Display };
