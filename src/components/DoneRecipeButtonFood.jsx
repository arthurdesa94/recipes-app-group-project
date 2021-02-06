import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import * as Actions from '../actions';

function DoneRecipeButtonFood({ history, id, data, progressRecipes }) {
  const dispatch = useDispatch();
  const verifyLengthChecked = () => {
    const totalLength = progressRecipes.length;
    const progressStorage = JSON
      .parse(localStorage.getItem('inProgressRecipes')).meals[id] || [];
    if (progressStorage.length === totalLength) {
      return true;
    }
  };

  const handleClick = () => {
    dispatch(Actions.storageDoneRecipes(data));
    history.push('/receitas-feitas');
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

  return (
    <div>{verifyLengthChecked() ? buttonEnabled() : buttonDisabled()}</div>
  );
}

DoneRecipeButtonFood.propTypes = {
  data: PropTypes.arrayOf().isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  id: PropTypes.string.isRequired,
  progressRecipes: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default DoneRecipeButtonFood;
