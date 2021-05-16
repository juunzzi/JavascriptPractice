import Input from "./Input.js";
import Button from "./Button.js";
export default function Form({ $app, initialState, onSubmit, buttonData }) {
  this.$target = document.createElement("form");
  this.$target.setAttribute("class", "flex");
  this.$target.setAttribute("id", "submit");
  // input
  new Input({
    $app: this.$target,
    initialState: initialState,
  });
  // 서치버튼
  new Button({
    $app: this.$target,
    initialState: initialState,
    buttonData,
  });
  this.$target.addEventListener("submit", onSubmit);

  $app.appendChild(this.$target);
}
