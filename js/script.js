const sticker = document.querySelector(".sticker");
const stickerInput = document.querySelector("#input-sticker");

const stickerColorOne = document.querySelector(".color-one");
const stickerColorTwo = document.querySelector(".color-two");
const stickerColorThree = document.querySelector(".color-three");

const addStickerBtn = document.querySelector(".add-btn");
const stickerContainer = document.querySelector(".sticker-container");

const cancelBtn = document.querySelector(".cancel");
const pinBtn = document.querySelector(".pin");

const stickerList = document.querySelector(".sticker-list");

const warning = document.querySelector(".warning");

let show = false;

addStickerBtn.addEventListener("click", function () {
  stickerContainer.classList.toggle("hide", show);
});

cancelBtn.addEventListener("click", function () {
  stickerContainer.classList.toggle("hide", !show);
  warning.classList.add("hide");
  stickerInput.value = "";
});

function stickerColorSelector(event) {
  let colors = {
    one: "#09ef00",
    two: "#fd008e",
    three: "#ffff00",
    textOne: "#e5e5e5",
    textTwo: "#404040",
  };

  if (event.target.className === "color-one") {
    sticker.style.backgroundColor = colors.one;
    stickerInput.style.color = colors.textTwo;
    stickerInput.classList.remove("pink");
  }

  if (event.target.className === "color-two") {
    sticker.style.backgroundColor = colors.two;
    stickerInput.style.color = colors.textOne;
    stickerInput.classList.add("pink");
  }

  if (event.target.className === "color-three") {
    sticker.style.backgroundColor = colors.three;
    stickerInput.style.color = colors.textTwo;
    stickerInput.classList.remove("pink");
  }
}

stickerColorOne.addEventListener("click", stickerColorSelector);
stickerColorTwo.addEventListener("click", stickerColorSelector);
stickerColorThree.addEventListener("click", stickerColorSelector);

stickerInput.addEventListener("keypress", function (event) {
  if (event.keyCode === 13 && stickerInput.value.length > 0) {
    warning.classList.add("hide");

    let task = {
      name: stickerInput.value,
      id: createId(),
    };
    newTask(task);
  } else {
    warning.classList.add("hide");
  }
});

pinBtn.addEventListener("click", function (event) {
  if (stickerInput.value.length > 0) {
    warning.classList.add("hide");

    let task = {
      name: stickerInput.value,
      id: createId(),
    };

    newTask(task);
  } else {
    warning.classList.remove("hide");
  }
});

function createId() {
  return Math.floor(Math.random() * 999999);
}

function newTask(task) {
  let stickerItem = document.createElement("div");
  stickerItem.classList.add("sticker-item");

  let stickerItemText = document.createElement("span");
  stickerItemText.classList.add("sticker-item-text");
  stickerItemText.innerHTML = task.name;

  let stickerControl = document.createElement("div");
  stickerControl.classList.add("sticker-control");

  let editBtn = document.createElement("button");
  editBtn.classList.add("edit");
  editBtn.innerHTML = '<img src="./assets/pencil.svg" alt="Pin Icon" />';

  let deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete");
  deleteBtn.innerHTML = '<img src="./assets/trash.svg" alt="Cancel Icon" />';

  stickerControl.appendChild(editBtn);
  stickerControl.appendChild(deleteBtn);

  stickerItem.appendChild(stickerItemText);
  stickerItem.appendChild(stickerControl);

  stickerList.appendChild(stickerItem);

  stickerInput.value = "";
}

stickerInput.addEventListener("click", function (event) {
  warning.classList.add("hide");
});

stickerInput.addEventListener("focus", function (event) {
  warning.classList.add("hide");
});
