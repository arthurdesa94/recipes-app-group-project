import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

function RecipeFoodCard() {
  const { recipes, loading } = useSelector((state) => state.recipes);
  const size = recipes.length;
  const maxListSize = 11;
  const returnRecipes = () => {
    if (size === 1) {
      if (recipes[0].error === null) {
        // eslint-disable-next-line no-alert
        return alert(
          'Sinto muito, não encontramos nenhuma receita para esses filtros.',
        );
      }
      if (recipes[0].strCategory === undefined) {
        return recipes.map(({ strMeal, idMeal, strMealThumb }, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ idMeal }>
            <img
              data-testid={ `${index}-card-img` }
              src={ strMealThumb }
              alt="recipeimage"
            />
            <p data-testid={ `${index}-card-name` }>{strMeal}</p>
          </div>
        ));
      }
      return <Redirect to={ `/comidas/${recipes[0].idMeal}` } />;
    }

    if (size > 1) {
      return recipes.map(({ strMeal, idMeal, strMealThumb }, index) => {
        if (index <= maxListSize) {
          return (
            <div data-testid={ `${index}-recipe-card` } key={ idMeal }>
              <img
                data-testid={ `${index}-card-img` }
                src={ strMealThumb }
                alt="recipeimage"
              />
              <p data-testid={ `${index}-card-name` }>{strMeal}</p>
            </div>
          );
        }
        return '';
      });
    }
  };
  if (loading) return <h1>Loading...</h1>;
  return <div>{returnRecipes()}</div>;
}

export default RecipeFoodCard;
