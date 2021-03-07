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
    <div className="h-screen mx-auto max-h-screen w-screen min-h-screen bg-white">
      <div className="h-screen flex flex-column items-center mx-auto justify-center w-11/12">
        <div className="border-b-4 border-t-4 m-4 w-10/12 border-white bg-gradient-to-tr from-blue-400 to-blue-500 shadow-md rounded-xl p-4 mx-auto">
          <Header title="Bebidas" />
          {searchBarView && <SearchBar location={ location.pathname } />}
        </div>
        <CategoryBar type="drinks" />
        <RecipeDrinkCard />
        <MenuInferior type="drinks" />
      </div>
      <div className="h-auto w-screen bg-gradient-to-r from-green-300 to-green-500" />
    </div>
  );
}

Drinks.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default Drinks;
