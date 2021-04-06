const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

// key point 1 string->number
let ticketPrice = +movieSelect.value;

//Get data from localStroage and populate UI ?
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    //   있다면
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        // 없다면 -1이 나오므로
        // 있다면 이곳으로
        seat.classList.add("selected");
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
    // set해주는 거임
  }
  updateSelectedCount();
}
populateUI();
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}
// update total count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  //   console.log(selectedSeats); => nodeList
  // 1.Copy Selected seats into arr
  // 2. Map through array
  // 3. return a new array
  const seatsIndex = [...selectedSeats].map(function (seat) {
    return [...seats].indexOf(seat);
  });
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Movie Select Event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, ticketPrice);
  updateSelectedCount();
});

// Seat Click Event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

// target vs currentTarget
// 변하는 값을 변수로 가져옴? 카운트 토탈 티켓프라이스 등... 헷갈리지 않게 변수화할것
// seats.forEach(addEvent) => not good way
// seatsIndex => 누른 방의 번호들 저장
//   console.log(e.target.selectedIndex, e.target.value);
// JSON.parse stringify
// populate
