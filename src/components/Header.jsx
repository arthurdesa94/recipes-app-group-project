import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import profileIcon from '../images/profileIcon.svg';
import * as Actions from '../actions/index';
import '../App.css';

function Header({ title, search }) {
  const zero = 0;
  const two = 2;
  const [valueFlag, setValueFlag] = useState(two);
  const dispatch = useDispatch();

  const handleClick = (flag) => {
    if (flag % two === zero) {
      dispatch(Actions.setForSearchBar(true));
    } else {
      dispatch(Actions.setForSearchBar(false));
    }
    setValueFlag(valueFlag + 1);
  };

  return (
    <div>
      <header className="h-full w-full flex justify-between items-baseline p-4">
        <Link to="/perfil">
          <img
            className="title"
            src={ profileIcon }
            alt="Profile img"
            data-testid="profile-top-btn"
          />
        </Link>
        <h1 className="font-pacifico text-white" data-testid="page-title">{title}</h1>
        {search && (
          <button type="button" onClick={ () => handleClick(valueFlag) }>
            <FontAwesomeIcon size="3x" className=" mr-2 transform fill-current text-white hover:scale-110 hover:text-green-500" icon={ faSearch } />
          </button>

        )}
        {!search && <div />}
      </header>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  search: PropTypes.bool,
};

Header.defaultProps = {
  search: true,
};

export default Header;
