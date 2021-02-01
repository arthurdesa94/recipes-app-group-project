import React from 'react';
import MenuInferior from '../components/MenuInferior';
import Header from '../components/Header';

function ExploreDrinks() {
  return (
    <div>
      <Header title="Explorar Bebidas" search={ false } />
      <MenuInferior />
    </div>
  );
}

export default ExploreDrinks;
