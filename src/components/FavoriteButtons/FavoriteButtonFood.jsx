import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import * as Actions from '../../actions/index';

function FavoriteButtonFood({ id, fetchAgain, testId, setTrue }) {
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
      localStorage.setItem('favoriteRecipes', removedRecipeStringfy);

      if (setTrue !== undefined) setTrue();
    } else {
      setFavorite(true);
      const newRecipeStringfy = JSON.stringify([
        ...favoriteObj,
        ...localStoreFav,
      ]);
      localStorage.setItem('favoriteRecipes', newRecipeStringfy);
    }
  };

  if (!details[0]) return <h1>Loading...</h1>;

  return (
    <button onClick={ favoriteFunc } type="button">
      <img
        data-testid={ testId }
        src={ favorite ? blackHeartIcon : whiteHeartIcon }
        alt="heart"
      />
    </button>
  );
}

FavoriteButtonFood.propTypes = {
  id: PropTypes.string,
  fetchAgain: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  testId: PropTypes.string,
  setTrue: PropTypes.func.isRequired,
};
FavoriteButtonFood.defaultProps = {
  id: '',
  fetchAgain: false,
  testId: 'favorite-btn',
};

export default FavoriteButtonFood;
