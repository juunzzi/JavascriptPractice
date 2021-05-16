export default function Input({ $app, initialState }) {
  this.$target = document.createElement("input");
  this.$target.setAttribute("type", "text");
  this.$target.setAttribute("id", "search");
  this.$target.setAttribute("placeholder", "Search for meals or keywords");
  $app.appendChild(this.$target);
}
