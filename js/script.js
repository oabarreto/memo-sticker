const sticker = document.querySelector(".sticker");
const stickerInput = document.querySelector(".sticker-text");

const stickerColorOne = document.querySelector(".color-one");
const stickerColorTwo = document.querySelector(".color-two");
const stickerColorThree = document.querySelector(".color-three");

function stickerColorSelector(event) {
  let colors = {
    one: "#09ef00",
    two: "#fd008e",
    three: "#ffff00",
    textOne: "#e5e5e5",
    textTwo: "#202020",
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
