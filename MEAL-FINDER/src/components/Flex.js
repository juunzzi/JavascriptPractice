import { randomIcon, searchIcon } from "../utils/icon.js";
import Button from "./Button.js";
import Form from "./Form.js";

export default function ({
  $app,
  initialState,
  onSubmit,
  onRandomButtonHandler,
}) {
  this.$target = document.createElement("div");
  this.$target.setAttribute("class", "flex");
  $app.appendChild(this.$target);
  // 서치버튼 데이터
  const formButtonData = {
    icon: searchIcon,
    onClick: null,
    className: "search-btn",
    type: "submit",
    id: null,
  };
  // 랜덤버튼 데이터
  const randomButtonData = {
    icon: randomIcon,
    onClick: onRandomButtonHandler,
    className: "random-btn",
    type: null,
    id: "random",
  };
  // 폼
  new Form({
    $app: this.$target,
    initialState,
    onSubmit,
    buttonData: formButtonData,
  });
  // 랜덤버튼
  new Button({
    $app: this.$target,
    initialState,
    buttonData: randomButtonData,
  });
}
