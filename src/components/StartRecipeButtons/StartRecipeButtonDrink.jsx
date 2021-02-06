import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React from 'react';

function StartRecipeButtonDrink({ id, ingredients }) {
  const buttonContinue = () => (
    <Link
      className="footer"
      to={ `/bebidas/${id}/in-progress` }
      data-testid="start-recipe-btn"
    >
      Continuar Receita
    </Link>
  );
  const buttonInitial = () => (
    <Link
      className="footer"
      to={ `/bebidas/${id}/in-progress` }
      data-testid="start-recipe-btn"
    >
      Iniciar receita
    </Link>
  );
  const verifyDoneRecipe = () => {
    const totalLength = ingredients.length;
    const progressStorage = JSON.parse(
      localStorage.getItem('inProgressRecipes'),
    ) || { cocktails: '' };
    const idDrink = progressStorage.cocktails[id];
    if (idDrink && idDrink.length === totalLength) {
      return <h1 className="footer">Parabéns, você já realizou esta receita!</h1>;
    } if (
      !progressStorage.cocktails[id]
    ) {
      return buttonInitial();
    }
    return buttonContinue();
  };

  return <div>{verifyDoneRecipe()}</div>;
}

StartRecipeButtonDrink.propTypes = {
  id: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default StartRecipeButtonDrink;
