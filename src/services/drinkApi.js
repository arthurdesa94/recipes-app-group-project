export const searchDrinkNameRequest = (word) => {
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${word}`)
    .then((response) => response.json())
    .then((result) => result);
};

export const searchRandomDrinkRequest = () => {
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
    .then((response) => response.json())
    .then((result) => result);
}

export const searchDrinkByIdRequest = (id) => {
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=${id}`)
    .then((response) => response.json())
    .then((result) => result);
}

export const searchDetailedDrinkByIdRequest = (id) => {
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((response) => response.json())
    .then((result) => result);
}
export const searchDrinkFirstWordDrinkRequest = (word, type) => {
  if(type && word.length > 1) return alert('Sua busca deve conter somente 1 (um) caracter')
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${word}`)
    .then((response) => response.json())
    .then((result) => result);
}

export const searchDrinkByMainIngredientsRequest = (ingredient) => {
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    .then((response) => response.json())
    .then((result) => result);
}

export const allDrinkIngredientsRequest = () => {
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`)
    .then((response) => response.json())
    .then((result) => result);
}

export const allDrinkGlassesRequest = () => {
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list`)
    .then((response) => response.json())
    .then((result) => result);
}

export const allDrinkCategoriesRequest = () => {
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`)
    .then((response) => response.json())
    .then((result) => result);
}

export const allDrinkAlcoholicFilterRequest = () => {
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list`)
    .then((response) => response.json())
    .then((result) => result);
}

export const searchDrinkByCategory = (category) => {
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((response) => response.json())
    .then((result) => result);
}

export const searchDrinkByAlcoholic = (alcoholic) => {
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic${alcoholic}`)
    .then((response) => response.json())
    .then((result) => result);
}

export const searchDrinkByGlass = (glass) => {
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${glass}`)
    .then((response) => response.json())
    .then((result) => result);
}

export const returnSmallIngredientPhotoUrl = (IngredientesName) => {
  return `https://www.thecocktaildb.com/images/ingredients/${IngredientesName}-Small.png`
}

export const returnMediumIngredientPhotoUrl = (IngredientesName) => {
  return `https://www.thecocktaildb.com/images/ingredients/${IngredientesName}-Medium.png`
}

export const returnLargeIngredientPhotoUrl = (IngredientesName) => {
  return `https://www.thecocktaildb.com/images/ingredients/${IngredientesName}.png`
}
