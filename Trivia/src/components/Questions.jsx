import React, { useState } from 'react';

const Questions = ({ question, onSubmit, fetchError }) => {

    const [selected, setSelected] = useState('');
    const [error, setError] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!selected) {
            setError("Please select your answer!");
            return;
        }
        setError('');
        onSubmit(selected);
    };

    if (fetchError) {
        return <p style={{ color: 'red' }}>Loading issue. Please try again at another time.</p>;
    }
    return (
        <form onSubmit={handleFormSubmit}>
            <h2 dangerouslySetInnerHTML={{ __html: question.question}}></h2>
            {question.answers.map((answer, index) => (
                <label key={index} style={{ display: 'block', marginBottom: '8px'}}>
                    <input
                        type="radio"
                        name="answer"
                        value={answer}
                        checked={selected === answer}
                        onChange={() => setSelected(answer)}
                    />
                    <span dangerouslySetInnerHTML={{ __html: answer}} />
                </label>
            ))}

            {error && <p style={{ color: 'red'}}>{error}</p>}

            <button type='submit'>Submit Answer</button>
        </form>
    );
};

export default Questions;