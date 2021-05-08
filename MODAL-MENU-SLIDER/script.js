const toggleBtn = document.querySelector("#toggle");
const ctaBtn = document.querySelector(".cta-btn");
const closeBtn = document.querySelector(".close-btn");
const btnHdr = (elementName, className) => {
  const element = document.querySelector(elementName);
  return () => element.classList.toggle(className);
};
toggleBtn.addEventListener("click", btnHdr("body", "show-nav"));
ctaBtn.addEventListener("click", btnHdr(".modal-container", "show-modal"));
closeBtn.addEventListener("click", btnHdr(".modal-container", "show-modal"));
