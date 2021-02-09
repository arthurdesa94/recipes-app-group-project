import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function CopyButton({ location, testId }) {
  const [copyLink, setCopyLink] = useState(false);

  const onClickCopy = () => {
    copy(`http://localhost:3000${location}`);
    setCopyLink(true);
  };

  return (
    <div className="flex m-2 flex-col">
      <button
        className="focus:outline-none"
        onMouseLeave={ () => setCopyLink(false) }
        onClick={ onClickCopy }
        type="button"
      >
        <FontAwesomeIcon size="2x" className="transform hover:scale-105" icon={ faShareAlt } />
      </button>
      {copyLink && <p>Link copiado!</p>}
    </div>
  );
}

CopyButton.propTypes = {
  location: PropTypes.string,
  testId: PropTypes.string,
};

CopyButton.defaultProps = {
  location: '',
  testId: 'share-btn',
};

export default CopyButton;
