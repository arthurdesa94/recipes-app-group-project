import React from 'react';
import MenuInferior from '../components/MenuInferior';
import Header from '../components/Header';

function ExploreDrinks() {
  return (
    <div>
      ExploreDrinks
      <Header title="Explorar bebidas" search={ false } />
      <MenuInferior />
    </div>
  );
}

export default ExploreDrinks;
