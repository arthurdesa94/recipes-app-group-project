import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MenuInferior from '../../components/MenuInferior';
import Header from '../../components/Header';
import * as FOODAPI from '../../services/foodApi';

function ExploreFoods(props) {
  const handleClick = async () => {
    const { history } = props;
    const response = await FOODAPI.searchRandomFoodRequest();
    const id = response.meals[0].idMeal;
    history.push(`/comidas/${id}`);
  };

  return (
    <div className="main-container bg-gradient-to-tr from-amber-300 to-amber-400">
      <div className="items-container">
        <div className="header-container">
          <Header title="Explorar Comidas" search={ false } />
        </div>
        <Link
          className="explore-link"
          to="/explorar/comidas/ingredientes"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </Link>
        <Link
          className="explore-link"
          to="/explorar/comidas/area"
          data-testid="explore-by-area"
        >
          Por Local de Origem
        </Link>
        <button
          className="explore-link font-pacifico"
          type="button"
          data-testid="explore-surprise"
          onClick={ handleClick }
        >
          Me Surpreenda!
        </button>

        <MenuInferior />
      </div>
    </div>
  );
}

ExploreFoods.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ExploreFoods;
