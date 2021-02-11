import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FavoriteButtonDrink from '../../components/FavoriteButtons/FavoriteButtonDrink';
import DrinkIngredientsList from '../../components/IngredientLists/DrinkIngredientsList';
import * as API from '../../services/drinkApi';
import Loading from '../../components/Loading';
import CopyButton from '../../components/CopyButton';
import DoneRecipeButtonDrink from '../../components/DoneRecipeButtons/DoneRecipeButtonDrink';

function DrinkRecipeProgress({ match, history }) {
  const [progressRecipes, setProgressRecipes] = useState([]);
  const [instructionsShow, setShow] = useState(false);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [getCheck, setCheck] = useState({});
  const { params } = match;
  const { id } = params;
  console.log(data);

  // useEffect para setar data da API
  // prettier-ignore
  useEffect(() => {
    const fetchApi = async () => {
      const response = await API.searchDetailedDrinkByIdRequest(id);
      const filteredResponse = Object.entries(response.drinks[0]).filter(
        (element) => element[0].includes('Ingredient')
        && element[1] !== ''
        && element[1] !== null,
      ).map((element) => element[1]);

      setProgressRecipes(filteredResponse);

      setData(response.drinks);
      setLoading(false);
    };
    fetchApi();
  }, [id]);

  const setInstructions = () => (instructionsShow ? setShow(false) : setShow(true));

  // useEffect para setar LocalStorage
  // prettier-ignore
  useEffect(() => {
    const emptySize = 0;

    const handleStorage = () => {
      const progressStorage = JSON
        .parse(localStorage
          .getItem('inProgressRecipes')) || { cocktails: '', meals: '' };
      if (progressRecipes.length !== emptySize && !progressStorage.cocktails[id]) {
        localStorage.setItem(
          'inProgressRecipes',
          JSON.stringify({
            ...progressStorage,
            cocktails: {
              ...progressStorage.cocktails,
              [id]: [],
            },
          }),
        );
      }
    };
    handleStorage();
  }, [id, progressRecipes]);

  if (loading) return <Loading bgColor="from-lightBlue-300 to-lightBlue-400" />;

  return (
    <div className="main-container font-pacifico text-white bg-gradient-to-tr from-lightBlue-300 to-lightBlue-400">
      <div className="items-container">
        <div className="header-container text-center ">
          <h1 data-testid="recipee-title">{data[0].strDrink}</h1>
          <h4 data-testid="recipe-category">{data[0].strCategory}</h4>
        </div>
        <img
          className="rounded-lg w-4/5 p-2 bg-white shadow-xl border-t-2 border-b-2 border-lightBlue-600"
          src={ data[0].strDrinkThumb }
          alt="recipe-img"
          data-testid="recipe-photo"
        />
        <div className="flex flex-row justify-around items-baseline">
          <CopyButton location={ `/bebidas/${id}` } />
          <FavoriteButtonDrink id={ id } fetchAgain="true" />
        </div>

        <DrinkIngredientsList
          progressRecipes={ progressRecipes }
          id={ id }
          setCheck={ setCheck }
          getCheck={ getCheck }
        />

        <div className="h-auto flex mb-10 bg-white text-center rounded-xl shadow-xl flex-col">
          <button
            className="p-2 text-lightBlue-500 focus:outline-none text-3xl"
            type="button"
            onClick={ setInstructions }
          >
            Instruções
          </button>
          {instructionsShow && (
            <p className=" p-2 text-lightBlue-500" data-testid="instructions">
              {data[0].strInstructions}
            </p>
          )}
        </div>
        <DoneRecipeButtonDrink
          history={ history }
          id={ id }
          data={ data }
          progressRecipes={ progressRecipes }
        />
      </div>
    </div>
  );
}

DrinkRecipeProgress.propTypes = {
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

export default DrinkRecipeProgress;
