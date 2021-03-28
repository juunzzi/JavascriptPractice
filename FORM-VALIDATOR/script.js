class FormControl {
  constructor(element, parent, errorMessage) {
    this.element = element;
    this.parent = parent;
    this.isPerfect = false;
    this.small = this.parent.querySelector("small");
    this.errorMessage = errorMessage;
  }
  createValidationListener(checkValidation) {
    return (e) =>
      setTimeout(() => {
        if (e.target.value === "") {
          this.parent.classList.remove("error");
        } else {
          if (checkValidation(e)) {
            this.small.innerText = this.errorMessage;
            this.parent.classList.remove("success");
            this.parent.classList.add("error");
            this.isPerfect = false;
          } else {
            this.parent.classList.remove("error");
            this.parent.classList.add("success");
            this.isPerfect = true;
          }
        }
      }, 0);
  }
  addKeydownEventListener(checkValidation) {
    this.element.addEventListener(
      "keydown",
      this.createValidationListener(checkValidation)
    );
  }
}
class Form {
  constructor(form, username, email, password, password2) {
    this.form = form;
    this.username = username;
    this.email = email;
    this.password = password;
    this.password2 = password2;
  }

  addSubmitEventListener(element, listener) {
    element.addEventListener("submit", listener);
  }
  getAllPerfect() {
    if (!this.username.isPerfect) {
      this.username.parent.classList.add("error");
      (() =>
        this.username.element.value === "" &&
        (this.username.small.innerText = "이름이 필요합니다"))();
    }
    if (!this.email.isPerfect) {
      this.email.parent.classList.add("error");
      (() =>
        this.email.element.value === "" &&
        (this.email.small.innerText = "이메일이 필요합니다"))();
    }
    if (!this.password.isPerfect) {
      this.password.parent.classList.add("error");
      (() =>
        this.password.element.value === "" &&
        (this.password.small.innerText = "비밀번호가 필요합니다"))();
    }
    if (!this.password2.isPerfect) {
      this.password2.parent.classList.add("error");
      (() =>
        this.password2.element.value === "" &&
        (this.password2.small.innerText = "비밀번호2가 필요합니다"))();
    }
    return (
      this.username.isPerfect &&
      this.email.isPerfect &&
      this.password.isPerfect &&
      this.password2.isPerfect
    );
  }
}
const emailExp = /^([0-9a-zA-Z_-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/i;
/**
 * 자식 요소의 아이디값으로 부모요소를 찾는다.
 * @method findParentNode
 * @param {String} text 아이디값 */
const findParentNode = function (text) {
  let parent = null;
  document.querySelectorAll(".form-control").forEach((item) => {
    if (item.contains(document.querySelector(text)) === true) {
      parent = item;
    }
  });
  return parent;
};
/**
 * 아이디 값으로 자식요소와 부모요소를 찾아 FormControl 객체 생성
 * @method createFormControl
 * @param {String} text 아이디값 */
const createFormControl = function (text, errorMessage) {
  return new FormControl(
    document.querySelector(text),
    findParentNode(text),
    errorMessage
  );
};

const usernameFormControl = createFormControl("#username", "최소 세 글자 이상");
const emailFormControl = createFormControl("#email", "타당하지 않은 이메일");
const passwordFormControl = createFormControl(
  "#password",
  "최소 여섯글자 이상"
);
const password2FormControl = createFormControl(
  "#password2",
  "동일하지 않습니다."
);
const form = new Form(
  document.querySelector(".form"),
  usernameFormControl,
  emailFormControl,
  passwordFormControl,
  password2FormControl
);
form.username.addKeydownEventListener((e) => e.target.value.length < 3);
form.email.addKeydownEventListener((e) => !e.target.value.match(emailExp));
form.password.addKeydownEventListener((e) => e.target.value.length < 6);
form.password2.addKeydownEventListener(
  (e) => e.target.value !== form.password.element.value
);
form.addSubmitEventListener(form.form, (e) => {
  e.preventDefault();
  if (form.getAllPerfect()) {
    console.log("okay");
  } else {
    console.log("nokay");
  }
});
