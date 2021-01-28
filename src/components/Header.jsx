import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../App.css';

function Header({ title }) {
  return (
    <header>
      <Link to="/perfil">
        <img
          className="title"
          src={ profileIcon }
          alt="Profile img"
          data-testid="profile-top-btn"
        />
      </Link>
      <div data-testid="page-title">{title}</div>
      <img
        src={ searchIcon }
        alt="Search img"
        data-testid="search-top-btn"
      />
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
