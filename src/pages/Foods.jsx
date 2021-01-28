import React from 'react';
import MenuInferior from '../components/MenuInferior';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';

export default function Foods() {
  const searchBarView = false;
  return (
    <div>
      <Header title="Comidas" />
      {searchBarView && <SearchBar />}
      <MenuInferior />
    </div>
  );
}
