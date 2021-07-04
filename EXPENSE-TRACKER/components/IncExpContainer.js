export default function IncExpContainer({ $app, initialState }) {
  this.state = initialState;
  this.$target = document.createElement("div");
  this.$target.setAttribute("class", "inc-exp-container");
  this.$target.innerHTML = `<div>
  <h4>Income</h4>
  <p id="money-plus" class="money plus">+$0.00</p>
</div>
<div>
  <h4>Expense</h4>
  <p id="money-minus" class="money minus">-$0.00</p>
</div>`;

  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    this.$target.querySelector("#money-plus").textContent = this.state.income;
    this.$target.querySelector("#money-minus").textContent = this.state.expense;
    //   스테이트에 있는 비동기 데이터(음식들) div-img 태그들로 다 만들어서 타겟에 innerHTML
  };
  this.render();
}
