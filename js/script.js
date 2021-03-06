let stickerContents = [];

let dataBase = window.localStorage;

let defaultStickerColors = {
  sticker: "#e5e5e5",
  text: "#404040",
};

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
      description: stickerInput.value,
      id: createId(),
      colorSticker: chooseStickerColor(),
      colorText: chooseTextStickerColor(),
      status: "",
    };

    stickerContents.push(task);
    newTask(task);

    saveData();

    sticker.style.backgroundColor = defaultStickerColors.sticker;
    stickerInput.style.color = defaultStickerColors.text;
  } else if (event.keyCode === 13 || stickerInput.value.length === 42) {
    warning.classList.remove("hide");
  }
});

pinBtn.addEventListener("click", function (event) {
  if (stickerInput.value.length > 0) {
    warning.classList.add("hide");

    let task = {
      description: stickerInput.value,
      id: createId(),
      colorSticker: chooseStickerColor(),
      colorText: chooseTextStickerColor(),
      status: "",
    };

    stickerContents.push(task);
    newTask(task);

    saveData();

    sticker.style.backgroundColor = defaultStickerColors.sticker;
    stickerInput.style.color = defaultStickerColors.text;
  } else {
    warning.classList.remove("hide");
  }
});

stickerInput.addEventListener("input", function () {
  if (stickerInput.value.length === 42) {
    warning.textContent = "M??ximo de 42 Caracteres";
    warning.classList.remove("hide");
  } else {
    warning.textContent =
      "Escreva no minimo um character para criar um sticker.";
  }
});

function createId() {
  return Math.floor(Math.random() * 999999);
}

function newTask(task) {
  let stickerItem = document.createElement("div");
  stickerItem.classList.add("sticker-item");
  stickerItem.id = task.id;
  stickerItem.style = task.colorSticker;

  let taskId = stickerItem.id;

  let stickerItemText = document.createElement("span");
  stickerItemText.classList.add("sticker-item-text");
  stickerItemText.insertAdjacentHTML("afterbegin", task.description);
  stickerItemText.style = task.colorText;

  if (task.status === "done") {
    stickerItemText.style.textDecoration = "line-through";
  }

  let stickerControl = document.createElement("div");
  stickerControl.classList.add("sticker-control");

  let doneBtn = document.createElement("button");
  doneBtn.classList.add("done");
  doneBtn.insertAdjacentHTML(
    "afterbegin",
    '<img src="./assets/done.svg" alt="Check Icon" />'
  );

  doneBtn.addEventListener("click", function (event) {
    stickerItemText.style.textDecoration = "line-through";
    task.status = "done";
    saveData();
  });

  let deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete");
  deleteBtn.insertAdjacentHTML(
    "afterbegin",
    '<img src="./assets/trash.svg" alt="Trash bin Icon" />'
  );

  deleteBtn.addEventListener("click", function (taskId) {
    let stickerItemCreated = document.getElementById("#" + taskId);
    if (stickerItem) {
      stickerList.removeChild(stickerItem);

      deleteTaskFromStickerContents(stickerItem);

      saveData();
    }
  });

  stickerControl.appendChild(doneBtn);
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

stickerInput.addEventListener("keydown", function (event) {
  warning.classList.add("hide");
});

function deleteTaskFromStickerContents(element) {
  stickerContents = stickerContents.filter(
    (task) => task.id != element.getAttribute("id")
  );
}

function chooseStickerColor() {
  return sticker.getAttribute("style");
}

function chooseTextStickerColor() {
  return stickerInput.getAttribute("style");
}

function saveData() {
  dataBase.setItem("tasks", JSON.stringify(stickerContents));
}

function loadData() {
  let data = dataBase.getItem("tasks");
  if (data) {
    stickerContents = JSON.parse(data);
  }
}

onload = function () {
  loadData();
  stickerContents.forEach((task) => newTask(task));
};
