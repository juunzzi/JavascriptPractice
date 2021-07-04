import Balance from "./Balance.js";
import Form from "./Form.js";
import History from "./History.js";
import IncExpContainer from "./IncExpContainer.js";
import calHistory from "../utils/calHistory.js";
export default function App($app) {
  const initialHistory = JSON.parse(localStorage.getItem("history"));
  this.state = {
    ...calHistory(initialHistory),
  };
  this.balance = new Balance({
    $app,
    initialState: { balance: this.state.balance },
  });
  this.incExpContainer = new IncExpContainer({
    $app,
    initialState: { income: this.state.income, expense: this.state.expense },
  });
  this.history = new History({
    $app,
    initialState: { history: this.state.history },
    onDeleteClick: (e) => {
      // 삭제하기
      const { target } = e;
      if (target.classList.value === "delete-btn") {
        const removedHistory = this.state.history.filter((item) => {
          return item.id !== +target.parentNode.dataset.id;
        });
        this.setState({
          ...this.state,
          ...calHistory(removedHistory),
        });
        localStorage.setItem("history", JSON.stringify(removedHistory));

        // this.setState({...this.state,history:removedHistory})
      }
    },
  });
  this.form = new Form({
    $app,
    onSubmit: (e) => {
      e.preventDefault();
      const [{ value: textValue }, { value: amountValue }] =
        e.target.querySelectorAll("input");

      if (textValue && amountValue) {
        const newHistory = [
          ...this.state.history,
          {
            id: this.state.history.length + 1,
            text: textValue,
            amount: amountValue,
          },
        ];
        if (amountValue >= 0) {
          // postive
          this.setState({
            ...this.state,
            ...calHistory(newHistory),
          });
        }
        if (amountValue < 0) {
          // negative
          this.setState({
            ...this.state,
            ...calHistory(newHistory),
          });
        }
        localStorage.setItem("history", JSON.stringify(this.state.history));
      } else {
        alert("정신차려");
      }
    },
  });
  this.setState = (nextState) => {
    this.state = nextState;
    this.balance.setState({ balance: this.state.balance });
    this.history.setState({ history: this.state.history });
    this.incExpContainer.setState({
      income: this.state.income,
      expense: this.state.expense,
    });
  };
}
