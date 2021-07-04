export default function Form({ $app, initialState, onSubmit }) {
  this.state = initialState;
  this.$target = document.createElement("form");
  this.$target.setAttribute("id", "form");
  this.$target.innerHTML = ` <div class="form-control">  <label for="text">Text</label>
    <input type="text" id="text" placeholder="Enter text..." />
  </div>
  <div class="form-control">
    <label for="amount"
      >Amount <br />
      (negative - expense, positive - income)</label
    >
    <input type="number" id="amount" placeholder="Enter amount..." />
  </div>
  <button class="btn">Add transaction</button>`;

  this.$target.addEventListener("submit", onSubmit);
  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.render();
  };
  this.render = () => {
    this.$target.textContent = this.state.balance;
    //   스테이트에 있는 비동기 데이터(음식들) div-img 태그들로 다 만들어서 타겟에 innerHTML
  };
}
