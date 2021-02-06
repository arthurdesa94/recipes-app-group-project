import React from 'react';
import Header from '../components/Header';

function DoneRecipes() {
  return (
    <div>
      <Header title="Receitas Feitas" search={ false } />
      <div>
        <button type="button" data-testid="filter-by-all-btn">
          All
        </button>
        <button type="button" data-testid="filter-by-drink-btn">
          Drink
        </button>
        <button type="button" data-testid="filter-by-food-btn">
          Food
        </button>
      </div>
    </div>
  );
}

export default DoneRecipes;
