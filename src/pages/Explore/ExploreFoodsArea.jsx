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
    <div className="main-container bg-gradient-to-tr from-amber-400 to-amber-500">
      <div className="items-container">
        <div className="header-container">
          <Header title="Explorar Origem" />
        </div>

        <select
          className="bg-white font-pacifico focus:outline-none text-2xl border-b-2 border-t-2 text-amber-600 border-amber-600 rounded-lg w-11/12"
          data-testid="explore-by-area-dropdown"
          value={ state.dropdown }
          onChange={ handleChange }
        >
          <option className="bg-white" data-testid="All-option">All</option>
          {data.map(({ strArea }) => (
            <option key={ strArea } data-testid={ `${strArea}-option` }>
              {strArea}
            </option>
          ))}
        </select>
        <div className="w-screen h-auto flex-wrap justify-center items-center flex flex-row">
          {cards.map(
            ({ strMeal, strMealThumb, idMeal }, index) => index < maxCards && (
              <div
                className="w-2/5 bg-white h-auto flex flex-col justify-center items-center transform hover:scale-105 transition-all border-b-4 p-4 m-4 border-t-4 rounded-xl border-amber-600 shadow-2xl"
                data-testid={ `${index}-recipe-card` }
              >
                <Link
                  class="link text-amber-600 hover:text-amber-600"
                  to={ `/comidas/${idMeal}` }
                  key={ idMeal }
                >
                  <img
                    className="w-11/12 mx-auto shadow-xl bg-white rounded-xl"
                    src={ strMealThumb }
                    alt="meal-img"
                    data-testid={ `${index}-card-img` }
                  />
                  <p
                    className="text-center w-auto h-auto text-3xl m-4"
                    data-testid={ `${index}-card-name` }
                  >
                    {strMeal}
                  </p>
                </Link>
              </div>
            ),
          )}
        </div>
        <MenuInferior />
      </div>
    </div>
  );
}

export default ExploreFoodsArea;
