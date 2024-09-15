import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Welcome.css';

const WelcomeScreen = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const timer = setTimeout(() => {
      // Use navigate to redirect after 2 seconds
      navigate('/Chat');
    }, 2000);

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, [navigate]);

  return (
    <div className="welcome-screen">
      <div className="icon-container">
        <i className="chat-icon">💬</i> {/* You can replace this with an actual image or icon */}
      </div>
      <div className="text-container">
        <h1>Hello</h1>
        <h2><span className="highlight">Chat.</span></h2>
        <p>The last chat app you'll ever need.</p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
