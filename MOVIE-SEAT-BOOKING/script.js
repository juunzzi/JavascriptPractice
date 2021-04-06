class App {
  constructor(target) {
    this.app = target;
    this.text = this.app.querySelector(".text");
    this.movie = this.app.querySelector("#movie");
    this.allSeat = this.app.querySelectorAll(".seat");
  }

  setValue({ count, movie, selectedSeat }) {
    localStorage.setItem("count", count);
    localStorage.setItem("movieValue", movie);
    localStorage.setItem("selectedSeat", selectedSeat);
  }
  getValue() {
    this.count = localStorage.getItem("count") || 0;
    this.localStorageMovieValue = localStorage.getItem("movieValue") || 10;
    this.selectedSeat = JSON.parse(localStorage.getItem("selectedSeat")) || [];
  }
  setState(isInitial) {
    if (isInitial) {
      if (this.selectedSeat) {
        this.allSeat.forEach((item, index) => {
          if (this.selectedSeat.some((item) => item === index)) {
            item.classList.add("selected");
          }
        });
      }
      if (this.localStorageMovieValue !== 10) {
        this.movie.value = this.localStorageMovieValue;
      }
    }
    this.text.querySelectorAll("span")[0].innerHTML = this.count;
    this.text.querySelectorAll("span")[1].innerHTML =
      this.count * this.movie.value;
  }
  setSeatClickEvent() {
    this.allSeat.forEach(
      (seat, index) =>
        seat.classList.value !== "seat occupied" &&
        seat.addEventListener("click", () => {
          this.getValue();
          if (seat.classList.value === "seat") {
            seat.classList.add("selected");
            this.count++;
            this.selectedSeat = JSON.stringify([...this.selectedSeat, index]);
          } else if (seat.classList.value === "seat selected") {
            seat.classList.remove("selected");
            this.count--;
            this.selectedSeat = JSON.stringify(
              this.selectedSeat.filter((data) => data !== index)
            );
          }
          this.setState();
          this.setValue({
            count: this.count,
            movie: this.movie.value,
            selectedSeat: this.selectedSeat,
          });
        })
    );
  }
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
  init() {
    this.getValue();
    this.setSeatClickEvent();
    this.setMovieChangeEvent();
    this.setState(true);
  }
}
new App(document.querySelector("body")).init();
