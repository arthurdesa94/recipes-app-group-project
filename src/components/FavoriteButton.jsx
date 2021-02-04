import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FavoriteButton({ id }) {
  const [favorite, setFavorite] = useState(false);
  const { details } = useSelector((state) => state.recipes);
  useEffect(() => {
    const retriveFavoriteState = () => {
      const atualLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      return setFavorite(atualLocalStorage.find((local) => local.id === id));
    };
    retriveFavoriteState();
  }, [id]);
  const favoriteFunc = () => {
    const {
      idMeal,
      strArea: area,
      strCategory: category,
      strMeal: name,
      strMealThumb: image,
    } = details[0];
    const favoriteObj = [
      {
        id: idMeal,
        type: 'comida',
        area,
        category,
        alcoholicOrNot: '',
        name,
        image,
      },
    ];
    const localStoreFav = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (favorite) {
      const removedRecipe = localStoreFav.filter((result) => result.id !== id);
      const removedRecipeStringfy = JSON.stringify(removedRecipe);
      setFavorite(false);
      return localStorage.setItem('favoriteRecipes', removedRecipeStringfy);
    }
    setFavorite(true);
    console.log(localStoreFav);
    const firstRecipeCase = JSON.stringify(favoriteObj);
    const emptyArray = 0;
    if (localStoreFav.length === emptyArray) {
      return localStorage.setItem('favoriteRecipes', firstRecipeCase);
    }
    const newRecipeStringfy = JSON.stringify([
      ...favoriteObj,
      ...localStoreFav,
    ]);
    return localStorage.setItem('favoriteRecipes', newRecipeStringfy);
  };

  return (
    <button onClick={ favoriteFunc } type="button">
      <img
        data-testid="favorite-btn"
        src={ favorite ? blackHeartIcon : whiteHeartIcon }
        alt="heart"
      />
    </button>
  );
}

export default FavoriteButton;
