import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MenuInferior from '../../components/MenuInferior';
import Header from '../../components/Header';
import * as FOODAPI from '../../services/foodApi';

function ExploreFoodsArea() {
  const [data, setData] = useState([]);
  const [cards, setCards] = useState([]);
  const [state, setState] = useState({
    dropdown: 'All',
  });
  const maxCards = 12;

  const handleChange = ({ target }) => {
    const { value } = target;
    setState({ dropdown: value });
  };

  // Effect para as options
  useEffect(() => {
    const fetchOptions = async () => {
      const response = await FOODAPI.allFoodAreasRequest();
      setData(response.meals);
    };
    fetchOptions();
  }, []);

  // Effect para os cards
  useEffect(() => {
    let resp;
    const fetchCards = async () => {
      if (state.dropdown === 'All') {
        resp = await FOODAPI.searchInitial();
        setCards(resp.meals);
      } else {
        resp = await FOODAPI.searchFoodByArea(state.dropdown);
        setCards(resp.meals);
      }
    };

    fetchCards();
  }, [state.dropdown]);

  return (
    <div>
      <Header title="Explorar Origem" />
      <select
        data-testid="explore-by-area-dropdown"
        value={ state.dropdown }
        onChange={ handleChange }
      >
        <option data-testid="All-option">All</option>
        {data.map(({ strArea }) => (
          <option key={ strArea } data-testid={ `${strArea}-option` }>
            {strArea}
          </option>
        ))}
      </select>
      <div>
        {cards.map(
          ({ strMeal, strMealThumb, idMeal }, index) => index < maxCards && (
            <Link to={ `/comidas/${idMeal}` } key={ idMeal }>
              <div data-testid={ `${index}-recipe-card` }>
                <img
                  src={ strMealThumb }
                  alt="meal-img"
                  data-testid={ `${index}-card-img` }
                />
                <p data-testid={ `${index}-card-name` }>{strMeal}</p>
              </div>
            </Link>
          ),
        )}
      </div>
      <MenuInferior />
    </div>
  );
}

export default ExploreFoodsArea;
