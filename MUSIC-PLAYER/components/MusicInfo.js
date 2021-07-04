export default function MusicInfo({ $app, initialState, onClickProgressBar }) {
  this.state = initialState;
  this.$target = document.createElement("div");
  this.$target.setAttribute("class", "music-info");
  this.$target.innerHTML = ` <h4 id="title"></h4>
  <div class="progress-container" id="progress-container">
    <div class="progress" id="progress"></div>
  </div>`;

  $app.appendChild(this.$target);
  this.$target
    .querySelector("#progress-container")
    .addEventListener("click", onClickProgressBar);
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    this.$target.querySelector("#title").textContent = this.state.musicTitle;
    this.$target.querySelector(
      "#progress"
    ).style.width = `${this.state.progress}%`;
  };
  this.render();
}
