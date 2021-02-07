import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import MenuInferior from '../../components/MenuInferior';
import SearchBar from '../../components/SearchBar';
import Header from '../../components/Header';
import RecipeDrinkCard from '../../components/RecipeCards/RecipeDrinkCard';
import CategoryBar from '../../components/CategoryBar';
import * as Actions from '../../actions/index';

function Drinks({ location }) {
  const { setter, setterIngredient } = useSelector((state) => state.user);
  const searchBarView = setter;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!setterIngredient) dispatch(Actions.retrieveDrinkInitialRecipes());
  }, [dispatch, setterIngredient]);

  return (
    <div>
      <div className="bg-gradient-to-r from-green-100 to-green-300 blur bg-opacity-40 rounded-b-2xl shadow-sm">
        <Header title="Bebidas" />
        {searchBarView && <SearchBar location={ location.pathname } />}
      </div>
      <CategoryBar type="drinks" />
      <RecipeDrinkCard />
      <MenuInferior />
    </div>
  );
}

Drinks.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default Drinks;
