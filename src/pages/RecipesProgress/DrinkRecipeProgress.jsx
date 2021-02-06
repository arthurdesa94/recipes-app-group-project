import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FavoriteButtonDrink from '../../components/FavoriteButtons/FavoriteButtonDrink';
import DrinkIngredientsList from '../../components/IngredientLists/DrinkIngredientsList';
import * as API from '../../services/drinkApi';
import CopyButton from '../../components/CopyButton';
import DoneRecipeButtonDrink from
  '../../components/DoneRecipeButtons/DoneRecipeButtonDrink';

function DrinkRecipeProgress({ match, history }) {
  const [progressRecipes, setProgressRecipes] = useState([]);
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

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <img
        src={ data[0].strDrinkThumb }
        alt="recipe-img"
        data-testid="recipe-photo"
      />
      <p data-testid="recipe-title">{data[0].strDrink}</p>
      <CopyButton location={ `/bebidas/${id}` } />
      <p data-testid="recipe-category">{data[0].strCategory}</p>
      <FavoriteButtonDrink id={ id } fetchAgain="true" />
      <DrinkIngredientsList
        progressRecipes={ progressRecipes }
        id={ id }
        setCheck={ setCheck }
        getCheck={ getCheck }
      />
      <p data-testid="instructions">{data[0].strInstructions}</p>
      <DoneRecipeButtonDrink
        history={ history }
        id={ id }
        data={ data }
        progressRecipes={ progressRecipes }
      />
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
