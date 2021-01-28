import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import MenuInferior from '../components/MenuInferior';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';

function Foods({ location }) {
  const { setter } = useSelector((state) => state.user);
  const searchBarView = setter;
  return (
    <div>
      <Header title="Comidas" />
      {searchBarView && <SearchBar location={ location.pathname } />}
      <MenuInferior />
    </div>
  );
}

Foods.propTypes = {
  location: PropTypes.arrayOf({
    pathname: PropTypes.string,
  }).isRequired,
};

export default Foods;
