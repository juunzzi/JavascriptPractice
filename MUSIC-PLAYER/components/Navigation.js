export default function Navigation({
  $app,
  initialState,
  onClickPlay,
  onClickNext,
  onClickPrev,
}) {
  this.state = initialState;
  this.$target = document.createElement("div");
  this.$target.setAttribute("class", "navigation");
  this.$target.innerHTML = `<button id="prev" class="action-btn">
  <i class="fas fa-backward"></i>
</button>
<button id="play" class="action-btn action-btn-big">
  <i></i>
</button>
<button id="next" class="action-btn">
  <i class="fas fa-forward"></i>
</button>`;
  this.$target.querySelector("#play").addEventListener("click", onClickPlay);
  this.$target.querySelector("#next").addEventListener("click", onClickNext);
  this.$target.querySelector("#prev").addEventListener("click", onClickPrev);
  $app.appendChild(this.$target);
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    if (this.state.isPaused) {
      this.$target.querySelector("#play").querySelector("i").className =
        "fas fa-play";
    } else {
      this.$target.querySelector("#play").querySelector("i").className =
        "fas fa-pause";
    }
  };
  this.render();
}
