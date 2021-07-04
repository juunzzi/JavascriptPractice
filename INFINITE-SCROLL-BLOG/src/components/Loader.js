import { createElementWithAttribute } from "../utils/createElementWithAttribute.js";

function Loader({ $app, initialState }) {
  this.$app = $app;
  this.state = initialState;
  this.$target = createElementWithAttribute({
    tag: "div",
    attributes: { class: "loader" },
    // show이면 보인다.
  });
  this.loadingCircle = [...new Array(3)].map((i) => {
    const circle = createElementWithAttribute({
      tag: "div",
      attributes: { class: "circle" },
    });
    this.$target.appendChild(circle);
    return circle;
  });
  this.$app.appendChild(this.$target);
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    if (this.state.loading) {
      this.$target.classList.add("show");
    } else {
      this.$target.classList.remove("show");
    }
  };
}

export default Loader;
