export default function ({ $app, initialState }) {
  this.$target = document.createElement("div");
  this.$target.setAttribute("id", "single-meal");
  $app.appendChild(this.$target);
  this.setState = (nextState) => {
    this.state = nextState;
    if (nextState.singleFood !== null) this.render();
  };
  this.render = () => {
    //

    const targetSingleFood = this.state.singleFood;
    let singleFoodUlTemplate = "";
    for (let check = 1; check < 21; check++) {
      if (targetSingleFood[`strIngredient${check}`]) {
        singleFoodUlTemplate += `<li>${
          targetSingleFood[`strIngredient${check}`]
        }</li>`;
      }
    }
    this.$target.innerHTML = ` <div class="single-meal">
    <h1>${targetSingleFood.strMeal}</h1>
    <img src="${targetSingleFood.strMealThumb}" alt="Steak Diane">
    <div class="single-meal-info">
      <p>${targetSingleFood.strCategory}</p>
      <p>${targetSingleFood.strArea}</p>
    </div>
    <div class="main">
      <p>${targetSingleFood.strInstructions}</p>
      <h2>Ingredients</h2>
      <ul>
      ${singleFoodUlTemplate}
      </ul>
    </div>
  </div>`;
  };
}
