"use strict";

const list_el = document.getElementById("list");
const addBtn = document.getElementById("create");
const today = document.querySelector(".date");

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
let day = new Date();
today.textContent = day.toLocaleDateString("en-GB", options);

let groceryList = [];

addBtn.addEventListener("click", addGroceryItem);

function addGroceryItem() {
  const item = {
    id: new Date().getTime(),
    text: "",
    complete: false,
  };

  groceryList.push(item);
  const { item_el, input_el } = createGroceryEl(item);

  list_el.append(item_el);

  input_el.removeAttribute("disabled");
  input_el.focus();
}

function createGroceryEl(item) {
  const item_el = document.createElement("div");
  item_el.classList.add("item");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = item.complete;

  if (item.complete) {
    item_el.classList.add("complete");
  }
  const input_el = document.createElement("input");
  input_el.type = "text";
  input_el.value = item.text;

  const actions_el = document.createElement("div");
  actions_el.classList.add("actions");

  const edit_btn_el = document.createElement("button");
  edit_btn_el.classList.add("material-icons");

  edit_btn_el.innerText = "edit";

  const remove_btn_el = document.createElement("button");
  remove_btn_el.classList.add("material-icons", "remove-btn");
  remove_btn_el.innerText = "remove_circle";

  actions_el.append(edit_btn_el);
  actions_el.append(remove_btn_el);

  item_el.append(checkbox);
  item_el.append(input_el);
  item_el.append(actions_el);

  //EVENTS

  checkbox.addEventListener("change", () => {
    item.complete = checkbox.checked;
    if (item.complete) {
      item_el.classList.add("complete");
    } else {
      item_el.classList.remove("complete");
    }

    Save();
  });

  input_el.addEventListener("input", () => {
    item.text = input_el.value;
  });

  input_el.addEventListener("blur", () => {
    input_el.setAttribute("disabled", "");
    Save();
  });

  edit_btn_el.addEventListener("click", () => {
    input_el.removeAttribute("disabled");
    input_el.focus();
  });

  remove_btn_el.addEventListener("click", () => {
    item_el.remove();

    Save();
  });

  return { item_el, input_el, edit_btn_el, remove_btn_el };
}

function displayGroceryList() {
  Load();
  for (let i = 0; i < groceryList.length; i++) {
    const item = groceryList[i];
    const { item_el } = createGroceryEl(item);

    list_el.append(item_el);
  }
}

displayGroceryList();

function Save() {
  //Save Grocery List Items

  const save = JSON.stringify(groceryList);
  localStorage.setItem("shopping_list", save);
}

function Load() {
  const data = localStorage.getItem("shopping_list");

  if (data) {
    groceryList = JSON.parse(data);
  }
}
