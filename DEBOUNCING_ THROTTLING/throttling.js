const t_input = document.querySelector("#t_input");
let t_timer;
t_input.addEventListener("input", (e) => {
  if (!t_timer) {
    //없다면
    t_timer = setTimeout(() => {
      t_timer = null;
      console.log(e.target.value);
    }, 2000);
    //이렇게하면 최소 2초임. 여러번 인풋을 변경하더라도. (스크롤 이벤트에 사용하면 좋을듯.  )
  }
});
