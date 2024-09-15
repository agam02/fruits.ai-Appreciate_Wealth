import React, { useState } from 'react';
import './Chat.css'; // Change to regular CSS import
import { GoogleGenerativeAI } from '@google/generative-ai';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const genAI = new GoogleGenerativeAI("AIzaSyBN9L9vLTgsuiPMD8Ot18tLLvC7GwaX_dA");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const sendMessage = async () => {
        if (input.trim()) {
            const newMessage = { text: input, sender: 'user' };
            try {
                const result = await model.generateContent(input);
                const response = await result.response;
                setMessages((prev) => [
                    ...prev,
                    { sender: "user", text: input },
                    { sender: "bot", text: response.text() }
                ]);
            } catch (error) {
                console.error('Error sending message', error);
            }

            setInput('');
        }
    };

    return (
        <div className="chat-container">
            <h2 className="chat-header">"How Can I Assist You Today?"</h2>
            <div className="chat-window">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={message.sender === 'user' ? 'user-message' : 'bot-message'}
                    >
                        <p>{message.text}</p>
                    </div>
                ))}
            </div>

            <div className="input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="input-field"
                />
                <button onClick={sendMessage} className="send-button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path d="M2 21l21-9L2 3v7l15 2-15 2z" fill="#fff" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Chat;
