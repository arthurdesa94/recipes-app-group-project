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
    <div>
      <Header title="Explorar Ingredientes" search={ false } />

      {data.map(
        (element, index) => index < maxCards && (
          <Link
            to="/comidas"
            onClick={ () => handleClick(element.strIngredient) }
            key={ element.idIngredient }
          >
            <div
              data-testid={ `${index}-ingredient-card` }
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ FOODAPI.returnSmallIngredientPhotoUrl(element.strIngredient) }
                alt="teste"
                style={ { width: 300, height: 200 } }
              />
              <p data-testid={ `${index}-card-name` }>
                {element.strIngredient}
              </p>
            </div>
          </Link>
        ),
      )}

      <MenuInferior />
    </div>
  );
}

export default ExploreFoodsIngredients;
