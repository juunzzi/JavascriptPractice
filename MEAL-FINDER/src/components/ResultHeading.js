import shouldComponentUpdate from "../utils/shouldComponentUpdate.js";

export default function ResultHeading({ $app, initialState }) {
  this.state = initialState;
  this.$target = document.createElement("div");

  this.$target.setAttribute("id", "result-heading");
  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    const prevState = this.state;
    this.state = nextState;

    shouldComponentUpdate(
      () => {
        this.render();
      },
      {
        prevState: prevState.currentFoodKeyword,
        nextState: nextState.currentFoodKeyword,
      }
    );
  };
  this.render = () => {
    if (this.state.currentFoodKeyword) {
      this.$target.innerHTML = `Search results for '${this.state.currentFoodKeyword}':`;
    } else {
      this.$target.innerHTML = "";
    }
    //   스테이트에 있는 비동기 데이터(음식들) div-img 태그들로 다 만들어서 타겟에 innerHTML
  };
}
