import PropTypes from 'prop-types';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../actions';

function DoneRecipeButtonFood({ history, id, progressRecipes }) {
  const dispatch = useDispatch();
  const { details } = useSelector((state) => state.recipes);
  const verifyLengthChecked = () => {
    const totalLength = progressRecipes.length;
    const progressStorage = JSON
      .parse(localStorage.getItem('inProgressRecipes')).meals[id] || [];
    if (progressStorage.length === totalLength) {
      return true;
    }
  };

  const handleClick = () => {
    const {
      idMeal,
      strArea: area,
      strCategory: category,
      strMeal: name,
      strMealThumb: image,
      strTags,
    } = details[0];
    const favoriteObj = [
      {
        id: idMeal,
        type: 'comida',
        area,
        category,
        alcoholicOrNot: '',
        name,
        image,
        doneDate: new Date().toLocaleDateString(),
        tags: strTags ? strTags.split(',') : '',
      },
    ];
    dispatch(Actions.storageDoneRecipes(favoriteObj));
    history.push('/receitas-feitas');
  };

  const buttonEnabled = () => (
    <button type="button" data-testid="finish-recipe-btn" onClick={ handleClick }>
      <FontAwesomeIcon size="4x" className="transform relative transition-all hover:scale-110  -top-2 fill-current text-green-400" icon={ faCheckCircle } />
    </button>
  );

  const buttonDisabled = () => (
    <button type="button" data-testid="finish-recipe-btn" disabled>
      <FontAwesomeIcon size="4x" className="transform relative transition-all -top-2 fill-current text-green-100" icon={ faCheckCircle } />
    </button>
  );

  return (
    <div className="footer w-screen bg-white p-2 flex items-center justify-center h-10 border-t-2 shadow-inner">{verifyLengthChecked() ? buttonEnabled() : buttonDisabled()}</div>
  );
}

DoneRecipeButtonFood.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  id: PropTypes.string.isRequired,
  progressRecipes: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default DoneRecipeButtonFood;
