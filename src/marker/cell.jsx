import React from 'react';
import Marker from './marker.jsx';

const Cell = ({ cell, canMove }) => {
  return (
    <div>
      {cell ? <Marker marker={cell} canMove={canMove} /> : "Empty"}
    </div>
  );
};

export default Cell;
