import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';

function Profile() {
  const user = useSelector((state) => state.user);
  const eraseLocalStorage = () => {
    localStorage.clear();
  };
  const profileItems = () => {
    // const { email } = JSON.parse(localStorage.getItem('user'));
    return (
      <div>
        <h4 data-testid="profile-email">{user.email}</h4>
        <Link to="/receitas-feitas" data-testid="profile-done-btn">
          Receitas Feitas
        </Link>
        <Link to="/receitas-favoritas" data-testid="profile-favorite-btn">
          Receitas Favoritas
        </Link>
        <Link
          to="/"
          onClick={ () => eraseLocalStorage() }
          data-testid="profile-logout-btn"
        >
          Sair
        </Link>
      </div>
    );
  };
  return (
    <div>
      <Header title="Perfil" search={ false } />
      {profileItems()}
      <MenuInferior />
    </div>
  );
}
export default Profile;
