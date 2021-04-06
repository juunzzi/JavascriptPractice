# MOVIE-SEAT-BOOKING SOLUTION

내 코드와 비교하면서 잘못한걸 되짚어본다.

# 목차

- '나'와 달랐던 '유데미'의 코딩방식
- 배운점 및 느낀점
  <br>
  <br>

## '나'와 달랐던 '유데미'의 코딩방식

_전체적으로 변하게 될거같은 값은 변수로 정해두고 그걸 계속 사용한다. 같은 값을 가리키는데 여러의미를 갖는 변수 많이 만들지 말자!_
<br>
<br>
<br>

### [1].`ticketPrice = +e.target.value;`

- 사용 예

```javascript
const movieSelect = document.getElementById("movie");

// key point 1 string->number
let ticketPrice = +movieSelect.value;
```

- 설명

  위 코드에서 movieSelect는 영화를 선택하는 `select`태그 인풋창이다. `movieSelect.value`는 문자열로 `select.value`속성에 해당하는 값이 반환된다. 문자열로 되어 있으면 계산이 힘들어 지니 정수로 바꾸어주어야 하는데, 이를 위해 +기호를 붙인것으로 보인다.

  - +안붙이면 string
  - +붙이면 number

### [2] `container.addEventListener('click',()=>{})`

- 사용 예

```javascript
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});
```

- 설명

  위 코드에서 forEach로 순회하며 각 아이템들에 이벤트를 붙이지 않은 이유는 이벤트 버블링이라는 기능이 존재하기 때문이다. 각 아이템들을 순회하며 이벤트를 붙이게되면 매우 비효율적, 그래서 가장 최상위에 `click event`를 걸어주어 자식 태그들에 접근한다.

  - 나는 순회하며 모든 `seat`에 이벤트를 걸어주었다.
  - 유데미는 부모컨테이너에 이벤트를 걸어주었다.

- 레퍼런스

  https://joshua1988.github.io/web-development/javascript/javascript-interview-3questions/#%EC%A7%88%EB%AC%B8-1--%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EC%9C%84%EC%9E%84%ED%95%98%EA%B8%B0

### [3] `array.indexOf()`

- 사용 예

```javascript
const seatsIndex = [...selectedSeats].map(function (seat) {
  return [...seats].indexOf(seat);
});
```

- 설명

  눌린 좌석들의 인덱스들을 저장하기 위해 map으로 순회하며 각 방 번호가 몇 번인지 받아왔다. 나와의 차이는 별로없는거같지만, 정확한건 확실히 유데미 방법이다.

  - 나는 그냥 `seats`를 받아와 접근
  - 자세하게 방번호 조사하여 접근

### [4] `array = [...nodeList]`

- 사용 예

```javascript
const selectedSeats = document.querySelectorAll(".row .seat.selected");

const seatsIndex = [...selectedSeats].map(function (seat) {
  return [...seats].indexOf(seat);
});
```

- 설명

  이건 좋은 방법이다. `selectedSeats`는 nodeList로 받아온다. 일반 Array와 달라 사용하는 함수도 다른데, 이 차이가 불편하기에 유데미는 `[...selectedSeats]`라는 코드로 일반 배열로 풀어내 코드함.

  - 유데미는 일반 Array로 만들어사용
  - 나는 그냥 `nodeList`배열함수사용

### [5] `JSON`

- 사용 예

```javascript
const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
```

- 설명

  유데미와 나의 코드가 유사.

  - `JSON.stringify` 배열을 문자열로 만들어 저장.
  - `JSON.parse` 저장된 문자열을 배열로 바꾸어 가져옴
