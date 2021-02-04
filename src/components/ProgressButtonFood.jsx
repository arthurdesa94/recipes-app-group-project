import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function ProgressButtonFood({ id, ingredients }) {
  const handleClick = () => {
    // prettier-ignore
    const progressStorage = JSON
      .parse(localStorage.getItem('inProgressRecipes')) || {};

    const initialIndex = 0;
    const arrayIng = ingredients().map((element) => element
      .substring(initialIndex, element.indexOf(':')));

    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({
        ...progressStorage,
        meals: {
          ...progressStorage.meals,
          [id]: [...arrayIng],
        },
      }),
    );
  };

  return (
    <div>
      <Link
        className="footer"
        to={ `/comidas/${id}/in-progress` }
        data-testid="start-recipe-btn"
        onClick={ handleClick }
      >
        Iniciar receita
      </Link>
    </div>
  );
}

ProgressButtonFood.propTypes = {
  id: PropTypes.string.isRequired,
  ingredients: PropTypes.func.isRequired,
};

export default ProgressButtonFood;
