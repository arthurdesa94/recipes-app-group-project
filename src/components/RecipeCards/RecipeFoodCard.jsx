import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loading from '../Loading';

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
          <Link to={ `/comidas/${idMeal}` } key={ idMeal }>
            <div data-testid={ `${index}-recipe-card` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ strMealThumb }
                alt="recipeimage"
              />
              <p data-testid={ `${index}-card-name` }>{strMeal}</p>
            </div>
          </Link>
        ));
      }
      return <Redirect to={ `/comidas/${recipes[0].idMeal}` } />;
    }

    if (size > 1) {
      return recipes.map(({ strMeal, idMeal, strMealThumb }, index) => {
        if (index <= maxListSize) {
          return (
            <div className="w-2/5 bg-white h-auto flex flex-col justify-center items-center transform hover:scale-105 transition-all border-b-4 p-4 m-4 border-t-4 rounded-xl border-amber-500 shadow-2xl">
              <Link className="link text-amber-500 hover:text-amber-500" to={ `/comidas/${idMeal}` } key={ idMeal }>
                <div data-testid={ `${index}-recipe-card` }>
                  <img
                    className="w-11/12 mx-auto shadow-xl bg-white rounded-xl "
                    data-testid={ `${index}-card-img` }
                    src={ strMealThumb }
                    alt="recipeimage"
                  />
                  <p
                    className="text-center w-auto h-auto text-3xl m-4"
                    data-testid={ `${index}-card-name` }
                  >
                    {strMeal}
                  </p>
                </div>
              </Link>
            </div>
          );
        }
        return '';
      });
    }
  };
  if (loading) return <Loading />
  return <div className="w-screen h-auto flex-wrap justify-center items-center flex flex-row">{returnRecipes()}</div>;
}

export default RecipeFoodCard;
