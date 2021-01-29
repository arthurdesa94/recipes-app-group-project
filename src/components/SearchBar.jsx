import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import * as Actions from '../actions';

function SearchBar({ location }) {
  const [searchValue, setSearchValue] = useState('');
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const searchValueChange = ({ target }) => setSearchValue(target.value);
  const radioChangeValue = ({ target }) => setInput(`${target.id}`);

  const searchTypeFunc = () => {
    switch (input) {
    case 'name':
      return location === '/comidas'
        ? dispatch(Actions.retrieveNameRecipes(searchValue))
        : dispatch(Actions.retrieveDrinkNameRecipes(searchValue));
    case 'firstLetter':
      if (searchValue.length > 1) {
        // eslint-disable-next-line no-alert
        alert('Sua busca deve conter somente 1 (um) caracter');
      } else if (location === '/comidas') {
        dispatch(Actions.retrievefirstLetterRecipes(searchValue));
      } else dispatch(Actions.retrieveDrinkFirstLetterRecipes(searchValue));
      break;
    default:
      return location === '/comidas'
        ? dispatch(Actions.retrieveIngredientRecipes(searchValue))
        : dispatch(Actions.retrieveDrinkIngredientRecipes(searchValue));
    }
  };

  return (
    <form>
      <label htmlFor="searchBar">
        <input
          data-testid="search-input"
          type="text"
          id="searchBar"
          value={ searchValue }
          onChange={ searchValueChange }
        />
      </label>
      <div>
        <label htmlFor="ingredient">
          <input
            data-testid="ingredient-search-radio"
            onChange={ radioChangeValue }
            id="ingredient"
            name="search-type"
            type="radio"
            value=""
          />
          Ingredientes
        </label>
        <label htmlFor="name">
          <input
            data-testid="name-search-radio"
            id="name"
            onChange={ radioChangeValue }
            name="search-type"
            type="radio"
          />
          Nome
        </label>
        <label htmlFor="firstLetter">
          <input
            data-testid="first-letter-search-radio"
            onChange={ radioChangeValue }
            id="firstLetter"
            name="search-type"
            type="radio"
          />
          Primeira letra
        </label>
        <button
          data-testid="exec-search-btn"
          type="button"
          onClick={ searchTypeFunc }
        >
          Buscar
        </button>
      </div>
    </form>
  );
}

SearchBar.propTypes = {
  location: PropTypes.string.isRequired,
};

export default SearchBar;
