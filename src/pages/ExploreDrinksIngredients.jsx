import React from 'react';
import MenuInferior from '../components/MenuInferior';
import Header from '../components/Header';

function ExploreDrinksIngredients() {
  return (
    <div>
      <Header title="Explorar Ingredientes" search={ false } />
      <MenuInferior />
    </div>
  );
}

export default ExploreDrinksIngredients;
