import React from 'react';
import './FAQCard.css';

const FAQCard = ({ heading, question, answer, url, onEdit, onDelete }) => {
    return (
        <section className="card">
            <div className="image">
                <img src={url} alt="FAQ" />
                <h2>{heading}</h2>
            </div>
            <div className="content">
                <h2>{question}</h2>
                <p>{answer}</p>
            </div>
            <div className="actions">
                <button onClick={onEdit} className="editButton">Edit</button>
                <button onClick={onDelete} className="deleteButton">Delete</button>
            </div>
        </section>
    );
};

export default FAQCard;
