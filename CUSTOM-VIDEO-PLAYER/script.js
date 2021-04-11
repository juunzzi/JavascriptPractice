const playPauseButton = document.querySelector("#play").firstElementChild;
const stopButton = document.querySelector("#stop").firstElementChild;
const controls = document.querySelector(".controls");
const videoRange = document.querySelector("#progress");
const timeStamp = document.querySelector("#timestamp");
const video = document.querySelector("#video");
const setTimeStamp = (videoCurrentTime) => {
  const min = Number.parseInt(videoCurrentTime / 60);
  const sec = Number.parseInt(videoCurrentTime % 60);
  timeStamp.innerText = `${min < 10 ? `0${min}` : min}:${
    sec < 10 ? `0${sec}` : sec
  }`;
};
const videoStart = function () {
  this.className = "fa fa-pause fa-2x";
  videoRange.max = video.duration;
  video.play();
  video.addEventListener("timeupdate", videoTimeUpdateHandler);
  video.addEventListener("ended", videoPause);
};
const videoPause = function () {
  playPauseButton.className = "fa fa-play fa-2x";
  video.pause();
};

const videoTimeUpdateHandler = () => {
  videoRange.value = video.currentTime;
  setTimeStamp(video.currentTime);
};
const videoControlsHandler = function handler(e) {
  if (e.target === playPauseButton) {
    if (playPauseButton.className === "fa fa-play fa-2x") {
      videoStart.apply(playPauseButton);
    } else if (playPauseButton.className === "fa fa-pause fa-2x") {
      videoPause();
    }
  } else if (e.target === stopButton) {
    video.currentTime = 0;
    videoPause();
  } else if (e.target === videoRange) {
    video.currentTime = e.target.value;
    setTimeStamp(e.target.value);
  }
};

controls.addEventListener("click", videoControlsHandler);

// controls.addEventListener.apply(playPauseButton, [
//   "click",
//   function handler() {
//     console.log(this);
//   },
// ]);
/// controls에서 재생버튼을 누를때만 HANDLER가 실행된다.. this로 보내준 요소를 클릭했을때만
/// handler가 실행됨..
