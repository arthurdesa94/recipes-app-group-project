import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import * as Actions from '../actions/index';
import '../App.css';

function Header({ title }) {
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
    <header className="header">
      <Link to="/perfil">
        <img
          className="title"
          src={ profileIcon }
          alt="Profile img"
          data-testid="profile-top-btn"
        />
      </Link>
      <div data-testid="page-title">{title}</div>
      <button type="button" onClick={ () => handleClick(valueFlag) }>
        <img src={ searchIcon } alt="Search img" data-testid="search-top-btn" />
      </button>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
