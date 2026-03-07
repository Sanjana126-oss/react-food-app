import React from 'react';
import './Info.css';

const Privacy = () => {
  return (
    <div className='info-page'>
      <section className="info-header">
        <h1>Legal & Privacy Policy</h1>
        <p>Last Updated: March 2026</p>
      </section>

      <section className="info-content legal">
        <h3>1. Information We Collect</h3>
        <p>We collect information you provide directly to us, such as when you create an account, place an order, or contact customer support. This includes your name, email, phone number, and delivery address.</p>

        <h3>2. How We Use Your Data</h3>
        <p>Your data is used solely to provide and improve our services, process payments, and ensure timely delivery of your food.</p>

        <h3>3. Payment Security</h3>
        <p>We do not store your credit/debit card information. All transactions are handled securely through industry-standard payment gateways like Stripe/Razorpay.</p>

        <h3>4. Terms of Use</h3>
        <p>By using Foodie App, you agree not to use the platform for any illegal activities. We reserve the right to cancel orders if we suspect fraudulent activity.</p>
      </section>
    </div>
  );
};

export default Privacy;