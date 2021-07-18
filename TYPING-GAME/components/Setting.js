import { createElementWithAttribute } from "../utils/createElementWithAttribute.js";

export function Setting({ $app, initialState, onChange }) {
  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };
  this.render = () => {
    if (!this.state.setting) {
      this.$target.classList.add("hide");
    } else {
      this.$target.classList.remove("hide");
    }
  };
  this.init = () => {
    this.state = initialState;
    this.$target = createElementWithAttribute({
      tag: "div",
      attributes: { id: "settings", class: "settings" },
    });
    this.$target.innerHTML = `<form id="settings-form">
    <div>
      <label for="difficulty">Difficulty</label>
      <select id="difficulty">
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  </form>`;
    this.$target.querySelector("#difficulty").value = "medium";
    this.$target
      .querySelector("#difficulty")
      .addEventListener("change", onChange);
    $app.appendChild(this.$target);
  };
  this.init();
}
