import React from 'react';

const Marker = ({ marker, canMove, selected, highlight }) => {

  return (
    <div className={`marker ${highlight} ${marker.color} ${canMove && !selected ? 'move-option' : ''} ${marker.king ? "king" : ''}`}>
    </div>
  );
};

export default Marker;
