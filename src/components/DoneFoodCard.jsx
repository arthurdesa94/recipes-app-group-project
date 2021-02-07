import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import CopyButton from './CopyButton';

function DoneFoodCard({ food, index }) {
  const {
    image,
    category,
    name,
    id,
    tags,
    area,
    doneDate,
  } = food;
  return (
    <div>
      <Link to={ `/comidas/${id}` }>
        <img
          className="recommendation-image"
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          alt="recipeImg"
        />
      </Link>

      <CopyButton
        location={ `/comidas/${id}` }
        testId={ `${index}-horizontal-share-btn` }
      />
      <Link to={ `/comidas/${id}` }>
        <h1 data-testid={ `${index}-horizontal-name` }>{name}</h1>
      </Link>
      <p data-testid={ `${index}-horizontal-top-text` }>
        {`Categoria: ${area} - ${category}`}
      </p>
      <p data-testid={ `${index}-horizontal-done-date` }>
        {`Feita em: ${doneDate}`}
      </p>
      {tags
        && tags.map((tagers) => (
          <p
            key={ `${tagers}${index}` }
            data-testid={ `${index}-${tagers}-horizontal-tag` }
          >
            {tags}
          </p>
        ))}
    </div>
  );
}

DoneFoodCard.propTypes = {
  food: PropTypes.shape({
    area: PropTypes.string,
    category: PropTypes.string,
    date: PropTypes.string,
    doneDate: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    strMeal: PropTypes.string,
    tags: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default DoneFoodCard;
