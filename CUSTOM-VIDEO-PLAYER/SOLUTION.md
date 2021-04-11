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

### [1].`progress.value = (video.currentTime / video.duration) * 100;`

- 사용 예

```javascript
progress.value = (video.currentTime / video.duration) * 100;
```

- 설명
  본인은 max값을 `video.duration`으로 바꾸어 시작. 유데미는 백분율로 하여 더 깔끔한 코드를 연출했으므로 성공.

### [2] `toggleVideoStatus()`

- 사용 예

```javascript
function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}
```

- 설명
  나는 `videoPlay()` `videoPause()` 함수를 각각 만들어 사용. 유데미는 분기를 나누어 하나의 함수로 처리. 유데미가 승리.

### [3] `setVideoProgress()`

- 사용 예

```javascript
function setVideoProgress() {
  video.currentTime = (+progress.value * video.duration) / 100;
}
```

- 설명
  기존의 progress를 백분율로 증가시켜서 가져올때도 밸류값 가져온다음에 듀레이션을 곱하고 백으로 나눈 백분율의 형태로 가져옴.
