export default function Balance({ $app, initialState }) {
  this.state = initialState;
  this.$target = document.createElement("h4");
  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    this.$target.textContent = this.state.balance;
    //   스테이트에 있는 비동기 데이터(음식들) div-img 태그들로 다 만들어서 타겟에 innerHTML
  };
  this.render();
}
