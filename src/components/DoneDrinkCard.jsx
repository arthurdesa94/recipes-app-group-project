import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import CopyButton from './CopyButton';

function DoneDrinkCard({ drink, index }) {
  console.log(drink);
  const {
    image,
    category,
    name,
    id,
    tags,
    area,
    alcoholicOrNot,
    doneDate,
  } = drink;
  return (
    <div>
      <Link to={ `/bebidas/${id}` }>
        <img
          className="recommendation-image"
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          alt="recipeImg"
        />
      </Link>

      <CopyButton
        location={ `/bebidas/${id}` }
        testId={ `${index}-horizontal-share-btn` }
      />
      <Link to={ `/bebidas/${id}` }>
        <h1
          data-testid={ `${index}-horizontal-name` }
        >
          {`${name}: ${alcoholicOrNot}`}
        </h1>
      </Link>
      <p data-testid={ `${index}-horizontal-top-text` }>
        {`Categoria: ${category} ${alcoholicOrNot}`}
      </p>
      <p>{`Area: ${area !== undefined ? area : 'desconhecida'}`}</p>
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

DoneDrinkCard.propTypes = {
  drink: PropTypes.shape({
    alcoholicOrNot: PropTypes.string,
    area: PropTypes.string,
    category: PropTypes.string,
    doneDate: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    tags: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default DoneDrinkCard;
