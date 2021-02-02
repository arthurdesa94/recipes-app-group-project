import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import * as FOODAPI from '../services/foodApi';
import * as DRINKAPI from '../services/drinkApi';
import * as Actions from '../actions/index';

function CategoryBar({ type }) {
  const [response, setResponse] = useState([]);
  const two = 2;
  const zero = 0;
  const [flag, setFlag] = useState(two);
  const [lastTarget, setLastTarget] = useState('');
  const five = 5;
  const dispatch = useDispatch();

  const fetchCategory = async () => {
    if (type === 'foods') {
      const data = await FOODAPI.allFoodCategoriesRequest();
      setResponse(data.meals);
    } else {
      const data = await DRINKAPI.allDrinkCategoriesRequest();
      setResponse(data.drinks);
    }
  };

  const randomWordFood = () => {
    const letters = 'bcfklmprst';
    const nine = 9;
    const randomIndex = Math.round(Math.random() * nine);
    dispatch(Actions.retrievefirstLetterRecipes(letters[randomIndex]));
  };

  const randomWordDrink = () => {
    const letters = 'abcdfghjklmoprstvz';
    const seventeen = 17;
    const randomIndex = Math.round(Math.random() * seventeen);
    dispatch(Actions.retrieveDrinkFirstLetterRecipes(letters[randomIndex]));
  };

  useEffect(() => {
    fetchCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = ({ target }) => {
    const { innerText } = target;

    if (innerText !== lastTarget) {
      if (type === 'foods') {
        dispatch(Actions.retrieveCategoryRecipes(innerText));
      } else {
        dispatch(Actions.retrieveDrinkCategoryRecipes(innerText));
      }
    } else if (flag % two === zero) {
      if (type === 'foods') {
        randomWordFood();
      } else {
        randomWordDrink();
      }
      setFlag(flag + 1);
    } else if (flag % two !== zero) {
      if (type === 'foods') {
        dispatch(Actions.retrieveCategoryRecipes(innerText));
      } else {
        dispatch(Actions.retrieveDrinkCategoryRecipes(innerText));
      }
      setFlag(flag + 1);
    }

    setLastTarget(innerText);
  };

  // prettier-ignore
  return (
    <div>
      {response.map(
        (element, index) => index < five && (
          <button
            key={ element.strCategory }
            type="button"
            data-testid={ `${element.strCategory}-category-filter` }
            onClick={ handleClick }
          >
            {element.strCategory}
          </button>
        ),
      )}
    </div>
  );
}

CategoryBar.propTypes = {
  type: PropTypes.string.isRequired,
};

export default CategoryBar;
