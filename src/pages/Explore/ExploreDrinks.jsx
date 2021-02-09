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
    <div className="main-container bg-gradient-to-tr from-lightBlue-300 to-lightBlue-400">
      <div className="items-container">
        <div className="header-container">
          <Header title="Explorar Bebidas" search={ false } />
        </div>

        <Link
          className="explore-link"
          to="/explorar/bebidas/ingredientes"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
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

ExploreDrinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ExploreDrinks;
