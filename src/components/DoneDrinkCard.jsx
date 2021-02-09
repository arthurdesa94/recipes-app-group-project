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
    <div className=" rounded-xl font-pacifico text-green-500 bg-white p-3 shadow-xl border-t-2 border-b-2 border-green-500 my-4 flex flex-col justify-center items-center">
      <Link className="link text-green-500 hover:text-green-500" to={ `/bebidas/${id}` }>
        <img
          className="shadow-xl rounded-xl"
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          alt="recipeImg"
        />
      </Link>

      <CopyButton
        location={ `/bebidas/${id}` }
        testId={ `${index}-horizontal-share-btn` }
      />
      <Link className="link text-green-500 hover:text-green-500" to={ `/bebidas/${id}` }>
        <h1
          data-testid={ `${index}-horizontal-name` }
        >
          {`${name}: ${alcoholicOrNot}`}
        </h1>
      </Link>
      <p className="text-2xl"data-testid={ `${index}-horizontal-top-text` }>
        {`Categoria: ${category} ${alcoholicOrNot}`}
      </p>
      <p className="text-2xl">{`Area: ${!area ? 'desconhecida' : 'area'}`}</p>
      <p className="text-2xl" data-testid={ `${index}-horizontal-done-date` }>
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
