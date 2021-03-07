import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FavoriteButtonFood from '../../components/FavoriteButtons/FavoriteButtonFood';
import FoodIngredientsList from '../../components/IngredientLists/FoodIngredientsList';
import * as API from '../../services/foodApi';
import CopyButton from '../../components/CopyButton';
import Loading from '../../components/Loading';
import DoneRecipeButtonFood from '../../components/DoneRecipeButtons/DoneRecipeButtonFood';

function FoodRecipeProgress({ match, history }) {
  const [progressRecipes, setProgressRecipes] = useState([]);
  const [data, setData] = useState();
  const [instructionsShow, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [getCheck, setCheck] = useState({});
  const { params } = match;
  const { id } = params;
  const setInstructions = () => (instructionsShow ? setShow(false) : setShow(true));
  // useEffect para setar data da API
  // prettier-ignore
  useEffect(() => {
    const fetchApi = async () => {
      const response = await API.searchFoodByIdRequest(id);
      const filteredResponse = Object.entries(response.meals[0]).filter(
        (element) => element[0].includes('Ingredient')
        && element[1] !== ''
        && element[1] !== null,
      ).map((element) => element[1]);

      setProgressRecipes(filteredResponse);

      setData(response.meals);
      setLoading(false);
    };
    fetchApi();
  }, [id]);

  // useEffect para setar LocalStorage
  // prettier-ignore
  useEffect(() => {
    const emptySize = 0;

    const handleStorage = () => {
      const progressStorage = JSON
        .parse(localStorage
          .getItem('inProgressRecipes')) || { meals: '', cocktails: '' };
      if (progressRecipes.length !== emptySize && !progressStorage.meals[id]) {
        localStorage.setItem(
          'inProgressRecipes',
          JSON.stringify({
            ...progressStorage,
            meals: {
              ...progressStorage.meals,
              [id]: [],
            },
          }),
        );
      }
    };
    handleStorage();
  }, [id, progressRecipes]);

  if (loading) return <Loading bgColor="from-amber-300 to-amber-400" />;

  return (
    <div className="text-center w-screen flex-col lg:flex-row flex justify-around items-baseline font-montserrat lg:h-screen text-white min-w-screen min-h-screen bg-gradient-to-r h-auto from-amber-400 to-amber-500">
      <div className="flex lg:h-screen/80 w-full lg:w-1/2 items-center flex-col">
        <h1
          className="header-container font-pacifico"
          data-testid="recipe-title"
        >
          {data[0].strMeal}
        </h1>
        <img
          className="rounded-lg w-4/5 p-2 bg-white shadow-xl border-t-2 border-b-2 border-amber-600"
          src={ data[0].strMealThumb }
          alt="recipe-img"
          data-testid="recipe-photo"
        />
        <div className="flex">
          <CopyButton location={ `/comidas/${id}` } />
          <FavoriteButtonFood id={ id } fetchAgain="true" />
        </div>

        <h3 data-testid="recipe-category">{`Categoria: ${data[0].strCategory}`}</h3>
      </div>
      <div className="justify-between flex flex-col w-full flex-none lg:w-1/2 lg:h-screen/80 overflow-auto">
        <h1 className="header-container text-3xl font-pacifico"> Checklist dos ingredientes !</h1>
        <FoodIngredientsList
          progressRecipes={ progressRecipes }
          id={ id }
          setCheck={ setCheck }
          getCheck={ getCheck }
        />
        <div className="flex flex-col mb-20 mx-4 bg-white rounded-xl shadow-xl">
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
              {data[0].strInstructions}
            </p>
          )}
        </div>
      </div>
      <DoneRecipeButtonFood
        history={ history }
        id={ id }
        data={ data }
        progressRecipes={ progressRecipes }
      />
    </div>
  );
}

FoodRecipeProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default FoodRecipeProgress;
