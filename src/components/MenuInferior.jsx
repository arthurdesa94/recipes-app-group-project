import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCocktail, faCompass, faPizzaSlice } from '@fortawesome/free-solid-svg-icons';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function MenuInferior() {
  return (
    <footer
      data-testid="footer"
      className="footer p-2 blur h-auto w-screen bg-clip-ppading flex justify-around border-b-4 border-t-4 border-white shadow-xl rounded-lg"
    >
      <Link className="link bg-white rounded-full text-lightBlue-500 transform hover:scale-110 hover:text-lightBlue-600 transition-all" to="/bebidas">
        <FontAwesomeIcon icon={ faCocktail } size="3x" />
      </Link>
      <Link className="link bg-white text-red-500 rounded-full transform hover:scale-110 hover:text-red-600 transition-all" to="/explorar">
        <FontAwesomeIcon icon={ faCompass } size="3x" />
      </Link>
      <Link className="link bg-white text-amber-500 rounded-full  transform hover:scale-110 hover:text-amber-600 transition-all" to="/comidas">
        <FontAwesomeIcon data-fa-mask="fas fa-square" icon={ faPizzaSlice } size="3x" />
      </Link>
    </footer>
  );
}

export default MenuInferior;
