import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import MenuInferior from '../../components/MenuInferior';
import Header from '../../components/Header';
import * as FOODAPI from '../../services/foodApi';
import * as Actions from '../../actions/index';

function ExploreFoodsIngredients() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const maxCards = 12;

  const handleClick = (ingredient) => {
    dispatch(Actions.retrieveIngredientRecipes(ingredient));
    dispatch(Actions.setForIngredient(true));
  };

  useEffect(() => {
    const fetchAllIngredients = async () => {
      const response = await FOODAPI.allFoodIngredientsRequest();
      setData(response.meals);
    };
    fetchAllIngredients();
  }, []);

  return (
    <div className="main-container bg-gradient-to-tr from-amber-400 to-amber-500">
      <div className="items-container">
        <div className="header-container">
          <Header title="Explorar Ingredientes" search={ false } />
        </div>
        <div className="w-screen h-auto flex-wrap justify-center items-center flex flex-row">
          {data.map(
            (element, index) => index < maxCards && (
              <div
                className="w-2/5 bg-white h-auto flex flex-col justify-center items-center transform hover:scale-105 transition-all border-b-4 p-4 m-4 border-t-4 rounded-xl border-amber-500 shadow-2xl"
                data-testid={ `${index}-ingredient-card` }
              >
                <Link
                  className="link text-amber-600 hover:text-amber-600"
                  to="/comidas"
                  onClick={ () => handleClick(element.strIngredient) }
                  key={ element.idIngredient }
                >
                  <img
                    className="w-11/12 h-auto mx-auto bg-white rounded-xl"
                    data-testid={ `${index}-card-img` }
                    src={ FOODAPI.returnSmallIngredientPhotoUrl(
                      element.strIngredient,
                    ) }
                    alt="teste"
                    style={ { width: 300, height: 200 } }
                  />
                  <p
                    className="text-center w-auto h-auto text-3xl m-4"
                    data-testid={ `${index}-card-name` }
                  >
                    {element.strIngredient}
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

export default ExploreFoodsIngredients;
