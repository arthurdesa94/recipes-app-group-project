import React from 'react';
import MenuInferior from '../components/MenuInferior';
import Header from '../components/Header';

function ExploreFoodsIngredients() {
  return (
    <div>
      ExploreFoodsIngredients
      <Header title="Explorar Ingredientes" search={ false } />
      <MenuInferior />
    </div>
  );
}

export default ExploreFoodsIngredients;
