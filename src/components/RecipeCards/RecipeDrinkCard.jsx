import React from 'react';
import { Redirect, Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import Loading from '../Loading';

function RecipeDrinkCard() {
  const { recipesDrink, loading } = useSelector((state) => state.recipes);
  const size = recipesDrink.length;
  const maxListSize = 11;

  const returnRecipes = () => {
    if (size === 1) {
      if (recipesDrink[0].error === null) {
        // eslint-disable-next-line no-alert
        return alert(
          'Sinto muito, não encontramos nenhuma receita para esses filtros.',
        );
      }
      if (recipesDrink[0].strCategory === undefined) {
        return recipesDrink.map(
          ({ strDrink, idDrink, strDrinkThumb }, index) => (
            <Link to={ `/bebidas/${idDrink}` } key={ idDrink }>
              <div data-testid={ `${index}-recipe-card` }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ strDrinkThumb }
                  alt="recipeimage"
                />
                <p data-testid={ `${index}-card-name` }>{strDrink}</p>
              </div>
            </Link>
          ),
        );
      }
      return <Redirect to={ `/bebidas/${recipesDrink[0].idDrink}` } />;
    }
    if (size > 1) {
      return recipesDrink.map(({ strDrink, idDrink, strDrinkThumb }, index) => {
        if (index <= maxListSize) {
          return (
            <div
              className="w-11/12 sm:w-1/3 bg-white h-auto flex flex-column justify-center items-center transform hover:scale-105 transition-all border-b-4 p-2 m-4 border-t-4 rounded-xl border-lightBlue-600 shadow-2xl"
              data-testid={ `${index}-recipe-card` }
            >
              <Link className="link text-lightBlue-600 hover:text-lightBlue-600" to={ `/bebidas/${idDrink}` } key={ idDrink }>
                <img
                  className="transform transition-all hover:rotate- w-11/12 sm:w-full object-cover mx-auto shadow-xl bg-white rounded-xl"
                  data-testid={ `${index}-card-img` }
                  src={ strDrinkThumb }
                  alt="recipeimage"
                />
                <p
                  className="text-center w-auto h-auto text-3xl m-4"
                  data-testid={ `${index}-card-name` }
                >
                  {strDrink}
                </p>
              </Link>
            </div>
          );
        }
        return '';
      });
    }
  };

  if (loading) return <Loading />;
  return <div className="w-screen h-screen rounded-2xl my-4 p-4 flex-wrap overflow-y-scroll justify-center items-center flex flex-row">{returnRecipes()}</div>;
}

export default RecipeDrinkCard;
