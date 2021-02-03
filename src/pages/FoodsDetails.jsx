import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../actions';
import * as drinkAPI from '../services/drinkApi';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const copy = require('clipboard-copy');

function FoodsDetails({ match, location }) {
  const [favorite, setFavorite] = useState(false);
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

  const favoriteFunc = () => {
    const {
      idMeal,
      strArea: area,
      strCategory: category,
      strMeal: name,
      strMealThumb: image,
    } = details[0];
    const favoriteObj = [
      { id: idMeal, type: 'comida', area, category, alcoholicOrNot: '', name, image },
    ];
    const localStoreFav = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorite) {
      const removedRecipe = localStoreFav.filter((result) => result.id !== id);
      const removedRecipeStringfy = JSON.stringify(removedRecipe);
      setFavorite(false);
      return localStorage.setItem('favoriteRecipes', removedRecipeStringfy);
    }
    setFavorite(true);
    console.log(localStoreFav);
    const firstRecipeCase = JSON.stringify(favoriteObj);
    if (localStoreFav[0].id === '' || localStoreFav.length === 0) {
      return localStorage.setItem('favoriteRecipes', firstRecipeCase);
    }
    const newRecipeStringfy = JSON.stringify([...favoriteObj, ...localStoreFav]);
    return localStorage.setItem('favoriteRecipes', newRecipeStringfy);
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

  const retriveFavoriteState = () => {
    const atualLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    return setFavorite(atualLocalStorage.find((local) => local.id === id));
  };

  useEffect(() => {
    horizontalMakerFunc();
    retriveFavoriteState();
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
              <button
                onClick={ favoriteFunc }
                type="button"
                data-testid="favorite-btn"
              >
                <img
                  src={ favorite ? blackHeartIcon : whiteHeartIcon }
                  alt="heart"
                />
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

export default FoodsDetails;
