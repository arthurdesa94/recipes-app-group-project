import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../actions';
import * as drinkAPI from '../services/drinkApi';
import FavoriteButtonFood from '../components/FavoriteButtons/FavoriteButtonFood';

const copy = require('clipboard-copy');

function FoodsDetails({ match, location }) {
  const [response, setResponse] = useState([]);
  const [recommendation, setRecommedation] = useState([]);
  const [copyLink, setCopyLink] = useState(false);
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

  const fetchRecommendation = async () => {
    const data = await drinkAPI.searchInitialDrink();
    setResponse(data.drinks);
  };

  const horizontalMakerFunc = () => {
    const firstItem = 0;
    const lastItem = 6;
    const array = [...response.slice(firstItem, lastItem)];
    setRecommedation(array);
  };

  const onClickCopy = () => {
    copy(`http://localhost:3000${location.pathname}`);
    setCopyLink(true);
  };

  useEffect(() => {
    dispatch(Actions.retrieveFoodDetailsById(id));
    fetchRecommendation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    horizontalMakerFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

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
              className="header-image"
              data-testid="recipe-photo"
              src={ strMealThumb }
              alt="recipeImg"
            />
            <div>
              <button
                onMouseLeave={ () => setCopyLink(false) }
                onClick={ onClickCopy }
                type="button"
                data-testid="share-btn"
              >
                Compartilhar
              </button>
              {copyLink && <p>Link copiado!</p>}
              <FavoriteButtonFood id={ id } />
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
              width="256"
              height="144"
              src={ strYoutube }
              frameBorder="0"
              allow="accelerometer; autoplay;
              clipboard-write; encrypted-media;
              gyroscope; picture-in-picture"
              allowFullScreen
            />
            <div className="recommendation">
              {recommendation.map((element, index) => (
                <div
                  className="recommendation-card"
                  data-testid={ `${index}-recomendation-card` }
                  key={ element.idDrink }
                >
                  <img
                    className="recommendation-image"
                    src={ element.strDrinkThumb }
                    alt="recipeImg"
                  />
                  <p data-testid={ `${index}-recomendation-title` }>
                    {element.strDrink}
                  </p>
                </div>
              ))}
            </div>
            <Link
              className="footer"
              to={ `/comidas/${id}/in-progress` }
              data-testid="start-recipe-btn"
            >
              Iniciar receita
            </Link>
          </div>
        ),
      )}
    </div>
  );
}

FoodsDetails.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default FoodsDetails;
