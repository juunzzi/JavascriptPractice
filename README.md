# 나만의 자바스크립트 스케치북

라이브러리 시대가 도래했지만, 라이브러리 없이도 개발해야하는 방법을 알아야 하지않을까?

리액트를 잘하는 개발자보단 자바스크립트를 잘하는 개발자가 되어보자!!

# 목차

- [FORM-VALIDATOR](#FORM-VALIDATOR)
- [MOVIE-SEAT-BOOKING](#MOVIE-SEAT-BOOKING)
- [CUSTOM-VIDEO-PLAYER](#CUSTOM-VIDEO-PLAYER)
  <br>
  <br>
  <br>
  <br>
  <br>

## A.FORM-VALIDATOR

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

## B.MOVIE-SEAT-BOOKING

_자바스크립트를 최대한 라이브러리 환경처럼 작동하도록 개발.._

### 1. App Class

#### constructor

```javascript
class App {
  app;
  count;
  movieValue;
  selectedSeat;
  constructor(target) {
    this.app = target;
    this.text = this.app.querySelector(".text");
    this.movie = this.app.querySelector("#movie");
    this.allSeat = this.app.querySelectorAll(".seat");
  }
}
```

#### Member

- app : 이 앱을 포함하는 가장 큰 상단의 DOM요소를 가져와 이를 통해 하위 자식들 받아온다.
- count : 영화 좌석 몇 개가 필요한지 (local 저장)
- movieValue : 영화 좌석 한 개당 가격 (local 저장)
- selectedSeat : 선택된 자리 번호를 배열로 저장 (local 저장)
- text : `p`태그 `text`클래스로 선언된
- movie : `select`태그
- allSeat : `seat`클래스

#### Method

- `App.init()`

  **Description : 처음 js로드시 바로 실행되는 변수초기화 및 이벤트걸어주는 함수**

  **Params : void**

  **Return : void**

  ```javascript
  init() {
    this.getValue();
    this.setSeatClickEvent();
    this.setMovieChangeEvent();
    this.setState(true);
  }
  ```

  **Example**

  ```javascript
  new App(document.querySelector("body")).init();
  ```

- `App.setValue(object object)`

  **Description : 객체를 넣으면 객체안의 속성 값들을 로컬스토리지에 저장하는**

  **Params : Object**

  **Return : void**

  ```javascript
   setValue({ count, movie, selectedSeat }) {
    localStorage.setItem("count", count);
    localStorage.setItem("movieValue", movie);
    localStorage.setItem("selectedSeat", selectedSeat);
  }
  ```

  **Example**

  ```javascript
  this.setValue({
    count: this.count,
    movie: this.movie.value,
    selectedSeat: selectedSeat,
  });
  ```

- `App.getValue() `

  **Description : 로컬스토리지에 저장한 값을 모두 받아와 멤버에 저장하는 함수..**

  **Params : void**

  **Return : void**

  ```javascript
  getValue() {
    this.count = localStorage.getItem("count") || 0;
    this.movieValue = localStorage.getItem("movieValue") || 0;
    this.selectedSeat = JSON.parse(localStorage.getItem("selectedSeat")) || [];
  }
  ```

  **Example**

  ```javascript
  this.getValue();
  ```

- `App.setState(isInitial)`

  **Description : 요소와 리스너를 받아 제출 이벤트를 인자요소에 추가한다**

  **Params : boolean**

  **Return : void**

  ```javascript
  setState(isInitial) {
    this.text.querySelectorAll("span")[0].innerHTML = this.count;
    this.text.querySelectorAll("span")[1].innerHTML =
      this.count * this.movie.value;
    if (isInitial) {
      if (this.selectedSeat) {
        this.allSeat.forEach((item, index) => {
          if (this.selectedSeat.some((item) => item === index)) {
            item.classList.add("selected");
          }
        });
      }
      if (this.movieValue) {
        console.log(this.movie.target);
      }
    }
  }
  ```

  **Example**

  ```javascript
  this.setState(true); // 처음 실행(스테이트 로컬 값으로 초기화 시킬때)
  this.setState(); // 실행 중에 멤버 값 바꿀때
  ```

- `App.setSeatClickEvent()`

  **Description : 좌석 요소들에게 클릭이벤트를 걸어준다**

  **Params : void**

  **Return : bool**

  ```javascript
  setSeatClickEvent() {
    this.allSeat.forEach(
      (seat, index) =>
        seat.classList.value !== "seat occupied" &&
        seat.addEventListener("click", () => {
          let selectedSeat =
            JSON.parse(localStorage.getItem("selectedSeat")) || [];
          if (seat.classList.value === "seat") {
            seat.classList.add("selected");
            this.count++;
            selectedSeat = JSON.stringify([...selectedSeat, index]);
          } else if (seat.classList.value === "seat selected") {
            seat.classList.remove("selected");
            this.count--;
            selectedSeat = JSON.stringify(
              selectedSeat.filter((data) => data !== index)
            );
          }
          this.setState();
          this.setValue({
            count: this.count,
            movie: this.movie.value,
            selectedSeat: selectedSeat,
          });
        })
    );
  }
  ```

  **Example**

  ```javascript
  this.setSeatClickEvent();
  ```

- `App.setMovieChangeEvent()`

  **Description : `select`의 값이 변할때 마다 변할 핸들러를 걸어준다..**

  **Params : void**

  **Return : void**

  ```javascript
   setMovieChangeEvent() {
    this.movie.addEventListener("change", () => {
      this.setState();
      this.setValue({
        count: this.count,
        movie: this.movie.value,
        selectedSeat: localStorage.getItem("selectedSeat"),
      });
    });
  }
  ```

  **Example**

  ```javascript
  this.setMovieChangeEvent();
  ```

## C.CUSTOM-VIDEO-PLAYER

_함수형 프로그래밍으로 작성.._

### 1. Script.js

#### Method

- `videoControlsHandler`

  **Description : 컨트롤 부의 버튼과 인풋의 클릭이벤트를 제어하는 핸들러.**

  **Params : event**

  **Return : void**

  ```javascript
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
  ```

  **Example**

  ```javascript
  controls.addEventListener("click", videoControlsHandler);
  ```

- `videoTimeUpdateHandler`

  **Description : 비디오의 재생이 진행되는 동시에 실행되는 핸들러**

  **Params : void**

  **Return : void**

  ```javascript
  const videoTimeUpdateHandler = () => {
    videoRange.value = video.currentTime;
    setTimeStamp(video.currentTime);
  };
  ```

  **Example**

  ```javascript
  video.addEventListener("timeupdate", videoTimeUpdateHandler);
  ```

- `videoStart()`

  **Description : 비디오를 시작하는 함수. 시작과 동시에 이벤트도 추가 버튼이미지도변경**

  **Params : void**

  **Return : void**

  ```javascript
  const videoStart = function () {
    this.className = "fa fa-pause fa-2x";
    videoRange.max = video.duration;
    video.play();
    video.addEventListener("timeupdate", videoTimeUpdateHandler);
    video.addEventListener("ended", videoPause);
  };
  ```

  **Example**

  ```javascript
  videoStart.apply(playPauseButton);
  ```

- `videoPause()`

  **Description : 비디오의 중지 실행.**

  **Params : void**

  **Return : void**

  ```javascript
  const videoPause = function () {
    playPauseButton.className = "fa fa-play fa-2x";
    video.pause();
  };
  ```

  **Example**

  ```javascript
  videoPause();
  ```

- `setTimeStamp ()`

  **Description : 타임스탬프에 글자를 갱신해준다.**

  **Params : videoCurrentTime**

  **Return : void**

  ```javascript
  const setTimeStamp = (videoCurrentTime) => {
    const min = Number.parseInt(videoCurrentTime / 60);
    const sec = Number.parseInt(videoCurrentTime % 60);
    timeStamp.innerText = `${min < 10 ? `0${min}` : min}:${
      sec < 10 ? `0${sec}` : sec
    }`;
  };
  ```

  **Example**

  ```javascript
  setTimeStamp(e.target.value);
  ```

## C.EXCHANGE-RATE

_함수형 프로그래밍으로 작성.._

### 1. Script.js

#### Method

- `select change listener handler`

  **Description : 환전하려는 화페를 변경하면 실행되는 함수.**

  **Params : event**

  **Return : void**

  ```javascript
  () => {
    swapButton.click();
  };
  ```

- `swap button click listener handler`

  **Description : 스왑버튼을 클릭하면 실행되는 함수**

  **Params : void**

  **Return : void**

  ```javascript
  () => {
    fetch(
      `https://api.exchangerate-api.com/v4/latest/${currencyOneSelect.value}`
    )
      .then((res) => res.json())
      .then(({ conversion_rates: rates }) => {
        rate.innerText =
          rates[currencyTwoSelect.value] * currencyOneAmount.value;
        currencyTwoAmount.value =
          rates[currencyTwoSelect.value] * currencyOneAmount.value;
      });
  };
  ```
