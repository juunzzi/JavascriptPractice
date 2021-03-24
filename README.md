# 나만의 자바스크립트 스케치북

라이브러리 시대가 도래했지만, 라이브러리 없이도 개발해야하는 방법을 알아야 하지않을까?

리액트를 잘하는 개발자보단 자바스크립트를 잘하는 개발자가 되어보자!!

## Form-Validator

_이름입력, 이메일입력, 비밀번호입력 등 유사한 폼이 다수 있어 클래스화 하여 개발을 진행하였다._

- `findParentNode(selector)`

  **Description : 아이디 생성자를 입력받아 부모 노드를 찾는다**

  **Params : String**

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

  ```javascript
  const createFormControl = function (text) {
    return new FormControl(document.querySelector(text), findParentNode(text));
  };
  ```

- `Form.addKeydownEventListener(element,listener)`

  **Description : 요소와 리스너를 받아 키다운 이벤트를 인자요소에 추가한다**

  **Params : Node, Function**

  ```javascript
  addKeydownEventListener(element, listener) {
    element.addEventListener("keydown", listener);
  }
  ```
