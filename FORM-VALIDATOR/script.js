class FormControl {
  constructor(element, parent) {
    this.element = element;
    this.parent = parent;
    this.isPerfect = false;
  }
  createValidationListener(checkValidation) {
    return (e) =>
      setTimeout(() => {
        if (e.target.value === "") {
          this.parent.classList.remove("error");
        } else {
          if (checkValidation(e)) {
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
    }
    if (!this.email.isPerfect) {
      this.email.parent.classList.add("error");
    }
    if (!this.password.isPerfect) {
      this.password.parent.classList.add("error");
    }
    if (!this.password2.isPerfect) {
      this.password2.parent.classList.add("error");
    }
    return (
      this.username.isPerfect &&
      this.email.isPerfect &&
      this.password.isPerfect &&
      this.password2.isPerfect
    );
  }
  alert() {
    const result = `
    Username : ${this.username.element.value}\n
    Email:${this.email.element.value}\n
    Password${this.password.element.value}\n
    Password2:${this.password2.element.value}`;
    alert(result);
  }
  cleanValue() {
    form.username.element.value = "";
    form.username.parent.classList.remove("success");

    form.email.element.value = "";
    form.email.parent.classList.remove("success");

    form.password.element.value = "";
    form.password.parent.classList.remove("success");

    form.password2.element.value = "";
    form.password2.parent.classList.remove("success");
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
const createFormControl = function (text) {
  return new FormControl(document.querySelector(text), findParentNode(text));
};
const usernameFormControl = createFormControl("#username");
const emailFormControl = createFormControl("#email");
const passwordFormControl = createFormControl("#password");
const password2FormControl = createFormControl("#password2");
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
    form.alert();
    form.cleanValue();
  } else {
    alert("바보");
  }
});
