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
const utilFunction = {
  isAlphabet: (key) => "a" <= key && key <= "z",
  isDuplicate: (memorizer, key) => memorizer.includes(key),
};
const correctKeyHandler = function (key) {
  this.correctKeyMemorizer.push(key);
  this.word.forEach((spel, index) => {
    if (spel === key) {
      this.wordContainer.childNodes.item(index).textContent = key;
      this.correctCount++;
    }
  });
};
const wrongKeyHandler = function (key) {
  this.wrongKeyMemorizer.push(key);
  this.wrongContainer.appendChild(document.createTextNode(key + ","));
  this.hangman.item(this.wrongKeyMemorizer.length - 1).style.display = "block";
  this.wrongCount++;
};
const keyPressHandler = function ({ key }) {
  if (!utilFunction.isAlphabet(key)) {
    return;
  }
  if (utilFunction.isDuplicate(this.pressKeyMemorizer, key)) {
    this.showNotification();
    return;
  }
  this.pressKeyMemorizer.push(key);
  if (this.word.includes(key)) {
    correctKeyHandler.call(this, key);
    this.gameSet();
  } else {
    wrongKeyHandler.call(this, key);
    this.gameSet();
  }
};
const playBtn = document.querySelector("#play-button");

class Game {
  constructor() {
    this.wrongContainer = document.querySelector("#wrong-letters");
    this.wordContainer = document.querySelector("#word");
    this.hangman = document.querySelectorAll(".figure-part");
    this.popup = document.querySelector(".popup-container");
    this.notification = document.querySelector("#notification-container");
    this.playBtn = document.querySelector("#play-button");
    this.handler = keyPressHandler.bind(this);
  }

  initGameVariable() {
    this.pressKeyMemorizer = [];
    this.wrongKeyMemorizer = [];
    this.correctKeyMemorizer = [];
    this.correctWord = null;
    this.wrongWord = null;
    this.word = randomWord[Math.floor(Math.random() * 20)].split("");
    this.popup.style.display = "none";
    this.wordContainer.innerHTML = "";
    this.wrongContainer.innerHTML = "";
    this.hangman.forEach((part) => {
      part.style.display = "none";
    });
    this.correctCount = 0;
    this.wrongCount = 0;
  }
  gameSetting() {
    this.word.forEach(() => {
      this.correctWord = document.createElement("span");
      this.correctWord.style =
        "border-bottom:1px solid #fff; width:1em; margin-right:10px; text-align:center";
      this.wordContainer.appendChild(this.correctWord);
    });
  }
  gameSet() {
    if (this.correctCount === this.word.length || this.wrongCount === 6) {
      this.showPopup();
    }
  }
  showPopup() {
    this.popup.style.display = "flex";
    removeEventListener("keydown", this.handler);
  }
  showNotification() {
    this.notification.classList.toggle("show");
    setTimeout(() => {
      this.notification.classList.toggle("show");
    }, 2000);
  }
  gameStart() {
    this.initGameVariable();
    this.gameSetting();
    addEventListener("keydown", this.handler);
    this.playBtn.addEventListener("click", this.gameStart.bind(this));
  }
}
const game = new Game();
game.gameStart();
