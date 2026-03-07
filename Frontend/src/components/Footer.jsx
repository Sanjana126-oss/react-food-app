import React, { useState } from 'react' // Import useState
import './Footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
    const [email, setEmail] = useState(""); // State to store email

    const subscribeHandler = async (e) => {
        e.preventDefault();
        if (!email) return alert("Please enter an email");

        try {
            const response = await fetch("http://localhost:5000/api/newsletter/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });
            const result = await response.json();

            if (result.success) {
                alert("🎉 " + result.message);
                setEmail(""); // Clear input box
            } else {
                alert("info: " + result.message);
            }
        } catch (error) {
            alert("Server not responding");
        }
    }

    return (
        <footer className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-column">
                    <h2 className='footer-logo'>Foodie App</h2>
                    <p>The best restaurants in your pocket. Delivering happiness to your doorstep since 2026.</p>
                </div>

                <div className="footer-column">
                    <h3>COMPANY</h3>
                    <ul>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Partner with us</Link></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h3>FOR YOU</h3>
                    <ul>
                        <li><Link to="/privacy">Privacy Policy</Link></li>
                        <li><Link to="/contact">Help Center</Link></li>
                    </ul>
                </div>

                <div className="footer-column wide">
                    <h3>STAY UPDATED</h3>
                    <form className="newsletter" onSubmit={subscribeHandler}>
                        <input 
                            type="email" 
                            placeholder="Your email address" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                        <button type="submit">Subscribe</button>
                    </form>
                   
                  <h3 style={{marginTop:"20px"}}>INSTALL OUR APP</h3>
            <div className="app-download-buttons">
               
                <a href="https://apps.apple.com" target="_blank" rel="noreferrer">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" />
                </a>
                <a href="https://play.google.com" target="_blank" rel="noreferrer">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" />
                </a>
            </div>

                </div>
            </div>
            <hr className="footer-divider" />
            <div className="footer-bottom">
                <p>© 2026 Foodie App. Designed for Food Lovers. ❤️</p>
            </div>
        </footer>
    )
}

export default Footer;