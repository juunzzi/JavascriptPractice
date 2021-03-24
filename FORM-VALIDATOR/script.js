class FormControl {
  constructor(element, parent) {
    this.element = element;
    this.parent = parent;
  }
}
class Form {
  constructor(username, email, password, password2) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.password2 = password2;
  }
  print() {
    console.log(this.username);
    console.log(this.email);
    console.log(this.password);
    console.log(this.password2);
  }
  addKeydownEventListener(element, listener) {
    element.addEventListener("keydown", listener);
  }
}

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
  usernameFormControl,
  emailFormControl,
  passwordFormControl,
  password2FormControl
);
form.addKeydownEventListener(form.username.element, (e) => {
  if (e.target.value.length < 2) {
    form.username.parent.classList.add("error");
  } else {
    form.username.parent.classList.remove("error");
    form.username.parent.classList.add("success");
  }
});
form.addKeydownEventListener(form.email.element, (e) => {
  if (e.target.value.length < 2) {
    form.email.parent.classList.add("error");
  } else {
    form.email.parent.classList.remove("error");
    form.email.parent.classList.add("success");
  }
});
form.addKeydownEventListener(form.password.element, (e) => {
  if (e.target.value.length < 2) {
    form.password.parent.classList.add("error");
  } else {
    form.password.parent.classList.remove("error");
    form.password.parent.classList.add("success");
  }
});
form.addKeydownEventListener(form.password2.element, (e) => {
  if (e.target.value.length < 2) {
    form.password2.parent.classList.add("error");
  } else {
    form.password2.parent.classList.remove("error");
    form.password2.parent.classList.add("success");
  }
});
