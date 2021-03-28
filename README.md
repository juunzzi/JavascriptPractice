# 나만의 자바스크립트 스케치북

라이브러리 시대가 도래했지만, 라이브러리 없이도 개발해야하는 방법을 알아야 하지않을까?

리액트를 잘하는 개발자보단 자바스크립트를 잘하는 개발자가 되어보자!!

## Form-Validator

_이름입력, 이메일입력, 비밀번호입력 등 유사한 폼이 다수 있어 클래스화 하여 개발을 진행하였다._

### 1. FormControl Class

#### constructor

```javascript
class FormControl {
  constructor(element, parent, errorMessage) {
    this.element = element;
    this.parent = parent;
    this.isPerfect = false;
    this.small = this.parent.querySelector("small");
    this.errorMessage = errorMessage;
  }
}
```

#### Member

- element : `input`타입의 노드
- parent : `input`타입의 부모 `form`태그
- isPerfect : `input`요소에 타당한 값이 들어갔는지 여부
- small : `small`태그
- errorMessage : `small`태그에 넣을 에러메세지

#### Method

- `FormControl.addKeydownEventListener(checkValidationFunction)`

  **Description : 검증 함수를 넣으면 해당 객체에 검증알고리즘으로 만들어진 리스너를 넣어 keydown이벤트를 걸어준다**

  **Params : Function**

  **Return : void**

  ```javascript
  addKeydownEventListener(checkValidation) {
    this.element.addEventListener(
      "keydown",
      this.createValidationListener(checkValidation)
    );
  }
  ```

  **Example**

  ```javascript
  form.username.addKeydownEventListener((e) => e.target.value.length < 3);
  ```

- `FormControl.createValidationListener(checkValidationFunction)`

  **Description : 검증 함수를 넣으면 리스너를 반환하는 함수이다.**

  **Params : Function**

  **Return : Function**

  ```javascript
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
  ```

  **Example**

  ```javascript
  /* FormControl 클래스의 addKeydownEventListener로 검증 알고리즘 보내면 */
  form.username.addKeydownEventListener((e) => e.target.value.length < 3);
  /* 다음과 같이 검증알고리즘 받아서 createValidationListener함수 실행 */
  addKeydownEventListener(checkValidation) {
    this.element.addEventListener(
      "keydown",
      this.createValidationListener(checkValidation)
    );
  }
  ```

### 2. Form Class

#### constructor

```javascript
class Form {
  constructor(form, username, email, password, password2) {
    this.form = form;
    this.username = username;
    this.email = email;
    this.password = password;
    this.password2 = password2;
  }
}
```

#### Member

- form : `FormControl` 이 가리키는 요소들으 최상단 `form` 태그이다.
- username : `FormControl` 객체이며, username과 관련된 요소
- email : `FormControl` 객체이며, email과 관련된 요소
- password : `FormControl` 객체이며, password과 관련된 요소
- password2 : `FormControl` 객체이며, password2과 관련된 요소

#### Method

- `Form.addSubmitEventListener(element,listener)`

  **Description : 요소와 리스너를 받아 제출 이벤트를 인자요소에 추가한다**

  **Params : Node, Function**

  **Return : None**

  ```javascript
   addSubmitEventListener(element, listener) {
    element.addEventListener("submit", listener);
  }
  ```

  **Example**

  ```javascript
  form.addSubmitEventListener(form.form, (e) => {
    e.preventDefault();

    if (form.getAllPerfect()) {
      form.alert();
      form.cleanValue();
    } else {
      alert("바보");
    }
  });
  ```

- `Form.getAllPerfect()`

  **Description : 모든 FormControl 요소들이 제대로 된 값을 가졌는지 체크한다.
  제대로 되지 않은 값을 가진 경우 error클래스를 추가한다.**

  **Params : void**

  **Return : bool**

  ```javascript
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
  ```

  **Example**

  ```javascript
  if (form.getAllPerfect()) {
    form.alert();
    form.cleanValue();
  } else {
    alert("바보");
  }
  ```

- ~~`Form.alert()`~~

  **Description : 제출 후 결과 값을 출력하는 용도.**

  **Params : void**

  **Return : void**

  ```javascript
   alert() {
    const result = `
    Username : ${this.username.element.value}\n
    Email:${this.email.element.value}\n
    Password${this.password.element.value}\n
    Password2:${this.password2.element.value}`;
    alert(result);
  }
  ```

  **Example**

  ```javascript
  form.alert();
  ```

- ~~`Form.cleanValue()`~~

  **Description : 제출 후 모든 값을 비우는 용도**

  **Params : void**

  **Return : void**

  ```javascript
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
  ```

  **Example**

  ```javascript
  form.cleanValue();
  ```

### 3.Global Util Function

- `findParentNode(selector)`

  **Description : 아이디 생성자를 입력받아 부모 노드를 찾는다**

  **Params : String**

  **Return : Node**

  ```javascript
  const findParentNode = function (text) {
    let parent = null;
    document.querySelectorAll(".form-control").forEach((item) => {
      if (item.contains(document.querySelector(text)) === true) {
        parent = item;
      }
    });
    return parent;
  };
  ```

  **Example**

  ```javascript
  const findParentNode = function (text) {
    let parent = null;
    document.querySelectorAll(".form-control").forEach((item) => {
      if (item.contains(document.querySelector(text)) === true) {
        parent = item;
      }
    });
    return parent;
  };
  ```

- `createFormControl(selector)`

  **Description : 아이디 생성자를 입력받아 FormControl객체를 생성한다**

  **Params : String**

  **Return : Obejct(FormControl)**

  ```javascript
  const createFormControl = function (text) {
    return new FormControl(document.querySelector(text), findParentNode(text));
  };
  ```

  **Example**

  ```javascript
  const usernameFormControl = createFormControl("#username");
  ```
