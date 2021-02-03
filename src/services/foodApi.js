export const searchFoodNameRequest = (word) => fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${word}`)
  .then((response) => response.json())
  .then((result) => result);

export const searchRandomFoodRequest = () => fetch('https://www.themealdb.com/api/json/v1/1/random.php')
  .then((response) => response.json())
  .then((result) => result);

export const searchFoodByIdRequest = (id) => fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
  .then((response) => response.json())
  .then((result) => result);

export const searchFoodFirstWordDrinkRequest = (word) => fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${word}`)
  .then((response) => response.json())
  .then((result) => result);

export const searchFoodByMainIngredientsRequest = (ingredient) => fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
  .then((response) => response.json())
  .then((result) => result);

export const allFoodIngredientsRequest = () => fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
  .then((response) => response.json())
  .then((result) => result);

export const allFoodAreasRequest = () => fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
  .then((response) => response.json())
  .then((result) => result);

export const allFoodCategoriesRequest = () => fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
  .then((response) => response.json())
  .then((result) => result);

export const allFoodDetailedCategoriesRequest = () => fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
  .then((response) => response.json())
  .then((result) => result);

export const searchFoodByCategory = (category) => fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
  .then((response) => response.json())
  .then((result) => result);

export const searchFoodByArea = (area) => fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
  .then((response) => response.json())
  .then((result) => result);

export const returnIngredientPhotoUrl = (IngredientesName) => `https://www.themealdb.com/images/ingredients/${IngredientesName}.png`;

export const returnSmallIngredientPhotoUrl = (IngredientesName) => `https://www.themealdb.com/images/ingredients/${IngredientesName}-Small.png`;

export const searchInitial = () => fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
  .then((response) => response.json())
  .then((result) => result);
