import React from 'react';

const GameDetails = ({ score }) => {
  return (
    <div className="game-details">
      <p>Red: {score.red}</p>
      <p>Black: {score.black}</p>
    </div>
  );
};

export default GameDetails;
