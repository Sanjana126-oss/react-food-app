import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        // Instead of navigating to /login, we just show an alert 
        // and you can trigger the popup from the Navbar
        alert("Please Login to access this page");
        return <Navigate to="/" />; 
    }

    return children;
};

export default ProtectedRoute;