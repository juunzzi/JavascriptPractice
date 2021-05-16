export default function ResultHeading({ $app, initialState }) {
  this.$target = document.createElement("div");

  this.$target.setAttribute("id", "result-heading");
  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    this.$target.innerHTML = `Search results for '${this.state.currentFoodKeyword}':`;
    //   스테이트에 있는 비동기 데이터(음식들) div-img 태그들로 다 만들어서 타겟에 innerHTML
  };
}
