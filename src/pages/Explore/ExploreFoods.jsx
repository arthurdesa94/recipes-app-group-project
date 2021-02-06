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
    <div>
      <Header title="Explorar Comidas" search={ false } />

      <Link
        to="/explorar/comidas/ingredientes"
        data-testid="explore-by-ingredient"
      >
        Por Ingredientes
      </Link>
      <Link to="/explorar/comidas/area" data-testid="explore-by-area">
        Por Local de Origem
      </Link>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ handleClick }
      >
        Me Surpreenda!
      </button>

      <MenuInferior />
    </div>
  );
}

ExploreFoods.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ExploreFoods;
