import React from 'react';
import './Info.css';

const About = () => {
  return (
    <div className='info-page'>
      <section className="info-header">
        <h1>About Foodie App</h1>
        <p>Delivering Happiness, One Meal at a Time.</p>
      </section>

      <section className="info-content">
        <div className="info-section">
          <h2>Who We Are</h2>
          <p>Launched in 2026, Foodie App started with a simple mission: to bridge the gap between hungry food lovers and the best local restaurants. Today, we are proud to be the fastest-growing food delivery network in India.</p>
        </div>

        <div className="info-grid">
          <div className="info-box">
            <h3>5,000+</h3>
            <p>Restaurant Partners</p>
          </div>
          <div className="info-box">
            <h3>1 Million+</h3>
            <p>Orders Delivered</p>
          </div>
          <div className="info-box">
            <h3>30+ Cities</h3>
            <p>Across the Nation</p>
          </div>
        </div>

        <div className="info-section">
          <h2>Our Values</h2>
          <ul>
            <li><strong>Quality First:</strong> We only partner with restaurants that maintain the highest hygiene standards.</li>
            <li><strong>Lightning Fast:</strong> Our specialized fleet ensures your food reaches you while it's still hot.</li>
            <li><strong>Customer Obsessed:</strong> We are here 24/7 to ensure your experience is nothing short of perfect.</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default About;