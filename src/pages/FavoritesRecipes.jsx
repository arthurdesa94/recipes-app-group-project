import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import CopyButton from '../components/CopyButton';
import FavoriteButtonFood from '../components/FavoriteButtons/FavoriteButtonFood';
import FavoriteButtonDrink from '../components/FavoriteButtons/FavoriteButtonDrink';

function FavoriteRecipes() {
  const [getRecipes, setRecipes] = useState([]);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setRecipes(favoriteRecipes);
  }, []);

  const setTrue = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setRecipes(favoriteRecipes);
  };

  const getFavoriteButton = (type, id, index) => {
    if (type === 'comida') {
      return (
        <FavoriteButtonFood
          id={ id }
          fetchAgain="true"
          testId={ `${index}-horizontal-favorite-btn` }
          setTrue={ setTrue }
        />
      );
    }
    return (
      <FavoriteButtonDrink
        id={ id }
        fetchAgain="true"
        testId={ `${index}-horizontal-favorite-btn` }
        setTrue={ setTrue }
      />
    );
  };

  const getCopyButton = (type, id, index) => {
    if (type === 'comida') {
      return (
        <CopyButton
          location={ `/comidas/${id}` }
          testId={ `${index}-horizontal-share-btn` }
        />
      );
    }
    return (
      <CopyButton
        location={ `/bebidas/${id}` }
        testId={ `${index}-horizontal-share-btn` }
      />
    );
  };

  const getAreaOrAlcoholic = (type, category, area, alcoholicOrNot) => {
    if (type === 'comida') {
      return `${area} - ${category}`;
    }
    return `${alcoholicOrNot}`;
  };

  const handleFilter = (type) => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (type === 'comida') {
      setRecipes(
        favoriteRecipes.filter((element) => element.type === 'comida'),
      );
    } else if (type === 'bebida') {
      setRecipes(
        favoriteRecipes.filter((element) => element.type === 'bebida'),
      );
    } else {
      setRecipes(favoriteRecipes);
    }
  };

  return (
    <div>
      <Header title="Receitas Favoritas" search={ false } />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => handleFilter('all') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => handleFilter('bebida') }
        >
          Drinks
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => handleFilter('comida') }
        >
          Food
        </button>
      </div>

      <div>
        {getRecipes.map((element, index) => (
          <div key={ element.id }>
            <Link to={ `/${element.type}s/${element.id}` }>
              <img
                className="recommendation-image"
                src={ element.image }
                alt="teste"
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            <p data-testid={ `${index}-horizontal-top-text` }>
              {getAreaOrAlcoholic(
                element.type,
                element.category,
                element.area,
                element.alcoholicOrNot,
              )}
            </p>
            <Link to={ `/${element.type}s/${element.id}` }>
              <p data-testid={ `${index}-horizontal-name` }>{element.name}</p>
            </Link>
            {getCopyButton(element.type, element.id, index)}
            {getFavoriteButton(element.type, element.id, index)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteRecipes;
