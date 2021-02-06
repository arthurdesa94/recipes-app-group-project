import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React from 'react';

function StartRecipeButtonFood({ id }) {
  const buttonContinue = () => (
    <Link
      className="footer"
      to={ `/comidas/${id}/in-progress` }
      data-testid="start-recipe-btn"
    >
      Continuar Receita
    </Link>
  );
  const buttonInitial = () => (
    <Link
      className="footer"
      to={ `/comidas/${id}/in-progress` }
      data-testid="start-recipe-btn"
    >
      Iniciar receita
    </Link>
  );
  const verifyDoneRecipe = () => {
    const empty = 0;
    const progressStorage = JSON.parse(
      localStorage.getItem('inProgressRecipes'),
    ) || { meals: 'notInProgress' };
    const idMeal = progressStorage.meals[id];
    if (idMeal && idMeal.length === empty) {
      return <h1 className="footer">Parabéns, você já realizou esta receita!</h1>;
    } if (
      progressStorage.meals === 'notInProgress'
    ) {
      return buttonInitial();
    }
    return buttonContinue();
  };

  return <div>{verifyDoneRecipe()}</div>;
}

StartRecipeButtonFood.propTypes = {
  id: PropTypes.string.isRequired,
};

export default StartRecipeButtonFood;
