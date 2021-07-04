export default function Img({ $app, initialState }) {
  this.state = initialState;
  this.$target = document.createElement("div");
  this.$target.setAttribute("class", "img-container");
  this.$target.innerHTML = `
    <img  alt="music-cover" id="cover" />
    `;
  $app.appendChild(this.$target);
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    this.$target
      .querySelector("img")
      .setAttribute("src", this.state.musicImage);
  };
  this.render();
}
