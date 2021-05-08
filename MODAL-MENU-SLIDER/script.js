const modal = document.querySelector(".modal-container");
const body = document.querySelector("body");
const toggleBtn = document.querySelector("#toggle");
const ctaBtn = document.querySelector(".cta-btn");
const closeBtn = document.querySelector(".close-btn");
const btnHandler = (element, className) => {
  return () => {
    element.classList.toggle(className);
  };
};
toggleBtn.addEventListener("click", btnHandler(body, "show-nav"));
ctaBtn.addEventListener("click", btnHandler(modal, "show-modal"));
closeBtn.addEventListener("click", btnHandler(modal, "show-modal"));
