import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../actions';
import * as drinkAPI from '../../services/drinkApi';
import FavoriteButtonFood from '../../components/FavoriteButtons/FavoriteButtonFood';
import CopyButton from '../../components/CopyButton';
import StartRecipeButtonFood from '../../components/StartRecipeButtons/StartRecipeButtonFood';

function FoodsDetails({ match, location }) {
  const [instructionsShow, setShow] = useState(false);
  const [response, setResponse] = useState([]);
  const [recommendation, setRecommedation] = useState([]);

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

  const setInstructions = () => (instructionsShow ? setShow(false) : setShow(true));

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
    <div className="text-center w-screen font-pacifico text-white min-w-screen min-h-screen bg-gradient-to-r h-auto from-amber-400 to-amber-500">
      {details.map(
        ({
          strMealThumb,
          strMeal,
          strCategory,
          strInstructions,
          strYoutube,
        }) => (
          <div
            className="flex overscroll-y-auto flex-col items-center justify-center w-11/12 mx-auto h-10/12"
            key={ strMeal }
          >
            <h1 className="header-container" data-testid="recipe-title">
              {strMeal}
            </h1>
            <img
              className=" rounded-lg w-4/5 p-2 bg-white shadow-xl border-t-2 border-b-2 border-amber-600"
              data-testid="recipe-photo"
              src={ strMealThumb }
              alt="recipeImg"
            />
            <div className="flex flex-row m-2 justify-around items-baseline">
              <CopyButton location={ location.pathname } />
              <FavoriteButtonFood id={ id } />
            </div>
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
            <div className="flex flex-col bg-white rounded-xl shadow-xl">
              <button
                className="bg-white p-2 rounded-xl text-amber-500 focus:outline-none text-3xl"
                type="button"
                onClick={ setInstructions }
              >
                Instruções
              </button>
              {instructionsShow && (
                <p
                  className="bg-white rounded-xl p-2 text-amber-500"
                  data-testid="instructions"
                >
                  {strInstructions}
                </p>
              )}
            </div>
            <iframe
              className="m-2 p-2 border-t-2 border-b-2 border-white bg-whtie"
              data-testid="video"
              title={ strMeal }
              width="320"
              height="180"
              src={ strYoutube }
              frameBorder="0"
              allow="accelerometer; autoplay;
              clipboard-write; encrypted-media;
              gyroscope; picture-in-picture"
              allowFullScreen
            />
            <div className="flex text-amber-600 justify-between items-center mb-4 text-3xl flex-row w-screen overflow-auto">
              {recommendation.map((element, index) => (
                <div
                  className="min-width bg-white p-2 m-2 rounded-lg flex flex-col"
                  data-testid={ `${index}-recomendation-card` }
                  key={ element.idDrink }
                >
                  <img
                    className="rounded-lg"
                    src={ element.strDrinkThumb }
                    alt="recipeImg"
                  />
                  <p data-testid={ `${index}-recomendation-title` }>
                    {element.strDrink}
                  </p>
                </div>
              ))}
            </div>
            <StartRecipeButtonFood
              id={ id }
              ingredients={ retrieveIngredients() }
            />
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
