export const searchDrinkNameRequest = (word) => fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${word}`)
  .then((response) => response.json())
  .then((result) => result);

export const searchRandomDrinkRequest = () => fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
  .then((response) => response.json())
  .then((result) => result);

export const searchDrinkByIdRequest = (id) => fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=${id}`)
  .then((response) => response.json())
  .then((result) => result);

export const searchDetailedDrinkByIdRequest = (id) => fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
  .then((response) => response.json())
  .then((result) => result);

export const searchDrinkFirstLetterRequest = (word) => fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${word}`)
  .then((response) => response.json())
  .then((result) => result);

export const searchDrinkByMainIngredientsRequest = (ingredient) => fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)
  .then((response) => response.json())
  .then((result) => result);

export const allDrinkIngredientsRequest = () => fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
  .then((response) => response.json())
  .then((result) => result);

export const allDrinkGlassesRequest = () => fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list')
  .then((response) => response.json())
  .then((result) => result);

export const allDrinkCategoriesRequest = () => fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
  .then((response) => response.json())
  .then((result) => result);

export const allDrinkAlcoholicFilterRequest = () => fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list')
  .then((response) => response.json())
  .then((result) => result);

export const searchDrinkByCategory = (category) => fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`)
  .then((response) => response.json())
  .then((result) => result);

export const searchDrinkByAlcoholic = (alcoholic) => fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic${alcoholic}`)
  .then((response) => response.json())
  .then((result) => result);

export const searchDrinkByGlass = (glass) => fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${glass}`)
  .then((response) => response.json())
  .then((result) => result);

export const returnSmallIngredientPhotoUrl = (IngredientesName) => `https://www.thecocktaildb.com/images/ingredients/${IngredientesName}-Small.png`;

export const returnMediumIngredientPhotoUrl = (IngredientesName) => `https://www.thecocktaildb.com/images/ingredients/${IngredientesName}-Medium.png`;

export const returnLargeIngredientPhotoUrl = (IngredientesName) => `https://www.thecocktaildb.com/images/ingredients/${IngredientesName}.png`;

export const searchInitialDrink = () => fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
  .then((response) => response.json())
  .then((result) => result);
