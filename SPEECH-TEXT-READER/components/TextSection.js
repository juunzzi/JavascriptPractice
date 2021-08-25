import { createElementSettingAttr, textArray } from "../utils/utils.js";

export default class TextSection {
  constructor({ $app, onClick }) {
    this.$app = $app;
    this.$target;

    this.init();
    this.$target.addEventListener("click", onClick);
  }
  setState() {}
  render() {}
  init() {
    this.$target = document.createElement("main");
    this.$app.appendChild(
      createElementSettingAttr("h1", {}, "Speech Text Reader")
    );

    // target hydrate initial image
    textArray.forEach((text) => {
      const box = createElementSettingAttr("div", { class: "box" });
      box.innerHTML = `<div class="box">
            <img src="./img/${text.name}.jpg" alt="${text.text}">
            <p class="info">${text.text}</p>
          </div>`;
      this.$target.appendChild(box);
    });
    this.$app.appendChild(this.$target);
  }
}
