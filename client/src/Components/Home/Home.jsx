import React from 'react';
import './Home.css'; // Ensure you reference this CSS file correctly
import translator from '../../assets/g_translate.png'
import {Link } from "react-router-dom";


const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Fruit.AI</h1>
      <p className="home-subtitle">"Be Healthy!"</p>
      <div className="button-grid">
        <div className="button chat"><Link className='link' to ="/Welcome">Chat.</Link></div>
        <div className="button tips"></div>
        <div className="button settings"></div>
        <div className="button translate"> 
        <Link className='link' to ="/Translator"><img src={translator} alt="Translate Icon" /></Link>
        </div>
        <div className="button faqs"><Link className='link' to ="/Faq">Faqs</Link></div>
        <div className="button about"><Link className='link' to ="/About">About</Link></div>
      </div>
      <div className="dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Home;
