import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCocktail, faCompass, faPizzaSlice } from '@fortawesome/free-solid-svg-icons';

function MenuInferior({ type }) {
  const textGray = 'text-trueGray-800';
  return (
    <footer
      data-testid="footer"
      className="bg-white footer p-2 blur h-auto w-screen bg-clip-ppading flex justify-around  border-t-2 border-trueGray-400 shadow-xl rounded-lg"
    >
      <Link className={ `link  text-trueGray-800 rounded-full transform hover:scale-110 hover:text-blue-400 transition-all ${type === 'drinks' ? 'text-blue-400' : textGray} ` } to="/bebidas">
        <FontAwesomeIcon icon={ faCocktail } size="2x" />
      </Link>
      <Link className={ `link  text-trueGray-800 rounded-full transform hover:scale-110 hover:text-red-400 transition-all ${type === 'explore' ? 'text-red-400' : textGray} ` } to="/explorar">
        <FontAwesomeIcon icon={ faCompass } size="2x" />
      </Link>
      <Link className={ `link  text-trueGray-800 rounded-full transform hover:scale-110 hover:text-amber-400 transition-all ${type === 'foods' ? 'text-amber-400' : textGray} ` } to="/comidas">
        <FontAwesomeIcon data-fa-mask="fas fa-square" icon={ faPizzaSlice } size="2x" />
      </Link>
    </footer>
  );
}

MenuInferior.propTypes = {
  type: PropTypes.string,
};
MenuInferior.defaultProps = {
  type: '',
};
export default MenuInferior;
