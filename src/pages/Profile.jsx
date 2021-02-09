import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';

function Profile() {
  const eraseLocalStorage = () => {
    localStorage.clear();
  };

  const profileItems = () => {
    const { email } = JSON.parse(localStorage.getItem('user')) || { email: '' };
    return (
      <div className="flex flex-column justify-center items-center">
        <div className="flex w-10/12 m-4 flex-column items-center border-b-2 border-white rounded-lg">
          <h3 className="font-pacifico text-white text-3xl">Bem-vindo!</h3>
          <h4 className="font-pacifico text-3xl text-white" data-testid="profile-email">
            {email}
          </h4>
        </div>
        <div className="flex w-full items-center h-full text-3xl  border-b-2 border-white rounded-lg flex-column">
          <Link
            className="transform bg-white opacity-90 hover:opacity-100 text-indigo-300 hover:text-indigo-300 hover:scale-105 transition-all link text-center border-b-2 border-t-2 p-2 border-white rounded-lg shadow-sm m-2"
            to="/receitas-feitas"
            data-testid="profile-done-btn"
          >
            Receitas Feitas
          </Link>
          <Link
            className="transform bg-white opacity-90 hover:opacity-100 text-indigo-300 hover:text-indigo-300 hover:scale-105 transition-all  link text-center border-b-2 border-t-2 p-2 border-white rounded-lg shadow-sm m-2"
            to="/receitas-favoritas"
            data-testid="profile-favorite-btn"
          >
            Receitas Favoritas
          </Link>
          <Link
            className="transform bg-white opacity-90 hover:opacity-100 text-indigo-300 hover:text-indigo-300 hover:scale-105 transition-all  link text-center border-b-2 p-2 m-2 border-t-2 border-white rounded-lg shadow-sm w-full"
            to="/"
            onClick={ eraseLocalStorage }
            data-testid="profile-logout-btn"
          >
            Sair
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen overflow-y-scroll w-screen min-h-screen bg-gradient-to-tr from-indigo-300 to-indigo-400">
      <div className="h-auto flex flex-column items-center mx-auto justify-center w-11/12">
        <div className="blur bg-clip-ppading border-b-4 border-t-4 m-4 w-10/12 border-white shadow-xl rounded-lg p-4 mx-auto">
          <Header title="Perfil" search={ false } />
        </div>

        {profileItems()}
        <MenuInferior />
      </div>
    </div>
  );
}
export default Profile;
