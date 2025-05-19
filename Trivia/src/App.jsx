import React, { useState } from 'react'
import Quiz from './components/Quiz';
import Questions from './components/Questions';
import Results from './components/Results';



const App2 = () => {
    const [formData, setFormData] = useState(null);
    const [questionsData, setQuestionsData] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [fetchError, setFetchError] = useState(false);

    const handleQuizSubmit = (data) => {
        setFormData(data);
        setFetchError(false);

        fetch(`https://opentdb.com/api.php?amount=10&category=${data.category}&difficulty=${data.difficulty}&type=multiple`)
            .then((res) => res.json())
            .then((json) => {
                const q = json.results[0];
                const answers = [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5);
                setQuestionsData({ ...q, answers });
            })
            .catch(() => setFetchError(true));
    };

    const handleAnswerSubmit = (selectedAnswer) => {
        const correct = selectedAnswer === questionsData.correct_answer;
        setIsCorrect(correct);
    };

    const handleRestart = () => {
        setFormData(null);
        setQuestionsData(null);
        setIsCorrect(null);
        setFetchError(false);
    };

    if (!formData) {
        return <Quiz onSubmit={handleQuizSubmit} />;
    }

    if (isCorrect === null) {
        return (
            <Questions
                question={questionsData}
                onSubmit={handleAnswerSubmit}
                fetchError={fetchError}
            />
        );
    }

    return (
        <Results
            name={formData.name}
            isCorrect={isCorrect}
            correctAnswer={questionsData.correct_answer}
            onRestart={handleRestart}
        />
    );
}

export default App2;