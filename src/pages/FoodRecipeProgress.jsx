import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FavoriteButtonFood from '../components/FavoriteButtonFood';
import FoodIngredientsList from '../components/FoodIngredientsList';
import * as API from '../services/foodApi';
import CopyButton from '../components/CopyButton';

function FoodRecipeProgress({ match, history }) {
  const [progressRecipes, setProgressRecipes] = useState([]);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [getCheck, setCheck] = useState({});
  const { params } = match;
  const { id } = params;

  const handleClick = () => {
    history.push('/receitas-feitas');
  };

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
        .parse(localStorage.getItem('inProgressRecipes')) || { meals: '', cocktails: '' };
      if (progressRecipes.length !== emptySize && !progressStorage.meals[id]) {
        localStorage.setItem(
          'inProgressRecipes',
          JSON.stringify({
            ...progressStorage,
            meals: {
              ...progressStorage.meals,
              [id]: [...progressRecipes],
            },
          }),
        );
      }
    };
    handleStorage();
  }, [id, progressRecipes]);

  const verifyLengthChecked = () => {
    const emptySize = 0;
    const progressStorage = JSON
      .parse(localStorage.getItem('inProgressRecipes')).meals[id] || [];
    if (progressStorage.length === emptySize) {
      return true;
    }
  };

  const buttonEnabled = () => (
    <button type="button" data-testid="finish-recipe-btn" onClick={ handleClick }>
      Finalizar Receita
    </button>
  );

  const buttonDisabled = () => (
    <button type="button" data-testid="finish-recipe-btn" disabled>
      Finalizar Receita
    </button>
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <img
        src={ data[0].strMealThumb }
        alt="recipe-img"
        data-testid="recipe-photo"
      />
      <p data-testid="recipe-title">{data[0].strMeal}</p>
      <CopyButton location={ `/comidas/${id}` } />
      <p data-testid="recipe-category">{data[0].strCategory}</p>
      <FavoriteButtonFood id={ id } fetchAgain="true" />
      <FoodIngredientsList
        progressRecipes={ progressRecipes }
        id={ id }
        setCheck={ setCheck }
        getCheck={ getCheck }
      />
      <p data-testid="instructions">{data[0].strInstructions}</p>
      {verifyLengthChecked() ? buttonEnabled() : buttonDisabled()}
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
