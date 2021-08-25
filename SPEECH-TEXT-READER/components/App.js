import TextSection from "./TextSection.js";
import CustomSection from "./CustomSection.js";
import { createElementSettingAttr } from "../utils/utils.js";

export class App {
  constructor({ $app }) {
    this.$app = $app;
    this.state = {
      isShowSetting: false,
      voice: "Alex en-US",
      inputText: "",
    };

    this.init();
  }
  setState(nextState) {
    this.state = nextState;
    this.customSection.setState({
      isShowSetting: this.state.isShowSetting,
      voice: this.state.voice,
      inputText: this.state.inputText,
    });
  }
  render() {}
  init() {
    this.settingBtn = createElementSettingAttr(
      "button",
      {
        id: "toggle",
        class: "btn btn-toggle",
      },
      "Toggle Text Box"
    );
    this.$app.appendChild(this.settingBtn);

    this.textSection = new TextSection({
      $app: this.$app,
      onClick: () => {
        const speech = new SpeechSynthesisUtterance();
        // speech.rate = 1;
        // speech.pitch = 5;
        // speech.lang = "ko-KR";
        // speech.text = "하나둘셋";
        // window.speechSynthesis.speak(speech);
      },
    });
    this.customSection = new CustomSection({
      $app: this.$app,
      state: {
        isShowSetting: this.state.isShowSetting,
        voice: this.state.voice,
        inputText: this.state.inputText,
      },
      onChange: (e) => {
        console.log(e.target.value);
      },
    });

    this.settingBtn.addEventListener("click", () => {
      this.setState({
        ...this.state,
        isShowSetting: !this.state.isShowSetting,
      });
    });
  }
}
