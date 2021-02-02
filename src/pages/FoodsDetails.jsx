import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../actions';

function FoodsDetails({ match }) {
  const { id } = match.params;
  const dispatch = useDispatch();
  const { loading, details } = useSelector((state) => state.recipes);
  const retrieveIngredients = () => {
    const ingredients = [];
    const maxIngredients = 20;
    for (let index = 1; index <= maxIngredients; index += 1) {
      if (
        details[0][`strIngredient${index}`] !== ''
        && details[0][`strIngredient${index}`] !== null
      ) {
        ingredients.push(
          `${details[0][`strIngredient${index}`]}: ${
            details[0][`strMeasure${index}`]
          }`,
        );
      }
    }
    return ingredients;
  };
  useEffect(() => {
    dispatch(Actions.retrieveFoodDetailsById(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (loading) return <h1>Loading...</h1>;
  return (
    <div>
      {details.map(
        ({
          strMealThumb,
          strMeal,
          strCategory,
          strInstructions,
          strYoutube,
        }) => (
          <div key={ strMeal }>
            <img
              data-testid="recipe-photo"
              src={ strMealThumb }
              alt="recipeImg"
            />
            <div>
              <button type="submit" data-testid="favorite-btn">
                Compartilhar
              </button>
              <button type="submit" data-testid="share-btn">
                Favoritar
              </button>
            </div>
            <h1 data-testid="recipe-title">{strMeal}</h1>
            <p data-testid="recipe-category">{`Categoria: ${strCategory}`}</p>
            <h4>Ingredientes</h4>
            <ul>
              {retrieveIngredients().map((ingredients, index) => (
                <li
                  data-testid={ `${index}-ingredient-name-and-measure` }
                  key={ ingredients }
                >
                  {ingredients}
                </li>
              ))}
            </ul>
            <p data-testid="instructions">{`Instruções: ${strInstructions}`}</p>
            <iframe
              data-testid="video"
              title={ strMeal }
              width="560"
              height="315"
              src={ strYoutube }
              frameBorder="0"
              allow="accelerometer; autoplay;
              clipboard-write; encrypted-media;
              gyroscope; picture-in-picture"
              allowFullScreen
            />
            <button type="submit" data-testid="start-recipe-btn">Iniciar receita</button>
          </div>
        ),
      )}
    </div>
  );
}

export default FoodsDetails;
