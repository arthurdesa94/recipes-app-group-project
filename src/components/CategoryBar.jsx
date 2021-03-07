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

  useEffect(() => {
    const fetchCategory = async () => {
      if (type === 'foods') {
        const data = await FOODAPI.allFoodCategoriesRequest();
        setResponse(data.meals);
      } else {
        const data = await DRINKAPI.allDrinkCategoriesRequest();
        setResponse(data.drinks);
      }
    };
    fetchCategory();
  }, [type]);

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
        dispatch(Actions.retrieveInitialRecipes());
      } else {
        dispatch(Actions.retrieveDrinkInitialRecipes());
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

  const handleAll = () => {
    if (type === 'foods') dispatch(Actions.retrieveInitialRecipes());
    else dispatch(Actions.retrieveDrinkInitialRecipes());
  };

  // prettier-ignore
  return (
    <div className="display-h h-20 justify-between flex items-center w-4/5 mx-auto overflow-x-auto overflow-y-hidden">
      <div
        className={ `transform hover:scale-110 break-normal 
        transition-all h-auto w-auto font-monteserrat rounded-lg 
        border-b-2 ml-4 ${type === 'drinks' ? 'text-blue-400' : 'text-amber-300'}` }
      >
        <button
          className="focus:outline-none w-20 h-4 font-bold"
          type="button"
          data-testid="All-category-filter"
          onClick={ handleAll }
        >
          All
        </button>
      </div>

      {response.map(
        (element, index) => index < five && (
          <div
            className={ `transform hover:scale-110 break-normal 
          transition-all h-auto w-auto font-monteserrat rounded-lg 
          border-b-2 ml-4 ${type === 'drinks' ? 'text-blue-400' : 'text-amber-300'}` }
          >
            <button
              className="focus:outline-none w-36 h-4 font-bold"
              key={ element.strCategory }
              type="button"
              data-testid={ `${element.strCategory}-category-filter` }
              onClick={ handleClick }
            >
              {element.strCategory}
            </button>
          </div>

        ),
      )}
    </div>
  );
}

CategoryBar.propTypes = {
  type: PropTypes.string.isRequired,
};

export default CategoryBar;
