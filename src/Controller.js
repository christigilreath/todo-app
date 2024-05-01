import { Display } from "./Display.js";
import { Group, ALL_GROUP, TODAY_GROUP, DEFAULT_GROUP } from "./Group.js";

function Controller() {
  const TO_DO_LIST_DISPLAY = Display();
  const MASTER_GROUP_LIST = [ALL_GROUP, TODAY_GROUP, DEFAULT_GROUP];

  const NAV = document.querySelector("nav");
  const MAIN = document.querySelector("main");
  const GROUP_FORM = document.querySelector("#addGroupForm");
  const ADD_ITEM_BTN = document.querySelector("#addItemBtn");

  function getAllItems() {
    let allItems = [];
    for (let i = 1; i < MASTER_GROUP_LIST.length; i++) {
      allItems = [...allItems, ...MASTER_GROUP_LIST[i].list];
    }
    ALL_GROUP.list = allItems;
  }

  function controlGroupForm(e) {
    console.log(e.target.id);
    if (e.target.id === "groupFormCloseBtn") {
      MAIN.removeChild(MAIN.lastElementChild);
      ADD_ITEM_BTN.classList.remove("hide");
    } else {
      if (e.target.id === "submitBtn") {
        e.preventDefault();
        MASTER_GROUP_LIST.forEach((group) => group.setSelectedToFalse());
        let groupNameInputValue = e.target.previousElementSibling.value;
        let newGroupName = groupNameInputValue
          .toUpperCase()
          .split(" ")
          .join("_");
        console.log(
          MASTER_GROUP_LIST.some((group) => {
            console.log(group.title);
            console.log(newGroupName);
            return group.title === newGroupName;
          })
        );
        if (
          MASTER_GROUP_LIST.some((group) => group.title === groupNameInputValue)
        ) {
          alert("Group already exists");
          e.target.previousElementSibling.value = "";
        } else {
          [newGroupName] = [new Group(e.target.previousElementSibling.value)];
          newGroupName.selected = true;
          MASTER_GROUP_LIST.push(newGroupName);
          TO_DO_LIST_DISPLAY.renderNavMenu(MASTER_GROUP_LIST);
          MAIN.removeChild(MAIN.lastElementChild);
          ADD_ITEM_BTN.classList.remove("hide");
        }
      }
    }
  }

  function controlAddItemForm(e) {
    console.log(e.target.id);
    if (e.target.id === "itemFormCloseBtn") {
      MAIN.removeChild(MAIN.lastElementChild);
      ADD_ITEM_BTN.classList.remove("hide");
    } else {
      if (e.target.id === "submitBtn") {
        e.preventDefault();
        console.log(e.target);
        const form = document.querySelector("#addItemForm");
        const formData = new FormData(form);
        const name = formData.get("name");
        const dueDate = formData.get("dueDate");
        let selectedGroup = MASTER_GROUP_LIST.find((group) => group.selected);
        console.log(selectedGroup);
        if (
          selectedGroup.title === "All" ||
          selectedGroup.title === "Today" ||
          selectedGroup.title === "Default Group"
        ) {
          MASTER_GROUP_LIST.forEach((group) => group.setSelectedToFalse());
          MASTER_GROUP_LIST[2].selected = true;
          console.log(MASTER_GROUP_LIST[2]);
        }
        selectedGroup = MASTER_GROUP_LIST.find((group) => group.selected);
        selectedGroup.addItemToList(selectedGroup.createItem(name, dueDate));

        getAllItems();
        TO_DO_LIST_DISPLAY.renderNavMenu(MASTER_GROUP_LIST);
        MAIN.removeChild(MAIN.lastElementChild);
        ADD_ITEM_BTN.classList.remove("hide");

        // re render screen
        // filter all items and todays items
        // change priority to high for today's items
      }
    }
  }

  ADD_ITEM_BTN.addEventListener("click", () => {
    ADD_ITEM_BTN.classList.add("hide");
    MAIN.append(TO_DO_LIST_DISPLAY.renderAddItemForm());
    const itemForm = document.querySelector("#addItemForm");
    itemForm.addEventListener("click", (e) => {
      controlAddItemForm(e);
      // event.preventDefault();
      // console.log(event.target);
      // const form = event.target;
      // const formData = new FormData(form);
      // const entries = [...formData.entries()];
      // console.log(entries);
    });
  });

  NAV.addEventListener("click", (e) => {
    let clickedGroup;
    if (e.target.nodeName === "SPAN") {
      clickedGroup = MASTER_GROUP_LIST.find(
        (group) => e.target.parentElement.id === group.id
      );
    } else if (e.target.textContent === "+") {
      // pop up add group form that adds a group to the master group list and renders it to the screen
      ADD_ITEM_BTN.classList.add("hide");
      MAIN.append(TO_DO_LIST_DISPLAY.renderAddGroupForm());
      const groupForm = document.querySelector("#addGroupForm");
      groupForm.addEventListener("click", (e) => {
        controlGroupForm(e);
      });
    } else {
      clickedGroup = MASTER_GROUP_LIST.find(
        (group) => group.id === e.target.id
      );
    }
    if (clickedGroup) {
      MASTER_GROUP_LIST.forEach((group) => (group.selected = false));
      clickedGroup.selected = true;
      TO_DO_LIST_DISPLAY.renderNavMenu(MASTER_GROUP_LIST);
    }
  });

  ADD_ITEM_BTN.addEventListener("click", (e) => {});

  DEFAULT_GROUP.addItemToList(DEFAULT_GROUP.createItem("Go Shopping"));
  DEFAULT_GROUP.addItemToList(DEFAULT_GROUP.createItem("Clean House"));
  DEFAULT_GROUP.addItemToList(DEFAULT_GROUP.createItem("Make Dinner"));
  TODAY_GROUP.addItemToList(TODAY_GROUP.createItem("Do this today"));
  getAllItems();

  TO_DO_LIST_DISPLAY.renderNavMenu(MASTER_GROUP_LIST);
}

export { Controller };
