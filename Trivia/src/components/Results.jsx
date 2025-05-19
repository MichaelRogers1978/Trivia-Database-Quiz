import React from 'react';

const Results = ({ name, isCorrect, correctAnswer, onRestart}) => {
   return (
    <div>
        <h1>Results</h1>
        <h2>{name}, you {isCorrect ? 'got it right!' : 'got it wrong!'}</h2>
        {!isCorrect && <p>The correct answer was: {correctAnswer}</p>}
        <button onClick={onRestart}>Play More</button>
        <h3>Thank you for playing!</h3>
        <p>We hope you enjoyed the quiz!</p>
    </div>
   );
};

export default Results;