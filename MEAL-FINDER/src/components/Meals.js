import shouldComponentUpdate from "../utils/shouldComponentUpdate.js";

export default function Meals({ $app, initialState, onClick }) {
  this.state = initialState;
  this.$target = document.createElement("div");

  this.$target.setAttribute("id", "meals");
  this.$target.setAttribute("class", "meals");
  $app.appendChild(this.$target);
  this.$target.addEventListener("click", onClick);
  this.setState = (nextState) => {
    const prevState = this.state;
    this.state = nextState;

    shouldComponentUpdate(
      () => {
        this.render();
      },
      {
        prevState: prevState.currentFoodKeyword,
        nextState: nextState.currentFoodKeyword,
      }
    );
  };
  this.render = () => {
    //   스테이트에 있는 비동기 데이터(음식들) div-img 태그들로 다 만들어서 타겟에 innerHTML
    if (this.state.meals !== null) {
      // 받아온 데이터가 널이 아니라면 렌더 진행 아니면 이전 상태 그대로임
      const mealsTemplate = this.state.meals
        .map(
          (meal) =>
            `<div class="meal">
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <div class="meal-info" data-mealid="${meal.idMeal}">
        <h3>${meal.strMeal}</h3>
      </div>
    </div>`
        )
        .join("");

      this.$target.innerHTML = mealsTemplate;
    }
  };
}
