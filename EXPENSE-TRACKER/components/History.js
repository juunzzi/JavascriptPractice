export default function History({ $app, initialState, onDeleteClick }) {
  this.state = initialState;
  this.$target = document.createElement("ul");
  this.$target.setAttribute("id", "list");
  this.$target.setAttribute("class", "list");

  $app.appendChild(this.$target);
  this.$target.addEventListener("click", onDeleteClick);
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    if (this.state.history) {
      this.$target.innerHTML = this.state.history
        .map((item) => {
          return `<li data-id=${item.id} class="${
            item.amount > -1 ? "plus" : "minus"
          }"> ${item.text}<span>${
            item.amount
          }</span><button class="delete-btn">x</button></li>`;
        })
        .join("");

      // li 생성
    }
  };
  this.render();
}
