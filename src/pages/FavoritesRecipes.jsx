import React, { useEffect, useState } from 'react';
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

  const getFavoriteButton = (type, id, index) => {
    if (type === 'comida') {
      return (
        <FavoriteButtonFood
          id={ id }
          testId={ `${index}-horizontal-favorite-btn` }
        />
      );
    }
    return (
      <FavoriteButtonDrink
        id={ id }
        testId={ `${index}-horizontal-favorite-btn` }
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

  return (
    <div>
      <Header title="Receitas Favoritas" search={ false } />
      <div>
        <button type="button" data-testid="filter-by-all-btn">
          All
        </button>
        <button type="button" data-testid="filter-by-drink-btn">
          Drink
        </button>
        <button type="button" data-testid="filter-by-food-btn">
          Food
        </button>
      </div>

      <div>
        {getRecipes.map((element, index) => (
          <div key={ element.id }>
            <img
              src={ element.image }
              alt="teste"
              data-testid={ `${index}-horizontal-image` }
            />
            <p data-testid={ `${index}-horizontal-top-text` }>
              {getAreaOrAlcoholic(
                element.type,
                element.category,
                element.area,
                element.alcoholicOrNot,
              )}
            </p>
            <p data-testid={ `${index}-horizontal-name` }>{element.name}</p>
            {getCopyButton(element.type, element.id, index)}
            {getFavoriteButton(element.type, element.id, index)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteRecipes;
