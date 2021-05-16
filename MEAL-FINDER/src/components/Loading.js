export default function Loading({ $app, initialState }) {
  this.state = initialState;
  this.$target = document.createElement("div");
  this.$target.className = "Loading";
  $app.appendChild(this.$target);

  this.setState = () => {};
  this.render = () => {};
}
