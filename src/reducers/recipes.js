const LOADING = 'LOADING';
const RETRIEVE_RECIPES = 'RETRIEVE_RECIPES';
const RETRIEVE_DRINK_RECIPES = 'RETRIEVE_DRINK_RECIPES';
const RETRIEVE_FOOD_DETAILS = 'RETRIEVE_FOOD_DETAILS';
const RETRIEVE_DRINK_DETAILS = 'RETRIEVE_DRINK_DETAILS';
const OK = 'OK';
const DONE_RECIPES_DRINK = 'DONE_RECIPES_DRINK';
const DONE_RECIPES_FOOD = 'DONE_RECIPES_FOOD';

const INITIAL_STATE = {
  loading: false,
  recipes: [],
  recipesDrink: [],
  details: [],
  detailsDrink: [],
  bebidas: [],
  comidas: [],
};

const recipes = (state = INITIAL_STATE, action) => {
  let meals;
  let drink;
  let doneRecipesFood;
  let doneRecipesDrink;

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
  case DONE_RECIPES_DRINK:
    doneRecipesDrink = JSON.stringify({
      bebidas: [...state.bebidas, action.value],
      comidas: [...state.comidas],
    });
    localStorage.setItem('doneRecipes', doneRecipesDrink);
    return {
      ...state,
      bebidas: [...state.bebidas, action.value],
      comidas: [...state.comidas],
    };
  case DONE_RECIPES_FOOD:
    doneRecipesFood = JSON.stringify({
      bebidas: [...state.bebidas],
      comidas: [...state.comidas, action.value],
    });
    localStorage.setItem('doneRecipes', doneRecipesFood);
    return {
      ...state,
      bebidas: [...state.bebidas],
      comidas: [...state.comidas, action.value],
    };
  default:
    return state;
  }
};

export default recipes;
