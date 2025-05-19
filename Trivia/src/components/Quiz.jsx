import React, { useEffect, useState } from 'react';

const Quiz = ({ onSubmit }) => {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        difficulty: '',
    })
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('https://opentdb.com/api_category.php')
            .then((res) => res.json())
            .then((data) => setCategories(data.trivia_categories.slice(0, 4)))
            .catch(() => setCategories([]));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, category, difficulty } = formData;
        if (!name || !category || !difficulty) {
            setError("Opps, you forgot to fill out all the fields");
            return;
        }
        setError('');
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Welcome to the Trivia Quiz!</h1>
            <h3>Enter your name, choose a category and select the difficulty to begin.</h3>

            <label>
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </label>

            <label>
                Category:
                <select name="category" value={formData.category} onChange={handleChange}>
                    <option value="">-- Select a Category --</option>
                    {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>
            </label>

            <label>
                Difficulty:
                <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
                    <option value="">-- Select the Difficulty --</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>

                </select>
            </label>

            <button type="submit">Get Question</button>
            {error && <p style={{ color: 'red'}}>{error}</p>}
        </form>
    );
};

export default Quiz;
