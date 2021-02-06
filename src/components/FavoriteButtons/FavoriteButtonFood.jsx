import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import * as Actions from '../../actions/index';

function FavoriteButtonFood({ id, fetchAgain }) {
  const [favorite, setFavorite] = useState(false);
  const { details } = useSelector((state) => state.recipes);
  const dispatch = useDispatch();

  useEffect(() => {
    const retriveFavoriteState = () => {
      const atualLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      return setFavorite(atualLocalStorage.some((local) => local.id === id));
    };
    retriveFavoriteState();
  }, [id]);

  useEffect(() => {
    if (fetchAgain) {
      dispatch(Actions.retrieveFoodDetailsById(id));
    }
  }, [id, dispatch, fetchAgain]);

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

FavoriteButtonFood.propTypes = {
  id: PropTypes.string.isRequired,
  fetchAgain: PropTypes.string.isRequired,
};

export default FavoriteButtonFood;
