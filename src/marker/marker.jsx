import React from 'react';

const Marker = ({ marker, board }) => {
  return (
    <div>
      {`${marker.color} - ${marker.pos} -  ${JSON.stringify(marker.canMove(board))}`}
    </div>
  )
};

export default Marker;
