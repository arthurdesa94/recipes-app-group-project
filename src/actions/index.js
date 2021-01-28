import * as API from '../services/foodApi';
import * as DRINKAPI from '../services/drinkApi';

const SIGN_IN = 'SING_IN';
const LOADING = 'LOADING';
const OK = 'OK';
const RETRIEVE_RECIPES = 'RETRIEVE_RECIPES';
const RETRIEVE_DRINK_RECIPES = 'RETRIEVE_DRINK_RECIPES';
const SET_SEARCH = 'SET_SEARCH';

export const signIn = (email) => ({
  type: SIGN_IN,
  email,
});

export const setForSearchBar = (setter) => ({
  type: SET_SEARCH,
  setter,
});

//-------------------------------------------------

const storageRecipes = (value) => ({
  type: RETRIEVE_RECIPES,
  value,
});

const storageDrinkRecipes = (value) => ({
  type: RETRIEVE_DRINK_RECIPES,
  value,
});

export const retrieveNameRecipes = (value) => (dispatch) => {
  dispatch({ type: LOADING });
  API.searchFoodNameRequest(value)
    .then((result) => dispatch(storageRecipes(result)));
  dispatch({ type: OK });
};

export const retrievefirstLetterRecipes = (value) => (dispatch) => {
  dispatch({ type: LOADING });
  API.searchFoodFirstWordDrinkRequest(value)
    .then((result) => dispatch(storageRecipes(result)));
  dispatch({ type: OK });
};

export const retrieveIngredientRecipes = (value) => (dispatch) => {
  dispatch({ type: LOADING });
  API.searchFoodByMainIngredientsRequest(value)
    .then((result) => dispatch(storageRecipes(result)));
  dispatch({ type: OK });
};

export const retrieveDrinkNameRecipes = (value) => (dispatch) => {
  dispatch({ type: LOADING });
  DRINKAPI.searchDrinkNameRequest(value)
    .then((result) => dispatch(storageDrinkRecipes(result)));
  dispatch({ type: OK });
};

export const retrieveDrinkFirstLetterRecipes = (value) => (dispatch) => {
  dispatch({ type: LOADING });
  DRINKAPI.searchDrinkFirstLetterRequest(value)
    .then((result) => dispatch(storageDrinkRecipes(result)));
  dispatch({ type: OK });
};

export const retrieveDrinkIngredientRecipes = (value) => (dispatch) => {
  dispatch({ type: LOADING });
  DRINKAPI.searchDrinkByMainIngredientsRequest(value)
    .then((result) => dispatch(storageDrinkRecipes(result)));
  dispatch({ type: OK });
};
