const slideList = document.querySelector(".slide_list");
const slideContents = document.querySelectorAll(".slide_content");
const slideBtnNext = document.querySelector(".slide_btn_next");
const slideBtnPrev = document.querySelector(".slide_btn_prev");
const pagination = document.querySelector(".slide_pagination");
const slideLength = slideContents.length;
const slideWidth = 400;
const slideSpeed = 300;

slideList.style.width = slideWidth * slideLength + "px";
// 길이만큼 다 더해서 총 길이 만들어낸다.
let currentIndex = 0;

slideBtnNext.addEventListener("click", function () {
  console.log("click");
  if (currentIndex < slideLength - 1) {
    slideList.style.transition = slideSpeed + "ms";
    slideList.style.transform = `translate3d(-${
      slideWidth * (currentIndex++ + 1)
    }px,0px,0px)`;
  } else {
    slideList.style.transform = "transform3d(0px,0px,0px)";
    currentIndex = -1;
    slideList.style.transform = `translate3d(-${
      slideWidth * (currentIndex++ + 1)
    }px,0px,0px)`;
  }
});
