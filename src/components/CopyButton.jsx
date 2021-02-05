import PropTypes from 'prop-types';
import React, { useState } from 'react';

const copy = require('clipboard-copy');

function CopyButton({ location }) {
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
        data-testid="share-btn"
      >
        Compartilhar
      </button>
      {copyLink && <p>Link copiado!</p>}
    </div>
  );
}

CopyButton.propTypes = {
  location: PropTypes.string.isRequired,
};

export default CopyButton;
