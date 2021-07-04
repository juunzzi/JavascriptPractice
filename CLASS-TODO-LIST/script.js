// console.log(document.querySelector(".aa").closest(".a"));
document.querySelector(".a").addEventListener("click", (e) => {
  //   console.log(e.target);
  console.log(e.target.closest(".aa"));
});

document.querySelector(".buttonForm").addEventListener("click", (e) => {
  //   console.log(e.target);
  console.log(e.target.closest(".abc"));
  console.log(e.target.closest(".def"));
});
console.log(document.querySelectorAll(".a"));
console.log([...document.querySelectorAll(".a")]);
