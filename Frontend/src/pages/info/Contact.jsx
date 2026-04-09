import React, { useState } from 'react';
import './Info.css';

const Contact = () => {
    // 1. Form State Logic
    const [data, setData] = useState({ name: "", email: "", message: "" });

    const onChangeHandler = (event) => {
        setData(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSend = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://react-food-app-1-mkmv.onrender.com:https://...onrender.com/api/.../api/contact/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (result.success) {
                alert("🎉 Success: Your message has been received!");
                setData({ name: "", email: "", message: "" });
            }
        } catch (error) {
            alert("❌ Server error. Is the backend running?");
        }
    };

    return (
        <div className='info-page contact-page'>
            {/* Header Section */}
            <section className="info-header">
                <h1>Contact Our Team</h1>
                <p>We're on a mission to deliver happiness. How can we help you today?</p>
            </section>

            <div className="contact-main-grid">
                
                {/* LEFT SIDE: Informational Content */}
                <div className="contact-info-section">
                    <div className="contact-dept-grid">
                        <div className="dept-card">
                            <img src="https://cdn-icons-png.flaticon.com/512/9448/9448181.png" alt="" />
                            <h3>Customer Support</h3>
                            <p>For help with orders, refunds, or technical issues.</p>
                            <strong>support@foodieapp.com</strong>
                        </div>
                        <div className="dept-card">
                            <img src="https://cdn-icons-png.flaticon.com/512/3144/3144456.png" alt="" />
                            <h3>Partner With Us</h3>
                            <p>Become a restaurant partner or a delivery hero.</p>
                            <strong>partners@foodieapp.com</strong>
                        </div>
                        <div className="dept-card">
                            <img src="https://cdn-icons-png.flaticon.com/512/1995/1995531.png" alt="" />
                            <h3>Media & PR</h3>
                            <p>For press inquiries, brand collaborations, and interviews.</p>
                            <strong>press@foodieapp.com</strong>
                        </div>
                        <div className="dept-card">
                            <img src="https://cdn-icons-png.flaticon.com/512/3850/3850285.png" alt="" />
                            <h3>Careers</h3>
                            <p>Join our team and build the future of food delivery.</p>
                            <strong>hr@foodieapp.com</strong>
                        </div>
                    </div>

                    <div className="office-locations">
                        <h2>Our Global Offices</h2>
                        <div className="location-item">
                            <h4>📍 Hitech City</h4>
                            <p>Hyderabad , Teleangana 580001</p>
                        </div>
                        </div>
                        
                    <div className="social-connect">
    <h2>Connect With Us</h2>
    <div className="social-row">
        {/* Facebook */}
        <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <img className="social-icon" src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" />
        </a>
        {/* Instagram */}
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <img className="social-icon" src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" />
        </a>
        {/* Twitter/X */}
        <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <img className="social-icon" src="https://cdn-icons-png.flaticon.com/512/3256/3256605.png" alt="Twitter" />
        </a>
        {/* LinkedIn */}
        <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <img className="social-icon" src="https://cdn-icons-png.flaticon.com/512/145/145807.png" alt="LinkedIn" />
        </a>
    </div>
</div>
                </div>

                {/* RIGHT SIDE: The Functional Form */}
                <div className="contact-form-wrapper">
                    <form className="contact-form" onSubmit={handleSend}>
                        <h2>Send a Message</h2>
                        <p>Our typical response time is under 2 hours.</p>
                        
                        <div className="input-group">
                            <label>Full Name</label>
                            <input name='name' value={data.name} onChange={onChangeHandler} type="text" placeholder="Enter your name" required />
                        </div>
                        
                        <div className="input-group">
                            <label>Email Address</label>
                            <input name='email' value={data.email} onChange={onChangeHandler} type="email" placeholder="Enter your email" required />
                        </div>
                        
                        <div className="input-group">
                            <label>Subject</label>
                            <select required>
                                <option value="">Select a reason</option>
                                <option value="support">Order Support</option>
                                <option value="partnership">Partnership</option>
                                <option value="feedback">General Feedback</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <label>Message</label>
                            <textarea name='message' value={data.message} onChange={onChangeHandler} rows="6" placeholder="Describe your request in detail..." required></textarea>
                        </div>
                        
                        <button type="submit" className="submit-request-btn">Submit Request</button>
                    </form>

                    <div className="working-hours">
                        <p><strong>🕒 Support Hours:</strong> 24/7 Available</p>
                        <p><strong>🕒 Office Hours:</strong> Mon - Sat (9:00 AM - 6:00 PM)</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Contact;