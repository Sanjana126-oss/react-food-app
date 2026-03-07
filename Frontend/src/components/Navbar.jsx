import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./Navbar.css";

const Navbar = ({ setShowLogin, token, setToken }) => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const userRole = localStorage.getItem("role");

  // State to handle the click-to-open dropdown
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken("");
    setShowDropdown(false);
    navigate("/");
  };

  return (
    <nav className="navbar">
      {/* --- LOGO SECTION --- */}
      <div className="navbar-left">
        <Link to="/" className="logo-container">
          <img src="/logo.png" alt="logo" className="logo-img" />
          <span className="app-name">Foodie App</span>
        </Link>
      </div>

      {/* --- NAVIGATION LINKS --- */}
      <div className="navbar-right">
        <Link to="/" className="nav-link">Home</Link>
        
        <Link to="/cart" className="nav-link cart-icon">
          Cart {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
        </Link>
        
        <Link to="/myorders" className="nav-link">
          Orders
        </Link>

        {token && userRole === "admin" && (
          <Link to="/admin/dashboard" className="admin-link-btn">
            Admin Panel
          </Link>
        )}

        {/* --- AUTH SECTION --- */}
        {!token ? (
          <button className="navbar-signin-btn" onClick={() => setShowLogin(true)}>
            Sign In
          </button>
        ) : (
          <div className="navbar-profile">
            {/* Clickable Profile Area */}
            <div 
              className="profile-info"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <img 
                src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png" 
                alt="profile" 
              />
              <p>Hi, {user || "User"}</p>
            </div>

            {/* Dropdown is controlled ONLY by the showDropdown state */}
            {showDropdown && (
              <ul className="profile-dropdown">
                <li onClick={() => { navigate("/myorders"); setShowDropdown(false); }}>
                  <img src="https://cdn-icons-png.flaticon.com/512/3500/3500833.png" alt="" />
                  <p>Orders</p>
                </li>
                <hr />
                <li onClick={handleLogout}>
                  <img src="https://cdn-icons-png.flaticon.com/512/126/126467.png" alt="" />
                  <p>Logout</p>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;