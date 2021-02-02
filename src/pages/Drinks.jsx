import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import MenuInferior from '../components/MenuInferior';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import RecipeDrinkCard from '../components/RecipeDrinkCard';
import CategoryBar from '../components/CategoryBar';
import * as Actions from '../actions/index';

function Drinks({ location }) {
  const { setter } = useSelector((state) => state.user);
  const searchBarView = setter;
  const dispatch = useDispatch();

  const randomWord = () => {
    const letters = 'abcdfghjklmoprstvz';
    const seventeen = 17;
    const randomIndex = Math.round(Math.random() * seventeen);
    dispatch(Actions.retrieveDrinkFirstLetterRecipes(letters[randomIndex]));
  };

  useEffect(() => {
    randomWord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  location: PropTypes.arrayOf({
    pathname: PropTypes.string,
  }).isRequired,
};

export default Drinks;
