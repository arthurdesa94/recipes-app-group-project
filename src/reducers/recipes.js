const LOADING = 'LOADING';
const RETRIEVE_RECIPES = 'RETRIEVE_RECIPES';
const RETRIEVE_DRINK_RECIPES = 'RETRIEVE_DRINK_RECIPES';
const OK = 'OK';

const INITIAL_STATE = {
  loading: false,
  recipes: [{}],
};
const recipes = (state = INITIAL_STATE, action) => {
  let meals;
  let drink;
  switch (action.type) {
  case LOADING:
    return { ...state, loading: true };
  case OK:
    return { ...state, loading: false };
  case RETRIEVE_RECIPES:
    meals = Object.values(action.value);
    return { ...state, recipes: [...meals] };
  case RETRIEVE_DRINK_RECIPES:
    drink = Object.values(action.value);
    return { ...state, recipes: [...drink] };
  default:
    return state;
  }
};

export default recipes;
