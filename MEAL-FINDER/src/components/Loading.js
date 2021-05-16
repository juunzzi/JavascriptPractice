export default function Loading({ $app, initialState }) {
  this.state = initialState;
  this.$target = document.createElement("div");
  this.$target.setAttribute("class", "Loading");
  this.$target.innerHTML = `<i class="fas fa-random"></i>`;
  // this.$target.textContent = "loading!!";
  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    this.$target.style.display = this.state.isLoading ? "block" : "none";
  };
  this.render();
}
