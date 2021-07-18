import { createElementWithAttribute } from "../utils/createElementWithAttribute.js";

export function Container({ $app, initialState, onChange, onReload }) {
  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };
  this.render = () => {
    if (this.state.end) {
      this.$target.querySelector("#end-game-container").style.display = "block";
      return;
    }
    this.$target.querySelector("#time").textContent = this.state.time;
    this.$target.querySelector("#score").textContent = this.state.score;
    this.$target.querySelector("#word").textContent = this.state.currentWord;
    this.$target.querySelector("#text").value = this.state.inputValue;
  };
  this.init = () => {
    this.state = initialState;
    this.$target = createElementWithAttribute({
      tag: "div",
      attributes: { class: "container" },
    });
    this.$target.innerHTML = `<h2>👩‍💻 Speed Typer 👨‍💻</h2>
    <small>Type the following:</small>

    <h1 id="word">${this.state.currentWord}</h1>

    <input
      type="text"
      id="text"
      autocomplete="off"
      placeholder="Type the word here..."
      autofocus
    />

    <p class="time-container">Time left: <span id="time">${this.state.time}s</span></p>

    <p class="score-container">Score: <span id="score">${this.state.score}</span></p>

    <div id="end-game-container" class="end-game-container"><button id="reload">reload</button></div>`;
    this.$target.querySelector("#text").value = this.state.inputValue;
    this.$target.querySelector("#text").addEventListener("input", onChange);
    this.$target.querySelector("#reload").addEventListener("click", onReload);
    $app.appendChild(this.$target);
  };
  this.init();
}
