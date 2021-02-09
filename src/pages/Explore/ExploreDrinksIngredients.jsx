import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import MenuInferior from '../../components/MenuInferior';
import Header from '../../components/Header';
import * as DRINKAPI from '../../services/drinkApi';
import * as Actions from '../../actions/index';

function ExploreDrinksIngredients() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const maxCards = 12;

  const handleClick = (ingredient) => {
    dispatch(Actions.retrieveDrinkIngredientRecipes(ingredient));
    dispatch(Actions.setForIngredient(true));
  };

  useEffect(() => {
    const fetchAllIngredients = async () => {
      const response = await DRINKAPI.allDrinkIngredientsRequest();
      setData(response.drinks);
    };
    fetchAllIngredients();
  }, []);

  return (
    <div className="main-container bg-gradient-to-tr from-lightBlue-400 to-lightBlue-500">
      <div className="items-container">
        <div className="header-container">
          <Header title="Explorar Ingredientes" search={ false } />
        </div>

        <div className="w-screen h-auto flex-wrap justify-center items-center flex flex-row">
          {data.map(
            (element, index) => index < maxCards && (
              <div
                className="w-2/5 bg-white h-auto flex flex-col justify-center items-center transform hover:scale-105 transition-all border-b-4 p-4 m-4 border-t-4 rounded-xl border-lightBlue-600 shadow-2xl"
                data-testid={ `${index}-ingredient-card` }
              >
                <Link
                  className="link text-lightBlue-600 hover:text-lightBlue-600"
                  to="/bebidas"
                  onClick={ () => handleClick(element.strIngredient1) }
                  key={ element.strIngredient1 }
                >
                  <img
                    className="w-11/12 h-auto mx-auto bg-white rounded-xl "
                    data-testid={ `${index}-card-img` }
                    src={ DRINKAPI.returnSmallIngredientPhotoUrl(
                      element.strIngredient1,
                    ) }
                    alt="teste"
                    style={ { width: 300, height: 200 } }
                  />
                  <p
                    className="text-center w-auto h-auto text-3xl m-4"
                    data-testid={ `${index}-card-name` }
                  >
                    {element.strIngredient1}
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

export default ExploreDrinksIngredients;
