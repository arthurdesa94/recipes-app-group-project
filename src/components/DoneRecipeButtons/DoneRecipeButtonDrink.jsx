import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../actions';

function DoneRecipeButtonDrink({ history, id, progressRecipes }) {
  const dispatch = useDispatch();
  const { detailsDrink } = useSelector((state) => state.recipes);
  const verifyLengthChecked = () => {
    const totalLength = progressRecipes.length;
    const progressStorage = JSON.parse(localStorage
      .getItem('inProgressRecipes')).cocktails[id] || [];
    if (progressStorage.length === totalLength) {
      return true;
    }
  };
  const handleClick = () => {
    const {
      idDrink,
      strCategory: category,
      strDrink: name,
      strDrinkThumb: image,
      strAlcoholic: alcoholicOrNot,
      strTags,
    } = detailsDrink[0];
    const favoriteObj = [
      {
        id: idDrink,
        type: 'bebida',
        area: '',
        category,
        alcoholicOrNot,
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

DoneRecipeButtonDrink.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  id: PropTypes.string.isRequired,
  progressRecipes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default DoneRecipeButtonDrink;
