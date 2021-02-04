import React, { useEffect, useState } from 'react';
import FavoriteButtonFood from '../components/FavoriteButtonFood';
import * as API from '../services/foodApi';

function FoodRecipeProgress({ match }) {
  const [progressRecipes, setProgressRecipes] = useState();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const { params } = match;
  const { id } = params;

  useEffect(() => {
    const fetchApi = async () => {
      const response = await API.searchFoodByIdRequest(id);
      const filteredResponse = response.meals.find(
        (element) => element.idMeal === id,
      );
      setData(filteredResponse);
      setLoading(false);
    };
    fetchApi();

    const arrayRecipe = Object.entries(
      JSON.parse(localStorage.getItem('inProgressRecipes')).meals || [],
    );
    const findRecipe = arrayRecipe.find((element) => element[0] === id);
    setProgressRecipes(findRecipe[1]);
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <img
        src={ data.strMealThumb }
        alt="recipe-img"
        data-testid="recipe-photo"
      />
      <p data-testid="recipe-title">{data.strMeal}</p>
      <button data-testid="share-btn" type="button">
        Compartilhar
      </button>
      <p data-testid="recipe-category">{data.strCategory}</p>
      <FavoriteButtonFood id={ id } />
      <ul>
        {progressRecipes.map((element, index) => (
          <li data-testid={ `${index}-ingredient-step` } key={ element }>
            {element}
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{data.strInstructions}</p>
      <button type="button" data-testid="finish-recipe-btn">
        Finalizar Receita
      </button>
    </div>
  );
}

export default FoodRecipeProgress;
