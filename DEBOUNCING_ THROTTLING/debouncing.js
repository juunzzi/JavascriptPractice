const input = document.querySelector("#input");
let timer;
input.addEventListener("input", (e) => {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    console.log(e.target.value);
  }, 1000);
});
