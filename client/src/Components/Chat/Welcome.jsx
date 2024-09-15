import React, { useEffect } from 'react';
import './Welcome.css';

const WelcomeScreen = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Redirect to the specified URL after 2 seconds
      window.location.href = 'http://localhost:5173/Chat';
    }, 2000);

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, []);

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
