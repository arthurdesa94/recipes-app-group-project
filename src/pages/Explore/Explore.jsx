import React from 'react';
import { Link } from 'react-router-dom';
import MenuInferior from '../../components/MenuInferior';
import Header from '../../components/Header';

function Explore() {
  return (
    <div className="main-container bg-white">
      <div className="items-container">
        <div className="header-container bg-gradient-to-tr from-red-500 to-red-600">
          <Header title="Explorar" search={ false } />
        </div>
        <Link className="explore-link text-red-400 hover:text-red-600" to="/explorar/comidas" data-testid="explore-food">
          Explorar Comidas
        </Link>
        <Link className="explore-link text-red-400 hover:text-red-600" to="/explorar/bebidas" data-testid="explore-drinks">
          Explorar Bebidas
        </Link>
        <MenuInferior type="explore" />
      </div>
    </div>
  );
}

export default Explore;
