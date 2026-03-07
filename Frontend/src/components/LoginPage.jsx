// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const handleSendOTP = (e) => {
    e.preventDefault();
    if (phone.length === 10) {
      alert(`OTP sent to ${countryCode} ${phone}`);
      // Add your OTP logic here
    } else {
      alert('Please enter a valid 10-digit phone number');
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-page">
        <div className="login-container">
          <div className="login-left">
            <h1 className="login-title">Login</h1>
            
            {/* Phone Input with Country Code */}
            <div className="phone-input-container">
              <div className="country-code-selector" onClick={() => setShowCountryDropdown(!showCountryDropdown)}>
                {countryCode} <span className="dropdown-arrow">▼</span>
              </div>
              {showCountryDropdown && (
                <div className="country-dropdown">
                  <div className="country-option" onClick={() => { setCountryCode('+91'); setShowCountryDropdown(false); }}>🇮🇳 +91 (India)</div>
                  <div className="country-option" onClick={() => { setCountryCode('+1'); setShowCountryDropdown(false); }}>🇺🇸 +1 (USA)</div>
                  <div className="country-option" onClick={() => { setCountryCode('+44'); setShowCountryDropdown(false); }}>🇬🇧 +44 (UK)</div>
                  <div className="country-option" onClick={() => { setCountryCode('+61'); setShowCountryDropdown(false); }}>🇦🇺 +61 (Australia)</div>
                </div>
              )}
              <input 
                type="tel" 
                className="phone-input"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                maxLength="10"
              />
            </div>

            {/* Send OTP Button */}
            <button className="send-otp-btn" onClick={handleSendOTP}>
              Send One Time Password
            </button>

            {/* OR Divider */}
            <div className="or-container">
              <span className="or-line"></span>
              <span className="or-text">OR</span>
              <span className="or-line"></span>
            </div>

            {/* Alternative Login Options */}
            <div className="login-options">
              <label className="checkbox-container">
                <input type="checkbox" defaultChecked />
                <span className="checkbox-label">Continue with Email</span>
              </label>

              <button className="google-login-btn">
                <span className="google-icon">G</span>
                Sign in with Google
              </button>
            </div>

            {/* Create Account Link */}
            <div className="create-account">
              New to Foodie? <a href="#" onClick={() => navigate('/signup')}>Create account</a>
            </div>
          </div>

          {/* Right Side - Food Image/Illustration */}
          <div className="login-right">
            <img 
              src="https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png" 
              alt="Food" 
              className="food-illustration"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;