import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import MenuInferior from '../../components/MenuInferior';
import SearchBar from '../../components/SearchBar';
import Header from '../../components/Header';
import RecipeFoodCard from '../../components/RecipeCards/RecipeFoodCard';
import CategoryBar from '../../components/CategoryBar';
import * as Actions from '../../actions/index';

function Foods({ location }) {
  const { setter, setterIngredient } = useSelector((state) => state.user);
  const searchBarView = setter;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!setterIngredient) dispatch(Actions.retrieveInitialRecipes());
  }, [dispatch, setterIngredient]);

  return (
    <div>
      <div className="bg-gradient-to-r from-green-100 to-green-300 blur bg-opacity-40 rounded-b-2xl shadow-sm">
        <Header title="Comidas" />
        {searchBarView && <SearchBar location={ location.pathname } />}
      </div>
      <CategoryBar type="foods" />
      <RecipeFoodCard />
      <MenuInferior />
    </div>
  );
}

Foods.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default Foods;
