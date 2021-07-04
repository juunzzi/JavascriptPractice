export default function Audio({ $app, initialState, onTimeUpdate }) {
  this.state = initialState;
  this.$target = document.createElement("audio");
  $app.appendChild(this.$target);
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.$target.addEventListener("timeupdate", onTimeUpdate);
  this.render = () => {
    if (this.state.isMusicChanged) {
      this.$target.setAttribute("src", this.state.music);
    }
    if (this.state.isPaused) {
      this.$target.pause();
    } else {
      this.$target.play();
    }
  };
  this.render();
}
