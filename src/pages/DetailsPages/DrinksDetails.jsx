import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../actions';
import CopyButton from '../../components/CopyButton';
import FavoriteButtonDrink from '../../components/FavoriteButtons/FavoriteButtonDrink';
import StartRecipeButtonDrink from '../../components/StartRecipeButtons/StartRecipeButtonDrink';
import Loading from '../../components/Loading';
import * as API from '../../services/foodApi';

function DrinksDetails({ match, location }) {
  const [response, setResponse] = useState([]);
  const [recommendation, setRecommedation] = useState([]);
  const [instructionsShow, setShow] = useState(false);
  const [ingredientsShow, setIng] = useState(false);
  const { id } = match.params;
  const dispatch = useDispatch();
  const { loading, detailsDrink } = useSelector((state) => state.recipes);
  const retrieveIngredients = () => {
    const ingredients = [];
    const maxIngredients = 15;
    for (let index = 1; index <= maxIngredients; index += 1) {
      if (
        detailsDrink[0][`strIngredient${index}`] !== null
        && detailsDrink[0][`strIngredient${index}`] !== ''
      ) {
        ingredients.push(
          `${detailsDrink[0][`strIngredient${index}`]}: ${
            detailsDrink[0][`strMeasure${index}`] === null
              ? 'Free choice'
              : detailsDrink[0][`strMeasure${index}`]
          }`,
        );
      }
    }
    return ingredients;
  };
  const fetchRecommendation = async () => {
    const data = await API.searchInitial();
    setResponse(data.meals);
  };

  const horizontalMakerFunc = () => {
    const firstItem = 0;
    const lastItem = 6;
    const array = [...response.slice(firstItem, lastItem)];
    setRecommedation(array);
  };

  useEffect(() => {
    dispatch(Actions.retrieveDrinkDetailsById(id));
    fetchRecommendation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const setIngredients = () => (ingredientsShow ? setIng(false) : setIng(true));
  const setInstructions = () => (instructionsShow ? setShow(false) : setShow(true));
  useEffect(() => {
    horizontalMakerFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);
  if (loading || !detailsDrink) return <Loading bgColor="from-blue-400 to-blue-500" />;
  return (
    <div className="text-center w-screen flex justify-center font-montserrat lg:h-screen text-white min-w-screen min-h-screen bg-gradient-to-r h-auto from-blue-400 to-blue-500">
      {detailsDrink.map(
        ({
          strDrinkThumb,
          strDrink,
          strCategory,
          strInstructions,
        }) => (
          <div
            className="flex overscroll-y-auto flex-col lg:flex-row items-center justify-center w-10/12 mx-auto h-10/12"
            key={ strDrink }
          >
            <div className="flex w-full lg:w-1/2 items-center flex-col">
              <h1
                className="header-container font-pacifico"
                data-testid="recipe-title"
              >
                {strDrink}
              </h1>
              <img
                className="rounded-lg w-4/5 p-2 bg-white shadow-xl border-t-2 border-b-2 border-blue-600"
                data-testid="recipe-photo"
                src={ strDrinkThumb }
                alt="recipeImg"
              />
              <div className="flex flex-row m-2 justify-around items-baseline">
                <CopyButton location={ location.pathname } />
                <FavoriteButtonDrink id={ id } />
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
                  className="bg-white text-2xl text-center focus:outline-none rounded-lg p-2 text-blue-500"
                >
                  Ingredientes
                </button>
                {ingredientsShow && (
                  <ul className="bg-white rounded-lg p-2">
                    {retrieveIngredients().map((ingredients, index) => (
                      <li
                        className="font-montserrat border-t-2 border-b-2 border-blue-300 m-2 p-2 rounded-lg text-blue-500"
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
                  className="bg-white p-2 rounded-lg text-blue-500 focus:outline-none text-2xl"
                  type="button"
                  onClick={ setInstructions }
                >
                  Instruções
                </button>
                {instructionsShow && (
                  <p
                    className="bg-white rounded-lg p-2 text-blue-500"
                    data-testid="instructions"
                  >
                    {strInstructions}
                  </p>
                )}
              </div>

              <div className="flex flex-none text-blue-600 w-full justify-between items-center mb-4 text-3xl flex-row lg:w-full overflow-x-auto h-auto">
                {recommendation.map((element, index) => (
                  <div
                    className="min-width font-pacifico bg-white p-2 m-2 rounded-lg flex flex-col"
                    data-testid={ `${index}-recomendation-card` }
                    key={ element.idMeal }
                  >
                    <img
                      className="rounded-lg"
                      src={ element.strMealThumb }
                      alt="recipeImg"
                    />
                    <p data-testid={ `${index}-recomendation-title` }>
                      {element.strMeal}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <StartRecipeButtonDrink
              id={ id }
              ingredients={ retrieveIngredients() }
            />
          </div>
        ),
      )}
    </div>
  );
}

DrinksDetails.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DrinksDetails;
