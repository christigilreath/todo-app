import { Display } from "./Display.js";
import { Group, ALL_GROUP, TODAY_GROUP, DEFAULT_GROUP } from "./Group.js";
import { format } from "date-fns";

function Controller() {
  const TO_DO_LIST_DISPLAY = Display();
  // const MASTER_GROUP_LIST = [ALL_GROUP, TODAY_GROUP, DEFAULT_GROUP];
  let MASTER_GROUP_LIST = [];

  const NAV = document.querySelector("nav");
  const MAIN = document.querySelector("main");

  const ADD_ITEM_BTN = document.querySelector("#addItemBtn");

  function getAllItems() {
    let allItems = [];
    for (let i = 2; i < MASTER_GROUP_LIST.length; i++) {
      allItems = [...allItems, ...MASTER_GROUP_LIST[i].list];
    }

    MASTER_GROUP_LIST[0].list = allItems;
  }

  function getTodaysItems() {
    MASTER_GROUP_LIST[1].list = [];

    const currentDate = new Date();
    const stringDate = currentDate.toString();
    const slashedDate = stringDate.replaceAll("-", "/");
    const todaysDate = format(slashedDate, "MM-dd-yyyy");

    let todaysItems = MASTER_GROUP_LIST[0].list.filter((item) => {
      return item.dueDate === todaysDate;
    });
    MASTER_GROUP_LIST[1].list = [...todaysItems];
  }

  function setStorage() {
    console.log("storage set");
    localStorage.setItem("data", JSON.stringify(MASTER_GROUP_LIST));
    console.log(localStorage);
  }

  function controlGroupForm(e) {
    if (e.target.id === "groupFormCloseBtn") {
      MAIN.removeChild(MAIN.lastElementChild);
      ADD_ITEM_BTN.classList.remove("hide");
    } else {
      if (e.target.id === "submitBtn") {
        e.preventDefault();
        MASTER_GROUP_LIST.forEach((group) => group.setSelectedToFalse());
        let groupNameInputValue = e.target.previousElementSibling.value;
        const formattedGroupTitle = groupNameInputValue
          .toLowerCase()
          .split(" ")
          .map((item) => {
            item = item.charAt(0).toUpperCase() + item.substr(1);
            return item;
          })
          .join(" ");

        let newGroupName = groupNameInputValue
          .toUpperCase()
          .split(" ")
          .join("_");

        if (
          MASTER_GROUP_LIST.some((group) => group.title === formattedGroupTitle)
        ) {
          alert("Group already exists");
          e.target.previousElementSibling.value = "";
        } else {
          [newGroupName] = [new Group(formattedGroupTitle)];
          newGroupName.selected = true;
          MASTER_GROUP_LIST.push(newGroupName);
          TO_DO_LIST_DISPLAY.renderNavMenu(MASTER_GROUP_LIST);
          MAIN.removeChild(MAIN.lastElementChild);
          ADD_ITEM_BTN.classList.remove("hide");
        }
        console.log(MASTER_GROUP_LIST);
      }
    }
  }

  function controlAddItemForm(e) {
    if (e.target.id === "itemFormCloseBtn") {
      MAIN.removeChild(MAIN.lastElementChild);
      ADD_ITEM_BTN.classList.remove("hide");
    } else {
      if (e.target.id === "submitBtn") {
        e.preventDefault();

        const form = document.querySelector("#addItemForm");
        const formData = new FormData(form);
        const name = formData.get("name");
        const dueDate = formData.get("dueDate");
        let formattedDueDate;
        if (dueDate) {
          const slashedDate = dueDate.replaceAll("-", "/");

          formattedDueDate = format(slashedDate, "MM-dd-yyyy");
        }
        if (!name) {
          alert("Enter Item Name");
        } else {
          let selectedGroup = MASTER_GROUP_LIST.find((group) => group.selected);

          if (
            selectedGroup.title === "All" ||
            selectedGroup.title === "Today" ||
            selectedGroup.title === "Default Group"
          ) {
            MASTER_GROUP_LIST.forEach((group) => group.setSelectedToFalse());
            MASTER_GROUP_LIST[2].selected = true;
          }
          selectedGroup = MASTER_GROUP_LIST.find((group) => group.selected);
          selectedGroup.addItemToList(
            selectedGroup.createItem(name, formattedDueDate)
          );
          selectedGroup.setItemId();

          console.log(getAllItems());
          getTodaysItems();
          setStorage();
          TO_DO_LIST_DISPLAY.renderNavMenu(MASTER_GROUP_LIST);
          MAIN.removeChild(MAIN.lastElementChild);
          ADD_ITEM_BTN.classList.remove("hide");
        }

        // re render screen
        // filter all items and todays items
        // change priority to high for over due items
      }
    }
  }
  window.addEventListener("DOMContentLoaded", () => {
    const storage = JSON.parse(localStorage.getItem("data"));
    if (storage) {
      console.log("fetching from storage");
      const thisStorageRegroup = storage.map((group) => {
        return new Group(
          group.title,
          group.list,
          group.selected,
          group.required
        );
      });
      console.log(thisStorageRegroup);
      MASTER_GROUP_LIST = [...thisStorageRegroup];
      console.log(MASTER_GROUP_LIST);
    } else {
      console.log("original");
      MASTER_GROUP_LIST = [ALL_GROUP, TODAY_GROUP, DEFAULT_GROUP];
    }
    console.log(MASTER_GROUP_LIST);
    TO_DO_LIST_DISPLAY.renderNavMenu(MASTER_GROUP_LIST);
  });

  ADD_ITEM_BTN.addEventListener("click", () => {
    ADD_ITEM_BTN.classList.add("hide");
    MAIN.append(TO_DO_LIST_DISPLAY.renderAddItemForm());
    const itemForm = document.querySelector("#addItemForm");
    itemForm.addEventListener("click", (e) => {
      controlAddItemForm(e);
    });
  });

  NAV.addEventListener("click", (e) => {
    let clickedGroup;
    if (e.target.nodeName === "BUTTON") {
      console.log(e);
      const groupToDelete = MASTER_GROUP_LIST.findIndex((group) => {
        return group.id === e.target.parentElement.id;
      });
      console.log(groupToDelete);
      MASTER_GROUP_LIST.splice(groupToDelete, 1);

      getAllItems();
      getTodaysItems();
      MASTER_GROUP_LIST[2].selected = true;
      setStorage();
      TO_DO_LIST_DISPLAY.renderNavMenu(MASTER_GROUP_LIST);
    }
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
      setStorage();
      TO_DO_LIST_DISPLAY.renderNavMenu(MASTER_GROUP_LIST);
    }
  });

  MAIN.addEventListener("click", (e) => {
    const getCurrentGroup = (target) => {
      const listItemId = target.id;
      // const listItemId = target;
      console.log(listItemId);
      const listItemArray = listItemId.split("-");
      const listItemIndex = listItemArray.pop();

      const currentGroupTitle = listItemArray
        .map((item) => {
          item = item.charAt(0).toUpperCase() + item.substr(1);
          return item;
        })
        .join(" ");

      const currentGroup = MASTER_GROUP_LIST.find((group) => {
        return group.title === currentGroupTitle;
      });
      return [currentGroup, listItemIndex];
    };

    if (e.target.nodeName === "LI") {
      // grab group
      console.log(MASTER_GROUP_LIST);
      console.log(e.target.id);

      const [currentGroup, listItemIndex] = getCurrentGroup(e.target);

      const listItem = currentGroup.list[listItemIndex];
      listItem.completed
        ? (listItem.completed = false)
        : (listItem.completed = true);
      console.log(MASTER_GROUP_LIST);
      getAllItems();
      getTodaysItems();
      setStorage();
      TO_DO_LIST_DISPLAY.renderNavMenu(MASTER_GROUP_LIST);
    }
    if (
      e.target.nodeName === "BUTTON" &&
      e.target.id !== "addItemBtn" &&
      e.target.id !== "submitBtn"
    ) {
      const [currentGroup, listItemIndex] = getCurrentGroup(
        e.target.parentElement
      );

      currentGroup.deleteItemFromList(listItemIndex);
      getAllItems();
      getTodaysItems();
      setStorage();
      TO_DO_LIST_DISPLAY.renderNavMenu(MASTER_GROUP_LIST);
    }
  });
}

export { Controller };
