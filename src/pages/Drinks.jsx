import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import MenuInferior from '../components/MenuInferior';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import RecipeDrinkCard from '../components/RecipeDrinkCard';

function Drinks({ location }) {
  const { setter } = useSelector((state) => state.user);
  const searchBarView = setter;
  return (
    <div>
      <Header title="Bebidas" />
      {searchBarView && <SearchBar location={ location.pathname } />}
      <RecipeDrinkCard />
      <MenuInferior />
    </div>);
}

Drinks.propTypes = {
  location: PropTypes.arrayOf({
    pathname: PropTypes.string,
  }).isRequired,
};

export default Drinks;
