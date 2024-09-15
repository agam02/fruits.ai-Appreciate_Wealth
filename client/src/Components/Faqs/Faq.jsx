import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link for routing
import FAQCard from './FAQCard';
import styles from './Faq.module.css';
import PIC from '../../assets/PIC.png';

const Faq = () => {
    const [faqData, setFaqData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFAQData = async () => {
            try {
                const response = await fetch('http://localhost:8000/faqs');
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
            const response = await fetch(`http://localhost:8000/faqs/${id}`, {
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
                        onEdit={() => window.location.href = `/faq/${faq.id}`}  // Navigate to edit page
                        onDelete={() => handleDelete(faq.id)}
                    />
                ))}
            </div>
        </section>
    );
};

export default Faq;
