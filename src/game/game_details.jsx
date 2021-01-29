import React from 'react';

const GameDetails = ({ score }) => {
  return (
    <>
      <p>Score</p>
      <div className="game-details">
        <div className="marker Red">
          <span>{score.red}</span>
        </div>
        <div className="marker Black">
          <span>{score.black}</span>
        </div>
      </div>
    </>
  );
};

export default GameDetails;
