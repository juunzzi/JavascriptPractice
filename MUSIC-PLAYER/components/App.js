import Audio from "./Audio.js";
import Img from "./Img.js";
import MusicInfo from "./MusicInfo.js";
import Navigation from "./Navigation.js";
const Musics = ["music/ukulele.mp3", "music/hey.mp3", "music/summer.mp3"];
const Imgs = ["images/ukulele.jpg", "images/hey.jpg", "images/summer.jpg"];
export default function App($app) {
  this.state = {
    currentMusicIndex: 0,
    musicTitle: Musics[0].match(/([a-z]*)\/([a-z]*)/)[2],
    progress: 0,
    music: Musics[0],
    musicImage: Imgs[0],
    isPaused: true,
    isMusicChanged: true,
  };
  this.musicInfo = new MusicInfo({
    $app,
    initialState: {
      musicTitle: this.state.musicTitle,
      progress: this.state.progress,
    },
    onClickProgressBar: (e) => {
      const progress = (e.offsetX / e.target.offsetWidth) * 100;
      this.setState({ ...this.state, progress });
      this.audio.$target.currentTime =
        (progress * this.audio.$target.duration) / 100;
    },
  });
  this.audio = new Audio({
    $app,
    initialState: {
      music: this.state.music,
      isPaused: this.state.isPaused,
      isMusicChanged: this.state.isMusicChanged,
    },
    onTimeUpdate: () => {
      const current =
        (this.audio.$target.currentTime / this.audio.$target.duration) * 100;
      this.setState({ ...this.state, progress: current });
    },
  });
  this.img = new Img({
    $app,
    initialState: {
      musicImage: this.state.musicImage,
    },
  });
  this.navigation = new Navigation({
    $app,
    initialState: {
      isPaused: this.state.isPaused,
    },
    onClickPlay: () => {
      this.setState({
        ...this.state,
        isPaused: !this.state.isPaused,
        isMusicChanged: false,
      });
    },
    onClickNext: () => {
      const nextIndex = (this.state.currentMusicIndex + 1) % 3;
      this.setState({
        ...this.state,
        currentMusicIndex: nextIndex,
        musicTitle: Musics[nextIndex].match(/([a-z]*)\/([a-z]*)/)[2],
        progress: 0,
        music: Musics[nextIndex],
        musicImage: Imgs[nextIndex],
        isPaused: true,
        isMusicChanged: true,
      });
    },
    onClickPrev: () => {
      const nextIndex =
        this.state.currentMusicIndex === 0
          ? 2
          : (this.state.currentMusicIndex - 1) % 3;
      this.setState({
        ...this.state,
        currentMusicIndex: nextIndex,
        musicTitle: Musics[nextIndex].match(/([a-z]*)\/([a-z]*)/)[2],
        progress: 0,
        music: Musics[nextIndex],
        musicImage: Imgs[nextIndex],
        isMusicChanged: true,
        isPaused: true,
      });
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;
    this.musicInfo.setState({
      musicTitle: this.state.musicTitle,
      progress: this.state.progress,
    });
    this.audio.setState({
      music: this.state.music,
      isPaused: this.state.isPaused,
      isMusicChanged: this.state.isMusicChanged,
    });
    this.navigation.setState({ isPaused: this.state.isPaused });
    this.img.setState({ musicImage: this.state.musicImage });
    this.render();
  };
  this.render = () => {
    if (!this.state.isPaused) {
      // 음악재생중
      $app.classList.add("play");
    } else {
      $app.classList.remove("play");
    }
  };
}
