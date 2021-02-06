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
      <Header title="Bebidas" />
      {searchBarView && <SearchBar location={ location.pathname } />}
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
