import React from 'react';
import PropTypes from 'prop-types';

function FoodIngredientsList({ progressRecipes, id, setCheck, getCheck }) {
  const handleStorageRemove = (name) => {
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

  const handleStorageAdd = (name) => {
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
    if (!checked) {
      handleStorageRemove(name);
    } else {
      handleStorageAdd(name);
    }
  };

  const handleChange = ({ target }) => {
    const { name, checked } = target;
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
          checked
        />
      );
    }
    return (
      <input
        type="checkbox"
        name={ element }
        id={ element }
        onChange={ handleChange }
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
  getCheck: PropTypes.objectOf(PropTypes.bool).isRequired,
  id: PropTypes.string.isRequired,
  progressRecipes: PropTypes.arrayOf(PropTypes.string).isRequired,
  setCheck: PropTypes.func.isRequired,
};

export default FoodIngredientsList;
