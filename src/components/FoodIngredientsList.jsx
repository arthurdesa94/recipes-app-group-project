import React, { useState } from 'react';
import PropTypes from 'prop-types';

function FoodIngredientsList({ progressRecipes, id }) {
  const [getCheck, setCheck] = useState({});

  const handleStorageAdd = (name) => {
    const progressStorage = JSON.parse(
      localStorage.getItem('inProgressRecipes'),
    ) || {};
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({
        ...progressStorage,
        meals: {
          ...progressStorage.meals,
          [id]: [...progressRecipes.filter((element) => element !== name)],
        },
      }),
    );
  };

  const handleStorageRemove = (name) => {
    const progressStorage = JSON.parse(
      localStorage.getItem('inProgressRecipes'),
    ) || {};
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
    setCheck({
      ...getCheck,
      [name]: checked,
    });
    const className = checked ? 'line-through' : '';
    target.parentElement.className = className;
    handleStorage(name, checked);
  };

  return (
    <ul>
      {progressRecipes.map((element, index) => (
        <li data-testid={ `${index}-ingredient-step` } key={ element }>
          <label htmlFor={ element }>
            <input type="checkbox" name={ element } onChange={ handleChange } />
            {element}
          </label>
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
