import { createElementWithAttribute } from "../utils/createElementWithAttribute.js";

function FilterContainer({ $app, initialState, onChange }) {
  this.$app = $app;
  this.state = initialState;
  this.$target = createElementWithAttribute({
    tag: "div",
    attributes: {
      class: "filter-container",
    },
  });
  this.input = createElementWithAttribute({
    tag: "input",
    attributes: {
      type: "text",
      id: "filter",
      class: "filter",
      placeholder: "Filter posts...",
    },
  });
  this.$target.appendChild(this.input);
  this.$app.appendChild(this.$target);
  this.input.addEventListener("input", onChange);
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {};
}

export default FilterContainer;
