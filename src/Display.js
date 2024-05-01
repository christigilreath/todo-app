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
  const renderAddItemForm = () => {
    const addItemForm = document.createElement("form");
    addItemForm.id = "addItemForm";
    const itemFormCloseBtn = document.createElement("div");
    itemFormCloseBtn.textContent = "X";
    itemFormCloseBtn.id = "itemFormCloseBtn";

    const itemFormHeading = document.createElement("h2");
    itemFormHeading.textContent = "Add New Item";

    // const itemLabel = document.createElement("label");
    const itemNameInput = document.createElement("input");
    itemNameInput.name = "name";
    itemNameInput.placeholder = "Enter to-do item";
    // itemLabel.append(itemNameInput);

    const itemDueDateLabel = document.createElement("label");
    itemDueDateLabel.textContent = "Due: ";

    const itemDueDate = document.createElement("input");
    itemDueDate.name = "dueDate";
    itemDueDate.type = "date";
    itemDueDate.id = "itemDueDate";
    itemDueDateLabel.append(itemDueDate);

    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.textContent = "Submit";
    submitBtn.id = "submitBtn";

    addItemForm.append(
      itemFormCloseBtn,
      itemFormHeading,
      itemNameInput,
      itemDueDateLabel,

      submitBtn
    );

    return addItemForm;
  };
  const renderAddGroupForm = () => {
    const addGroupForm = document.createElement("form");
    addGroupForm.id = "addGroupForm";
    addGroupForm.classList.add("show");
    const groupFormCloseBtn = document.createElement("div");
    groupFormCloseBtn.textContent = "X";
    groupFormCloseBtn.id = "groupFormCloseBtn";

    const groupFormHeading = document.createElement("h2");
    groupFormHeading.textContent = "Add New Group";

    const groupLabel = document.createElement("label");
    const groupNameInput = document.createElement("input");
    groupNameInput.placeholder = "Enter new group name";
    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit";
    submitBtn.id = "submitBtn";
    groupLabel.append(groupNameInput, submitBtn);

    addGroupForm.append(groupFormCloseBtn, groupFormHeading, groupLabel);
    return addGroupForm;
  };
  const renderNumberOfItemsInGroup = (groupList) => {
    return `(${groupList.length})`;
  };
  return {
    renderNavMenu,
    renderAddItemForm,
    renderGroupListItems,
    renderAddGroupForm,
    renderNumberOfItemsInGroup,
  };
}

export { Display };
