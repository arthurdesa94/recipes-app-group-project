import React from 'react';
import PropTypes from 'prop-types';

function DrinkIngredientsList({ progressRecipes, id, setCheck, getCheck }) {
  const handleStorageRemove = (name) => {
    const progressStorage = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({
        ...progressStorage,
        cocktails: {
          ...progressStorage.cocktails,
          [id]: [
            ...progressStorage.cocktails[id].filter((element) => element !== name),
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
        cocktails: {
          ...progressStorage.cocktails,
          [id]: [...progressStorage.cocktails[id], name],
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
      .parse(localStorage.getItem('inProgressRecipes')).cocktails[id] || [];
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

DrinkIngredientsList.propTypes = {
  getCheck: PropTypes.objectOf(PropTypes.bool).isRequired,
  id: PropTypes.string.isRequired,
  progressRecipes: PropTypes.arrayOf(PropTypes.string).isRequired,
  setCheck: PropTypes.func.isRequired,
};

export default DrinkIngredientsList;
