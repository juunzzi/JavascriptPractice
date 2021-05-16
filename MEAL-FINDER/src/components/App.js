import { fetcher, SEARCH_KEY } from "../utils/api.js";
import Flex from "./Flex.js";
import Loading from "./Loading.js";
import Meals from "./Meals.js";
import ResultHeading from "./ResultHeading.js";
import SingleMeal from "./SingleMeal.js";
const cache = {};
export default function App($app) {
  this.state = {
    meals: [],
    currentFoodKeyword: "",
    singleFood: null,
    isLoading: false,
  };
  new Flex({
    $app,
    initialState: {},
    onSubmit: async (e) => {
      e.preventDefault();

      const {
        target: {
          firstChild: { value: food },
        },
      } = e;
      if (cache[food]) {
        // 캐시있는걸 가져온다.
        this.setState({
          ...this.state,
          meals: cache[food],
          currentFoodKeyword: food,
        });
      } else {
        const newMeals = await fetcher(SEARCH_KEY, food);
        cache[food] = newMeals.meals;
        this.setState({
          ...this.state,
          meals: newMeals.meals,
          currentFoodKeyword: food,
        });
      }

      e.target.firstChild.value = "";
      //   비동기요청 하고 셋스테이트
    },
    onRandomButtonHandler: () => {},
  });
  const loading = new Loading({
    $app,
    initialState: { isLoading: this.state.isLoading },
  });
  const resultHeading = new ResultHeading({
    $app,
    initialState: { currentFoodKeyword: this.state.currentFoodKeyword },
  });
  const meals = new Meals({
    $app,
    initialState: { meals: this.state.meals },
    onClick: (e) => {
      // 사진 누를때 텍스트나 이상한 곳누르면 실행되는 이슈
      const singleFoodId = e.target.getAttribute("data-mealid");
      const singleFood = this.state.meals.find(
        (meal) => meal.idMeal === singleFoodId
      );
      this.setState({
        ...this.state,
        singleFood: singleFood,
      });
    },
  });
  const singleMeal = new SingleMeal({
    $app,
    initialState: { singleFood: this.state.singleFood },
  });

  this.setState = (nextState) => {
    const prevState = this.state;
    this.state = nextState;

    meals.setState({
      meals: nextState.meals,
      currentFoodKeyword: nextState.currentFoodKeyword,
    });
    resultHeading.setState({
      currentFoodKeyword: nextState.currentFoodKeyword,
    });
    singleMeal.setState({
      singleFood: nextState.singleFood,
    });
    loading.setState({
      isLoading: nextState.isLoading ? true : false,
    });
  };
}
