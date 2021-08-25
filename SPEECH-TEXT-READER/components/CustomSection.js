import { createElementSettingAttr } from "../utils/utils.js";

export default class CustomSection {
  constructor({ $app, state, onChange }) {
    this.$app = $app;
    this.state = state;
    this.$target;
    this.init();

    if (
      typeof speechSynthesis !== "undefined" &&
      speechSynthesis.onvoiceschanged !== undefined
    ) {
      speechSynthesis.onvoiceschanged = this.populateVoiceList;
    }

    this.populateVoiceList();
    this.select.addEventListener("click", onChange);
  }
  setState(nextState) {
    this.state = nextState;
    this.render();
  }
  render() {
    if (this.state.isShowSetting) {
      this.$target.classList.add("show");
    } else {
      this.$target.classList.remove("show");
    }
  }
  init() {
    //   CustomSection Parent
    this.$target = createElementSettingAttr("div", {
      id: "text-box",
      class: "text-box",
    });

    // CustomSection Childrens
    this.closeBtn = createElementSettingAttr(
      "div",
      {
        id: "close",
        class: "close",
      },
      "X"
    );
    // select
    this.select = createElementSettingAttr("select", { id: "voices" });

    // textarea
    this.textarea = createElementSettingAttr("textarea", {
      id: "text",
      placeholder: "Enter text to read...",
    });
    this.readBtn = createElementSettingAttr(
      "button",
      { id: "read", class: "btn" },
      "Read Text"
    );

    // append CustomSection Childrens
    this.$target.innerHTML = `${this.closeBtn.outerHTML}
     <h3>Choose Voice</h3>
         ${this.select.outerHTML}
        ${this.textarea.outerHTML}
      ${this.readBtn.outerHTML}
    `;

    // append CustomSection
    this.$app.appendChild(this.$target);

    // event
  }
  populateVoiceList() {
    if (typeof speechSynthesis === "undefined") {
      return;
    }

    let voices = speechSynthesis.getVoices();

    for (let i = 0; i < voices.length; i++) {
      let option = document.createElement("option");
      option.textContent = voices[i].name + " (" + voices[i].lang + ")";

      if (voices[i].default) {
        option.textContent += " -- DEFAULT";
      }

      //   option.setAttribute("data-lang", voices[i].lang);
      //   option.setAttribute("data-name", voices[i].name);
      option.value = voices[i].lang;
      document.querySelector("#voices").appendChild(option);
    }
  }
}
