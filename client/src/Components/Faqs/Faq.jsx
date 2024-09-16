import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Use navigate for programmatic routing
import FAQCard from './FaqCard';
import styles from './Faq.module.css';
import PIC from '../../assets/PIC.png';

const Faq = () => {
    const [faqData, setFaqData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();  // Initialize the useNavigate hook

    useEffect(() => {
        const fetchFAQData = async () => {
            try {
                const response = await fetch('https://fruits-ai-appreciate-wealth-backend.onrender.com/faqs');
                if (!response.ok) {
                    throw new Error('Failed to fetch FAQ data');
                }
                const data = await response.json();
                setFaqData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFAQData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://fruits-ai-appreciate-wealth-backend.onrender.com/faqs/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete FAQ');
            }
            setFaqData(faqData.filter(faq => faq.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return <div>Loading FAQs...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <section className={styles.faqSection}>
            <h2>FAQ Section</h2>
            <Link to="/faq/new" className={styles.addButton}>Add FAQ</Link>
            <div className={styles.faqAccordion}>
                {faqData.map((faq) => (
                    <FAQCard
                        key={faq.id}
                        heading={faq.heading}
                        question={faq.question}
                        answer={faq.answer}
                        url={faq.image_url}
                        onEdit={() => navigate(`/faq/${faq.id}`)}  // Use navigate for routing
                        onDelete={() => handleDelete(faq.id)}
                    />
                ))}
            </div>
        </section>
    );
};

export default Faq;
