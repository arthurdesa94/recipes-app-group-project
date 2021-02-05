import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FavoriteButtonFood from '../components/FavoriteButtonFood';
import FoodIngredientsList from '../components/FoodIngredientsList';
import * as API from '../services/foodApi';

function FoodRecipeProgress({ match }) {
  const [progressRecipes, setProgressRecipes] = useState([]);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const { params } = match;
  const { id } = params;

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
    const handleStorage = () => {
      const progressStorage = JSON
        .parse(localStorage.getItem('inProgressRecipes')) || { meals: '' };
      console.log(progressStorage)
      if (progressRecipes.length !== 0 && !progressStorage.meals[id]) {
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

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <img
        src={data[0].strMealThumb}
        alt="recipe-img"
        data-testid="recipe-photo"
      />
      <p data-testid="recipe-title">{data[0].strMeal}</p>
      <button data-testid="share-btn" type="button">
        Compartilhar
      </button>
      <p data-testid="recipe-category">{data[0].strCategory}</p>
      <FavoriteButtonFood id={id} />
      <FoodIngredientsList progressRecipes={progressRecipes} id={id} setProgressRecipes={ setProgressRecipes } />
      <p data-testid="instructions">{data[0].strInstructions}</p>
      <button type="button" data-testid="finish-recipe-btn">
        Finalizar Receita
      </button>
    </div>
  );
}

FoodRecipeProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default FoodRecipeProgress;
