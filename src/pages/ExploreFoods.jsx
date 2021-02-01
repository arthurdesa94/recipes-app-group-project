import React from 'react';
import MenuInferior from '../components/MenuInferior';
import Header from '../components/Header';

function ExploreFoods() {
  return (
    <div>
      <Header title="Explorar Comidas" search={ false } />
      <MenuInferior />
    </div>
  );
}

export default ExploreFoods;
