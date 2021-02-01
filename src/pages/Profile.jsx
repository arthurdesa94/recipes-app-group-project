import React from 'react';
import MenuInferior from '../components/MenuInferior';
import Header from '../components/Header';

function Profile() {
  return (
    <div>
      <Header title="Perfil" search={ false } />
      <MenuInferior />
    </div>
  );
}

export default Profile;
