import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlayCircle,
  faCheckCircle,
  faTasks,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';

function StartRecipeButtonDrink({ id, ingredients }) {
  const buttonContinue = () => (
    <div className="">
      <Link
        className="link"
        to={ `/bebidas/${id}/in-progress` }
        data-testid="start-recipe-btn"
      >
        <FontAwesomeIcon className="relative fill-current -top-2 text-amber-600 transform hover:scale-105 transition-all" icon={ faTasks } size="4x" />
      </Link>
    </div>
  );
  const buttonInitial = () => (
    <Link
      className="link"
      to={ `/bebidas/${id}/in-progress` }
      data-testid="start-recipe-btn"
    >
      <FontAwesomeIcon className="relative fill-current -top-2 text-lightBlue-600 transform hover:scale-105 transition-all" icon={ faPlayCircle } size="4x" />
    </Link>
  );
  const verifyDoneRecipe = () => {
    const doneStorage = JSON.parse(
      localStorage.getItem('doneRecipes'),
    ) || [{ 0: { id: '' } }];
    const doneStorageConfirmed = doneStorage.some((element) => element.id === id);
    const progressStorage = JSON.parse(
      localStorage.getItem('inProgressRecipes'),
    ) || { cocktails: '' };
    if (doneStorageConfirmed) {
      return <FontAwesomeIcon className="relative -top-2 fill-current text-green-400 transform hover:scale-105 transition-all" icon={ faCheckCircle } size="4x" />;
    }
    if (!progressStorage.cocktails[id]) {
      return buttonInitial();
    }
    return buttonContinue();
  };

  return (
    <div className="footer w-screen bg-white p-2 flex items-center justify-center h-10 border-t-2 shadow-inner">
      {verifyDoneRecipe()}
    </div>
  );
}

StartRecipeButtonDrink.propTypes = {
  id: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default StartRecipeButtonDrink;
