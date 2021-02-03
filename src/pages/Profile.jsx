import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';

function Profile() {
  const eraseLocalStorage = () => {
    localStorage.clear();
  };
  const profileItems = () => {
    const { email } = JSON.parse(localStorage.getItem('user'));
    return (
      <div>
        <Header title="Profile" />
        <h4 data-testid="profile-email">{ email }</h4>
        <Link to="/receitas-feitas">
          <button
            type="button"
            data-testid="profile-done-btn"
          >
            Receitas Feitas
          </button>
        </Link>
        <Link to="/receitas-favoritas">
          <button
            type="button"
            data-testid="profile-favorite-btn"
          >
            Receitas Favoritas
          </button>
        </Link>
        <Link to="/">
          <button
            onClick={ () => eraseLocalStorage() }
            data-testid="profile-logout-btn"
          >
          Sair
          </button>
        </Link>
        <MenuInferior />
      </div>
    );
  };
  return (profileItems());
  }
export default Profile;
