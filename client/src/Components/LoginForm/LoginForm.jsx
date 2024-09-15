import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LoginForm.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const LoginForm = () => {
  const navigate = useNavigate();

  // State for email, password, visibility, and error
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [error, setError] = useState('');

  // Dummy credentials
  const dummyEmail = 'agamarora456@gmail.com';
  const dummyPassword = 'password123';

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle between true/false
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the input matches dummy credentials
    if (email === dummyEmail && password === dummyPassword) {
      // Redirect to homepage on successful login
      navigate('/Home');
    } else {
      // Show error message
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <p>By signing in you agree to our <a href="#">Terms and Privacy Policy</a></p>
        
        {/* Tabs for Login and Register */}
        <div className="tabs">
          <button className="active-tab">Login</button>
          <button className="active-tab">
            Register
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input 
              type="email" 
              placeholder="Email Address" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} // Update state
            />
          </div>
          <div className="input-container">
            <input 
              type={showPassword ? "text" : "password"} // Conditionally change input type
              placeholder="Password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} // Update state
            />
            <span className="toggle-password" onClick={togglePasswordVisibility}>
              <i className={showPassword ? "fa fa-eye-slash" : "fa fa-eye"}></i> {/* Toggle icon */}
            </span>
          </div>

          {/* Error Message */}
          {error && <p className="error-message">{error}</p>}

          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Remember password
            </label>
            <a href="#">Forgot password?</a>
          </div>

          {/* Submit button */}
          <button type="submit" className="login-button">Login</button>
        </form>

        <p>or connect with</p>

        {/* Social Icons */}
        <div className="social-icons">
          <i className="fab fa-facebook"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-pinterest"></i>
          <i className="fab fa-linkedin"></i>
        </div>

        <div className="fingerprint">
          <i className="fa fa-fingerprint"></i>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
