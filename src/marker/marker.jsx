import React from 'react';

const Marker = ({ marker, canMove }) => {

  return (
    <div className={canMove ? 'move-option' : ''}>
      {`${marker.color}`}
    </div>
  );
};

export default Marker;
