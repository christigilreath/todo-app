import { Display } from "./Display.js";
import { Group, ALL_GROUP, TODAY_GROUP, DEFAULT_GROUP } from "./Group.js";

function Controller() {
  const NAV = document.querySelector("nav");

  const TO_DO_LIST_DISPLAY = Display();
  const MASTER_GROUP_LIST = [ALL_GROUP, TODAY_GROUP, DEFAULT_GROUP];

  function getAllItems() {
    let allItems = [];
    for (let i = 1; i < MASTER_GROUP_LIST.length; i++) {
      allItems = [...allItems, ...MASTER_GROUP_LIST[i].list];
    }
    ALL_GROUP.list = allItems;
  }

  NAV.addEventListener("click", (e) => {
    let clickedGroup;
    if (e.target.nodeName === "SPAN") {
      clickedGroup = MASTER_GROUP_LIST.find(
        (group) => e.target.parentElement.id === group.id
      );
    } else if (e.target.textContent === "+") {
      console.log("add group form");
      // pop up add group form that adds a group to the master group list and renders it to the screen
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

  DEFAULT_GROUP.addItemToList(DEFAULT_GROUP.createItem("Go Shopping"));
  DEFAULT_GROUP.addItemToList(DEFAULT_GROUP.createItem("Clean House"));
  DEFAULT_GROUP.addItemToList(DEFAULT_GROUP.createItem("Make Dinner"));
  TODAY_GROUP.addItemToList(TODAY_GROUP.createItem("Do this today"));
  getAllItems();

  TO_DO_LIST_DISPLAY.renderNavMenu(MASTER_GROUP_LIST);
}

export { Controller };
