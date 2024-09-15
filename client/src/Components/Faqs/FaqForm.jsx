import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './FaqForm.module.css';

const FaqForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [faq, setFaq] = useState({ heading: '', question: '', answer: '', image_url: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            // Fetch existing FAQ for editing
            const fetchFAQ = async () => {
                try {
                    const response = await fetch(`http://localhost:8000/faqs/${id}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch FAQ');
                    }
                    const data = await response.json();
                    setFaq(data);
                    setIsEditing(true);
                } catch (err) {
                    setError(err.message);
                }
            };

            fetchFAQ();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFaq({ ...faq, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const method = isEditing ? 'PUT' : 'POST';
            const url = isEditing ? `http://localhost:8000/faqs/${id}` : 'http://localhost:8000/faqs';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(faq),
            });

            if (!response.ok) {
                throw new Error(`Failed to ${isEditing ? 'update' : 'create'} FAQ`);
            }

            navigate('/faq');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8000/faqs/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete FAQ');
            }

            navigate('/faq');
        } catch (err) {
            setError(err.message);
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <section className={styles.faqForm}>
            <h2>{isEditing ? 'Edit FAQ' : 'Add FAQ'}</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Heading:
                    <input
                        type="text"
                        name="heading"
                        value={faq.heading}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Question:
                    <input
                        type="text"
                        name="question"
                        value={faq.question}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Answer:
                    <textarea
                        name="answer"
                        value={faq.answer}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Image URL:
                    <input
                        type="text"
                        name="image_url"
                        value={faq.image_url}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">{isEditing ? 'Update' : 'Create'}</button>
                {isEditing && (
                    <button type="button" onClick={handleDelete}>
                        Delete
                    </button>
                )}
            </form>
        </section>
    );
};

export default FaqForm;
