import PropTypes, { string } from 'prop-types';
import React, { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function CopyButton({ location, testId = 'share-btn' }) {
  const [copyLink, setCopyLink] = useState(false);

  const onClickCopy = () => {
    copy(`http://localhost:3000${location}`);
    setCopyLink(true);
  };

  return (
    <div>
      <button
        onMouseLeave={ () => setCopyLink(false) }
        onClick={ onClickCopy }
        type="button"
      >
        <img src={ shareIcon } alt="share-btn" data-testid={ testId } />
      </button>
      {copyLink && <p>Link copiado!</p>}
    </div>
  );
}

CopyButton.propTypes = {
  location: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
};

export default CopyButton;
