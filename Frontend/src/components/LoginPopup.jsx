import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPopup.css';

const LoginPopup = ({ setShowLogin, setToken }) => {
    
    const navigate = useNavigate();
    const [currState, setCurrState] = useState("Login");
    
    // State for input fields
    const [data, setData] = useState({ 
        name: "", 
        email: "", 
        password: "" 
    });

    // Handle input changes
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const onLogin = async (event) => {
        event.preventDefault();
        
        // FIXED: Removed :5000 from the URL. Deployed apps use standard HTTPS.
        let newUrl = "https://react-food-app-1-mkmv.onrender.com/api/auth";
        
        if (currState === "Login") {
            newUrl += "/login";
        } else {
            newUrl += "/register";
        }

        try {
            const response = await fetch(newUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.success) {
                // 1. Update App level state so Navbar changes instantly
                setToken(result.token); 

                // 2. Save all info to LocalStorage
                localStorage.setItem("token", result.token);
                localStorage.setItem("user", result.name);
                localStorage.setItem("role", result.role); 

                // 3. Close the popup
                setShowLogin(false); 

                // 4. Role-based Redirection
                if (result.role === "admin") {
                    navigate("/admin"); 
                } else {
                    navigate("/"); 
                }
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Server is not responding. Please check if the Backend is awake at: https://react-food-app-1-mkmv.onrender.com");
        }
    };

    return (
        <div className='login-popup' onClick={() => setShowLogin(false)}>
            <form onSubmit={onLogin} className="login-popup-container" onClick={(e) => e.stopPropagation()}>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <span onClick={() => setShowLogin(false)} className="close-icon">×</span>
                </div>
                
                <div className="login-popup-inputs">
                    {currState === "Sign Up" && (
                        <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' required />
                    )}
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your Email' required />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
                </div>

                <button type='submit'>
                    {currState === "Sign Up" ? "Create account" : "Login"}
                </button>
                
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>

                {currState === "Login" ? (
                    <p>New to Foodie App? <span onClick={() => setCurrState("Sign Up")}>Create account</span></p>
                ) : (
                    <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
                )}
            </form>
        </div>
    );
};

export default LoginPopup;