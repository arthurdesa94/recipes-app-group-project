import React, { useState } from 'react';
import PropTypes from 'prop-types';

function FoodIngredientsList({ progressRecipes, id }) {
  const [getCheck, setCheck] = useState({});

  const handleStorageAdd = (name) => {
    const progressStorage = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({
        ...progressStorage,
        meals: {
          ...progressStorage.meals,
          [id]: [
            ...progressStorage.meals[id].filter((element) => element !== name),
          ],
        },
      }),
    );
  };

  const handleStorageRemove = (name) => {
    const progressStorage = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({
        ...progressStorage,
        meals: {
          ...progressStorage.meals,
          [id]: [...progressStorage.meals[id], name],
        },
      }),
    );
  };

  const handleStorage = (name, checked) => {
    if (checked) {
      handleStorageAdd(name);
    } else {
      handleStorageRemove(name);
    }
  };

  const handleChange = ({ target }) => {
    const { name, checked } = target;
    console.log(target);
    setCheck({
      ...getCheck,
      [name]: checked,
    });
    handleStorage(name, checked);
  };

  const returnCheckbox = (element) => {
    const progressStorage = JSON
      .parse(localStorage.getItem('inProgressRecipes')).meals[id] || [];
    const filterProgress = progressStorage.some((ingredient) => element === ingredient);
    if (filterProgress) {
      return (
        <input
          type="checkbox"
          name={ element }
          id={ element }
          onChange={ handleChange }
        />
      );
    }
    return (
      <input
        type="checkbox"
        name={ element }
        id={ element }
        onChange={ handleChange }
        checked
      />
    );
  };

  return (
    <ul>
      {progressRecipes.map((element, index) => (
        <li data-testid={ `${index}-ingredient-step` } key={ element }>
          {returnCheckbox(element)}
          <label htmlFor={ element }>{element}</label>
        </li>
      ))}
    </ul>
  );
}

FoodIngredientsList.propTypes = {
  progressRecipes: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
};

export default FoodIngredientsList;
