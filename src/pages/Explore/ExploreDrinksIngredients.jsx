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
    <div>
      <Header title="Explorar Ingredientes" search={ false } />

      {data.map(
        (element, index) => index < maxCards && (
          <Link
            to="/bebidas"
            onClick={ () => handleClick(element.strIngredient1) }
            key={ element.strIngredient1 }
          >
            <div
              data-testid={ `${index}-ingredient-card` }
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ DRINKAPI.returnSmallIngredientPhotoUrl(element.strIngredient1) }
                alt="teste"
                style={ { width: 300, height: 200 } }
              />
              <p data-testid={ `${index}-card-name` }>
                {element.strIngredient1}
              </p>
            </div>
          </Link>
        ),
      )}

      <MenuInferior />
    </div>
  );
}

export default ExploreDrinksIngredients;
