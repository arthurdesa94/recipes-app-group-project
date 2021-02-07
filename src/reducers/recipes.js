const LOADING = 'LOADING';
const RETRIEVE_RECIPES = 'RETRIEVE_RECIPES';
const RETRIEVE_DRINK_RECIPES = 'RETRIEVE_DRINK_RECIPES';
const RETRIEVE_FOOD_DETAILS = 'RETRIEVE_FOOD_DETAILS';
const RETRIEVE_DRINK_DETAILS = 'RETRIEVE_DRINK_DETAILS';
const OK = 'OK';
const DONE_RECIPES_ADD = 'DONE_RECIPES_ADD';

const INITIAL_STATE = {
  loading: false,
  recipes: [],
  recipesDrink: [],
  details: [],
  detailsDrink: [],
  doneRecipes: [],
};

const recipes = (state = INITIAL_STATE, action) => {
  let meals;
  let drink;
  let doneRecipe;
  let storageRecipes;

  switch (action.type) {
  case LOADING:
    return { ...state, loading: true };
  case OK:
    return { ...state, loading: false };
  case RETRIEVE_RECIPES:
    meals = action.value.meals === null
      ? [{ error: null }]
      : Object.values(action.value.meals);
    return { ...state, recipes: [...meals] };
  case RETRIEVE_DRINK_RECIPES:
    drink = action.value.drinks === null
      ? [{ error: null }]
      : Object.values(action.value.drinks);
    return { ...state, recipesDrink: [...drink] };
  case RETRIEVE_FOOD_DETAILS:
    action.value.meals[0].strYoutube = action.value.meals[0].strYoutube.replace(
      /.com\/watch\?v=/,
      '.com/embed/',
    );
    return { ...state, details: action.value.meals };
  case RETRIEVE_DRINK_DETAILS:
    return { ...state, detailsDrink: action.value.drinks };
  case DONE_RECIPES_ADD:
    console.log(action.value);
    storageRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    doneRecipe = JSON.stringify([...storageRecipes, action.value[0]]);
    localStorage.setItem('doneRecipes', doneRecipe);
    return {
      ...state, doneRecipes: [...storageRecipes, action.value[0]],
    };
  default:
    return state;
  }
};

export default recipes;
