export const searchFoodNameRequest = (word) => {
  return fetch(`https://www.themealdb.com/api/json/v1/1/searchFood.php?s=${word}`)
    .then((response) => response.json())
    .then((result) => result);
};

export const searchRandomFoodRequest = () => {
  return fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((response) => response.json())
    .then((result) => result);
}

export const searchFoodByIdRequest = (id) => {
  return fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((response) => response.json())
    .then((result) => result);
}

export const searchFoodFirstWordDrinkRequest = (word) => {
  if(type && word.length > 1) return alert('Sua busca deve conter somente 1 (um) caracter')
  return fetch(`https://www.themealdb.com/api/json/v1/1/searchFood.php?f=${word}`)
    .then((response) => response.json())
    .then((result) => result);
}

export const searchFoodByMainIngredientsRequest = (ingredient) => {
  return fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    .then((response) => response.json())
    .then((result) => result);
}

export const allFoodIngredientsRequest = () => {
  return fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    .then((response) => response.json())
    .then((result) => result);
}

export const allFoodAreasRequest = () => {
  return fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    .then((response) => response.json())
    .then((result) => result);
}

export const allFoodCategoriesRequest = () => {
  return fetch(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`)
    .then((response) => response.json())
    .then((result) => result);
}

export const allFoodDetailedCategoriesRequest = () => {
  return fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    .then((response) => response.json())
    .then((result) => result);
}

export const searchFoodByCategory = (category) => {
  return fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((response) => response.json())
    .then((result) => result);
}

export const searchFoodByArea = (area) => {
  return fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${area}`)
    .then((response) => response.json())
    .then((result) => result);
}

export const returnIngredientPhotoUrl = (IngredientesName) => {
  return `https://www.themealdb.com/images/ingredients/${IngredientesName}.png`
}

export const returnSmallIngredientPhotoUrl = (IngredientesName) => {
  return `https://www.themealdb.com/images/ingredients/${IngredientesName}-Small.png`
}
