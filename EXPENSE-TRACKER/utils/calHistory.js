export default function calHistory(history) {
  let newIncome = 0;
  let newExpense = 0;
  history.forEach((item) => {
    if (+item.amount >= 0) {
      newIncome += +item.amount;
    } else {
      newExpense += +item.amount;
    }
  });
  return {
    history: history,
    income: newIncome,
    expense: newExpense,
    balance: newIncome + newExpense,
  };
}
