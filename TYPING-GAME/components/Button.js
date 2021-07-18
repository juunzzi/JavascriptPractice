import { createElementWithAttribute } from "../utils/createElementWithAttribute.js";

export function Button({ $app, initialState, onClick }) {
  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };
  this.render = () => {};
  this.init = () => {
    this.state = initialState;
    this.$target = createElementWithAttribute({
      tag: "button",
      attributes: { id: "settings-btn", class: "settings-btn" },
    });
    this.$target.appendChild(
      createElementWithAttribute({
        tag: "i",
        attributes: { class: "fas fa-cog" },
      })
    );
    this.$target.addEventListener("click", onClick);
    $app.appendChild(this.$target);
  };
  this.init();
}
