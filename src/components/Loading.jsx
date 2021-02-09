import React from 'react';

function Loading() {
  return (
    <div className="relative w-screen h-screen flex justify-center items-center -top-40">
      <h1 className="animate-pulse subpixel-antialiased text-shadow text-center rounded-lg mx-auto font-pacifico text-white z-50 w-auto text-6xl">
        TrybeLicious!
      </h1>
    </div>
  );
}

export default Loading;
