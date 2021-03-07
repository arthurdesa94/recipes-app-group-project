import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import * as Actions from '../../actions';
import * as drinkAPI from '../../services/drinkApi';
import FavoriteButtonFood from '../../components/FavoriteButtons/FavoriteButtonFood';
import CopyButton from '../../components/CopyButton';
import StartRecipeButtonFood from '../../components/StartRecipeButtons/StartRecipeButtonFood';

function FoodsDetails({ match, location }) {
  const [instructionsShow, setShow] = useState(false);
  const [ingredientsShow, setIng] = useState(false);
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

  const setIngredients = () => (ingredientsShow ? setIng(false) : setIng(true));

  useEffect(() => {
    dispatch(Actions.retrieveFoodDetailsById(id));
    fetchRecommendation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    horizontalMakerFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  if (loading) return <Loading bgColor="from-amber-300 to-amber-400" />;
  return (
    <div className="text-center w-screen flex justify-center font-montserrat lg:h-screen text-white min-w-screen min-h-screen bg-gradient-to-r h-auto from-amber-400 to-amber-500">
      {details.map(
        ({
          strMealThumb,
          strMeal,
          strCategory,
          strInstructions,
          strYoutube,
        }) => (
          <div
            className="flex overscroll-y-auto flex-col lg:flex-row items-center justify-center w-10/12 mx-auto h-10/12"
            key={ strMeal }
          >
            <div className="flex w-full lg:w-1/2 items-center flex-col">
              <h1
                className="header-container font-pacifico"
                data-testid="recipe-title"
              >
                {strMeal}
              </h1>
              <img
                className="rounded-lg w-4/5 p-2 bg-white shadow-xl border-t-2 border-b-2 border-amber-600"
                data-testid="recipe-photo"
                src={ strMealThumb }
                alt="recipeImg"
              />
              <div className="flex flex-row m-2 justify-around items-baseline">
                <CopyButton location={ location.pathname } />
                <FavoriteButtonFood id={ id } />
              </div>
              <p
                className="font-montserrat font-3xl"
                data-testid="recipe-category"
              >
                {`Categoria: ${strCategory}`}
              </p>
            </div>
            <div className="flex flex-col w-full flex-none lg:w-1/2 lg:h-screen/80 overflow-auto">
              <div className="flex flex-col bg-white rounded-xl shadow-xl mb-2">
                <button
                  type="button"
                  onClick={ setIngredients }
                  className="bg-white text-2xl text-center focus:outline-none rounded-lg p-2 text-amber-500"
                >
                  Ingredientes
                </button>
                {ingredientsShow && (
                  <ul className="bg-white rounded-lg p-2">
                    {retrieveIngredients().map((ingredients, index) => (
                      <li
                        className="font-montserrat border-t-2 border-b-2 border-amber-300 m-2 p-2 rounded-lg text-amber-500"
                        data-testid={ `${index}-ingredient-name-and-measure` }
                        key={ ingredients }
                      >
                        {ingredients}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex flex-col bg-white rounded-xl shadow-xl">
                <button
                  className="bg-white p-2 rounded-lg text-amber-500 focus:outline-none text-2xl"
                  type="button"
                  onClick={ setInstructions }
                >
                  Instruções
                </button>
                {instructionsShow && (
                  <p
                    className="bg-white rounded-lg p-2 text-amber-500"
                    data-testid="instructions"
                  >
                    {strInstructions}
                  </p>
                )}
              </div>
              <iframe
                className="m-2 p-2 border-t-2 border-b-2 w-auto h-auto border-white bg-whtie"
                data-testid="video"
                title={ strMeal }
                src={ strYoutube }
                frameBorder="0"
                allow="accelerometer; autoplay;
              clipboard-write; encrypted-media;
              gyroscope; picture-in-picture"
                allowFullScreen
              />
              <div className="flex flex-none text-amber-600 w-full justify-between items-center mb-4 text-3xl flex-row lg:w-full overflow-x-auto h-auto">
                {recommendation.map((element, index) => (
                  <div
                    className="min-width font-pacifico bg-white p-2 m-2 rounded-lg flex flex-col"
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
