import { Button } from "./Button.js";
import { Container } from "./Container.js";
import { Setting } from "./Setting.js";
const word = [
  "jang",
  "jun",
  "hyeok",
  "park",
  "chae",
  "young",
  "nam",
  "taek",
  "hoooon",
  "moon",
  "zzin",
];
export function App({ $app }) {
  this.state = {
    time: 10,
    score: 0,
    currentWord: word[0],
    wordIndex: 0,
    bonusTime: 2,
    end: false,
    setting: true,
    inputValue: "",
  };
  const button = new Button({
    $app,
    onClick: () => {
      this.setState({ ...this.state, setting: !this.state.setting });
    },
  });
  const container = new Container({
    $app,
    onChange: (e) => {
      if (this.state.currentWord === e.target.value) {
        this.setState({
          ...this.state,
          currentWord: word[(this.state.wordIndex + 1) % word.length],
          wordIndex: this.state.wordIndex + 1,
          time: this.state.time + this.state.bonusTime,
          score: this.state.score + 1,
          inputValue: "",
        });
      } else {
        // e.target.value가 위 setState에 의해 변해버린 값을 조회하게됨.
        this.setState({ ...this.state, inputValue: e.target.value });
      }
    },
    onReload: () => {
      window.location.reload();
    },
    initialState: {
      currentWord: this.state.currentWord,
      score: this.state.score,
      time: this.state.time,
      end: this.state.end,
      inputValue: this.state.inputValue,
    },
  });
  const setting = new Setting({
    $app,
    onChange: ({ target: { value } }) => {
      switch (value) {
        case "easy":
          this.setState({ ...this.state, bonusTime: 4 });
          break;
        case "medium":
          this.setState({ ...this.state, bonusTime: 2 });
          break;
        case "hard":
          this.setState({ ...this.state, bonusTime: 1 });
          break;
      }
    },
    initialState: {
      setting: this.state.setting,
    },
  });
  this.setState = (newState) => {
    this.state = newState;
    container.setState({
      currentWord: this.state.currentWord,
      score: this.state.score,
      time: this.state.time,
      end: this.state.end,
      inputValue: this.state.inputValue,
    });
    setting.setState({
      setting: this.state.setting,
    });
  };
  this.init = () => {
    //   게임시간이 줄어든다.
    const interval = setInterval(() => {
      if (this.state.time === 0) {
        clearInterval(interval);
        this.setState({ ...this.state, end: true });
      }
      this.setState({ ...this.state, time: this.state.time - 1 });
    }, 1000);
  };
  this.init();
}
