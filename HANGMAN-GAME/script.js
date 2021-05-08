const randomWord = [
  "challenge",
  "vertical",
  "pen",
  "mystery",
  "harmony",
  "entertainment",
  "flex",
  "race",
  "tract",
  "mug",
  "failure",
  "effective",
  "stick",
  "love",
  "recording",
  "safety",
  "rehearsal",
  "brand",
  "cooperative",
  "thin",
];
const wrongContainer = document.querySelector("#wrong-letters");
const wordContainer = document.querySelector("#word");
const hangman = document.querySelectorAll(".figure-part");
const popup = document.querySelector(".popup-container");
const notification = document.querySelector("#notification-container");
const playBtn = document.querySelector("#play-button");
const gameStart = () => {
  const word = randomWord[Math.floor(Math.random() * 20)].split("");
  word.forEach((spel) => {
    const item = document.createElement("span");
    item.style =
      "border-bottom:1px solid #fff; width:1em; margin-right:10px; text-align:center";
    wordContainer.appendChild(item);
  });
  const pressKeyMemorizer = [];
  const correctKeyMemorizer = [];
  const wrongKeyMemorizer = [];
  const correctKeyHandler = (key) => {
    if (!correctKeyHandler.count) {
      correctKeyHandler.count = 0;
    }
    correctKeyMemorizer.push(key);
    word.forEach((spel, index) => {
      if (spel === key) {
        wordContainer.childNodes.item(index).textContent = key;
        correctKeyHandler.count++;
      }
    });
  };
  const wrongKeyHandler = (key) => {
    if (!wrongKeyHandler.count) {
      wrongKeyHandler.count = 0;
    }
    wrongKeyMemorizer.push(key);
    wrongContainer.appendChild(document.createTextNode(key + ","));
    hangman.item(wrongKeyMemorizer.length - 1).style.display = "block";
    wrongKeyHandler.count++;
  };
  const showPopup = () => {
    popup.style.display = "flex";
    removeEventListener("keydown", keyDownHandler);
  };
  const onlyAlphabet = (key) => "a" <= key && key <= "z";
  const isDuplicate = (key) => pressKeyMemorizer.includes(key);
  const keyDownHandler = function ({ key }) {
    if (onlyAlphabet(key)) {
      if (!isDuplicate(key)) {
        pressKeyMemorizer.push(key);
        if (word.includes(key)) {
          correctKeyHandler(key);
          if (correctKeyHandler.count === word.length) {
            showPopup();
          }
        } else {
          wrongKeyHandler(key);
          if (wrongKeyHandler.count === 6) {
            showPopup();
          }
        }
      } else {
        //   중복 알람
        notification.classList.toggle("show");
        setTimeout(() => {
          notification.classList.toggle("show");
        }, 2000);
      }
    }
  };
  addEventListener("keydown", keyDownHandler);
};
gameStart();
playBtn.addEventListener("click", gameStart);
