export default function Button({
  $app,
  initialState,
  buttonData: { className, type, id, onClick, icon },
}) {
  this.$target = document.createElement("button");
  if (className) this.$target.setAttribute("class", className);
  if (type) this.$target.setAttribute("type", type);
  if (id) this.$target.setAttribute("id", id);
  if (onClick) this.$target.addEventListener("click", onClick);
  if (icon) this.$target.innerHTML = icon;

  $app.appendChild(this.$target);
}
