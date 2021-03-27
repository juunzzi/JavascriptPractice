const slideList = document.querySelector(".slide_list");
const slideContents = document.querySelectorAll(".slide_content");
const slideBtnNext = document.querySelector(".slide_btn_next");
const slideBtnPrev = document.querySelector(".slide_btn_prev");
const pagination = document.querySelector(".slide_pagination");
const slideLength = slideContents.length;
const slideWidth = 400;
const slideSpeed = 300;
const startNum = 0;
slideList.style.width = slideWidth * (slideLength + 2) + "px";
// firstElementChild vs firstChild
let firstChild = slideList.firstElementChild;
let lastChild = slideList.lastElementChild;

let cloneFirst = firstChild.cloneNode(true);
let cloneLast = lastChild.cloneNode(true);

// append(cloneNode) vs append(firstElementChild)
// 복제본을 붙이는가 vs 요소 그 자체를 붙이는가 (이상해짐)
slideList.appendChild(cloneFirst);
slideList.insertBefore(cloneLast, slideList.firstElementChild);

slideList.style.transform =
  "translate3d(-" + slideWidth * (startNum + 1) + "px,0px,0px)";

let curIndex = startNum;
let curSlide = slideContents[curIndex];
/* pageNation */
let pageChild = "";
for (var i = 0; i < slideLength; i++) {
  pageChild += '<li class="dot';
  pageChild += i === startNum ? " dot_active" : "";
  pageChild += '" data-index="' + i + '"><a href="#"></a></li>';
}
pagination.innerHTML = pageChild;
const pageDots = document.querySelectorAll(".dot");
/* pageNation */

slideBtnNext.addEventListener("click", function () {
  if (curIndex <= slideLength - 1) {
    slideList.style.transition = slideSpeed + "ms";
    slideList.style.transform =
      "translate3d(-" + slideWidth * (curIndex + 2) + "px,0px,0px)";
  }
  if (curIndex === slideLength - 1) {
    setTimeout(() => {
      slideList.style.transition = "0ms";
      slideList.style.transform = "translate3d(-" + slideWidth + "px,0px,0px";
    }, slideWidth);
    curIndex = -1;
  }
  pageDots[curIndex === -1 ? slideLength - 1 : curIndex].classList.remove(
    "dot_active"
  );
  curSlide = slideContents[++curIndex];
  pageDots[curIndex].classList.add("dot_active");
});
slideBtnPrev.addEventListener("click", function () {
  if (curIndex >= 0) {
    slideList.style.transition = slideSpeed + "ms";
    slideList.style.transform =
      "translate3d(-" + slideWidth * curIndex + "px,0px,0px)";
  }
  if (curIndex === 0) {
    setTimeout(() => {
      slideList.style.transition = "0ms";
      slideList.style.transform =
        "translate3d(-" + slideWidth * slideLength + "px,0px,0px)";
    }, slideSpeed);
    curIndex = slideLength;
  }
  pageDots[curIndex === slideLength ? 0 : curIndex].classList.remove(
    "dot_active"
  );
  curSlide = slideContents[--curIndex];
  pageDots[curIndex].classList.add("dot_active");
});
