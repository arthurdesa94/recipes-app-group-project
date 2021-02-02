import { set } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../actions';
import * as API from '../services/foodApi';

function FoodsDetails({ match }) {
  const lastPage = 2;
  const firstPage = 0;
  const [response, setResponse] = useState([]);
  const [recommendation, setRecommedation ] = useState([]);
  const [carouselState, setCarousel] = useState(firstPage);
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

  const carouselBase = () => {
    const startIndex = 0;
    const secondIndex = 2;
    const fourthIndex = 4;
    const sixthIndex = 6;
    const array = [
      [response.slice(startIndex, secondIndex)],
      [response.slice(secondIndex, fourthIndex)],
      [response.slice(fourthIndex, sixthIndex)],
    ];
    console.log(array);
    setRecommedation(array[carouselState]);
  };

  const fetchRecommendation = async () => {
    const data = await API.searchInitial();
    setResponse(data.meals);
  };

  useEffect(() => {
    dispatch(Actions.retrieveFoodDetailsById(id));
    fetchRecommendation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    carouselBase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, carouselState]);
  const handleClickCarouselRight = () => {
    if (carouselState === lastPage) return setCarousel(firstPage);
    setCarousel(carouselState + 1);
  };
  const handleClickCarouselLeft = () => {
    if (carouselState === firstPage) return setCarousel(lastPage);
    setCarousel(carouselState - 1);
  };
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
            <div>
              <button onClick={ handleClickCarouselLeft } type="button">{'<'}</button>
              {recommendation[0].map((element) => (
                <div key={ element.idMeal }>
                  <img src={ element.strMealThumb } alt="recipeImg" />
                  <p>{ element.strMeal }</p>
                </div>
              ))}
              <button onClick={ handleClickCarouselRight } type="button">{'>'}</button>
            </div>
            <button type="button" data-testid="start-recipe-btn">
              Iniciar receita
            </button>
          </div>
        ),
      )}
    </div>
  );
}

export default FoodsDetails;
