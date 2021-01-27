import React from 'react';
import Marker from './marker.jsx';

const Cell = ({ cell, canMove, selected, pos }) => {
  const possibleMove = selected && (`${selected.pos}` === pos || selected.moves.includes(pos));
  const highlightClass = possibleMove ? 'highlight' : '';

  return (
    <div className={`cell`} data-pos={pos}>
      {cell ? (
        <Marker marker={cell} canMove={canMove} selected={selected} highlight={highlightClass}/>)
        : ( <div className={`marker ${highlightClass}`}></div> )}
    </div>
  );
};

export default Cell;
