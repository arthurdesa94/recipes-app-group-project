import React from 'react';
import MenuInferior from '../components/MenuInferior';
import Header from '../components/Header';

function ExploreFoods() {
  return (
    <div>
      ExploreFoods
      <Header title="Explorar comidas" search={ false } />
      <MenuInferior />
    </div>
  );
}

export default ExploreFoods;
