const API_KEY = "9aa38af3f58100222081cdd8";
const currencyOneSelect = document.querySelector("#currency-one");
const currencyOneAmount = document.querySelector("#amount-one");
const currencyTwoSelect = document.querySelector("#currency-two");
const currencyTwoAmount = document.querySelector("#amount-two");
const swapButton = document.querySelector("#swap");
const rate = document.querySelector("#rate");

currencyOneSelect.addEventListener("change", () => {
  swapButton.click();
});
currencyTwoSelect.addEventListener("change", () => {
  swapButton.click();
});

swapButton.addEventListener("click", () => {
  fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOneSelect.value}`)
    .then((res) => res.json())
    .then(({ conversion_rates: rates }) => {
      rate.innerText = rates[currencyTwoSelect.value] * currencyOneAmount.value;
      currencyTwoAmount.value =
        rates[currencyTwoSelect.value] * currencyOneAmount.value;
    });
});
const input = document.querySelector("#input");
input.addEventListener("change", (e) => {
  console.log(e.target.value);
});
