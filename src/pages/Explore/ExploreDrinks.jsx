import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MenuInferior from '../../components/MenuInferior';
import Header from '../../components/Header';
import * as DRINKAPI from '../../services/drinkApi';

function ExploreDrinks(props) {
  const handleClick = async () => {
    const { history } = props;
    const response = await DRINKAPI.searchRandomDrinkRequest();
    const id = response.drinks[0].idDrink;
    history.push(`/bebidas/${id}`);
  };

  return (
    <div>
      <Header title="Explorar Bebidas" search={ false } />

      <Link
        to="/explorar/bebidas/ingredientes"
        data-testid="explore-by-ingredient"
      >
        Por Ingredientes
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

ExploreDrinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ExploreDrinks;
