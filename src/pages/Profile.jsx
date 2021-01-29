import React from 'react';
import MenuInferior from '../components/MenuInferior';
import Header from '../components/Header';

function Profile() {
  return (
    <div>
      Profile
      <Header title="Profile" search={ false } />
      <MenuInferior />
    </div>
  );
}

export default Profile;
