import React from 'react';
import PropTypes from 'prop-types';

function Loading({ bgColor }) {
  return (
    <div
      className={ `w-screen h-screen flex justify-center items-center bg-gradient-to-r ${bgColor}` }
    >
      <h1 className="relative -top-40 animate-pulse subpixel-antialiased text-shadow text-center rounded-lg mx-auto font-pacifico text-white z-50 w-auto text-6xl sm:text-8xl">
        TrybeLicious!
      </h1>
    </div>
  );
}

Loading.defaultProps = {
  bgColor: '',
};

Loading.propTypes = {
  bgColor: PropTypes.string,
};

export default Loading;
