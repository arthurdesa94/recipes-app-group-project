import React, { useState } from 'react';
import Header from '../components/Header';
import DoneFoodCard from '../components/DoneFoodCard';
import DoneDrinkCard from '../components/DoneDrinkCard';

function DoneRecipes() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const [filter, setFilter] = useState('All');
  const retrieveAllRecipes = () => (
    <div>
      {doneRecipes.map((element, index) => {
        if (element.type === 'comida') {
          return <DoneFoodCard key={ index } food={ element } index={ index } />;
        }
        return <DoneDrinkCard key={ index } drink={ element } index={ index } />;
      })}
    </div>
  );

  const retrieveFoodRecipes = () => doneRecipes
    .filter((element) => element.type === 'comida')
    .map((foodCard, index) => (
      <DoneFoodCard key={ index } food={ foodCard } index={ index } />
    ));
  const retrieveDrinkRecipes = () => doneRecipes
    .filter((element) => element.type === 'bebida')
    .map((drinkCard, index) => (
      <DoneDrinkCard key={ index } drink={ drinkCard } index={ index } />
    ));
  const retrieveRecipes = () => {
    switch (filter) {
    case 'All':
      return retrieveAllRecipes();
    case 'Drink':
      return retrieveDrinkRecipes();
    case 'Food':
      return retrieveFoodRecipes();
    default:
      return <h1>Sem receitas terminadas</h1>;
    }
  };
  if (!doneRecipes && filter !== 'Loading') {
    return setFilter('Loading');
  }
  return (
    <div>
      <Header title="Receitas Feitas" search={ false } />
      <div>
        <button
          type="button"
          onClick={ () => setFilter('All') }
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          onClick={ () => setFilter('Drink') }
          data-testid="filter-by-drink-btn"
        >
          Drink
        </button>
        <button
          type="button"
          onClick={ () => setFilter('Food') }
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
      </div>
      {retrieveRecipes()}
    </div>
  );
}

export default DoneRecipes;
