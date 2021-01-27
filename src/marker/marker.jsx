import React from 'react';

const Marker = ({ marker, canMove, selected, highlight }) => {

  return (
    <div className={`marker ${highlight} ${marker.color} ${canMove && !selected ? 'move-option' : ''}`}>
    </div>
  );
};

export default Marker;
