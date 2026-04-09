import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import "./App.css";

// --- COMPONENTS ---
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartBar from "./components/CartBar";
import LoginPopup from "./components/LoginPopup";
import ScrollToTop from "./components/ScrollToTop";

// --- USER PAGES ---
import Home from "./pages/Home";
import Restaurant from "./pages/Restaurant";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import MyOrders from "./pages/MyOrders";
import Success from "./pages/success"; 
import TrackOrder from "./pages/TrackOrder";   
import About from "./pages/info/About";
import Contact from "./pages/info/Contact";
import Privacy from "./pages/info/Privacy";

// --- ADMIN PAGES ---
import AdminSidebar from "./components/AdminSideBar";
import AdminDashboard from "./pages/AdminDashboard";
import AddFood from "./pages/AddFood"; // FIXED: Changed 'Addfood' to 'AddFood'
import ListFood from "./pages/ListFood";
import AdminOrders from "./pages/Adminorders"; 
import AdminRequests from "./pages/AdminRequests";

// ==========================================
// 1. USER LAYOUT
// ==========================================
const UserLayout = ({ setShowLogin, token, setToken }) => {
  return (
    <div className="app">
      <Navbar setShowLogin={setShowLogin} token={token} setToken={setToken} />
      <hr />
      <div className="user-container">
        <Outlet />
      </div>
      <CartBar />
      <Footer />
    </div>
  );
};

// ==========================================
// 2. ADMIN LAYOUT
// ==========================================
const AdminLayout = () => {
  const role = localStorage.getItem("role");
  if (role !== "admin") {
    return <Navigate to="/" />;
  }
  return (
    <div className="admin-root">
      <AdminSidebar />
      <div className="admin-main-area">
        <div className="admin-top-header">
          <h2>Management Console</h2>
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <span style={{ fontSize: "14px", fontWeight: "600", color: "#333" }}>
              Welcome, Admin
            </span>
            <button 
              className="admin-logout-btn" 
              onClick={() => { localStorage.clear(); window.location.href = "/"; }}
            >
              Logout
            </button>
          </div>
        </div>
        <div className="admin-page-padding">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. MAIN APP COMPONENT
// ==========================================
function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} setToken={setToken} /> : null}
      <Routes>
        <Route element={<UserLayout setShowLogin={setShowLogin} token={token} setToken={setToken} />}>
          <Route path="/" element={<Home />} />
          <Route path="/restaurant/:id" element={<Restaurant />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/track-order/:orderId" element={<TrackOrder />} /> 
          <Route path="/success" element={<Success />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} /> 
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="add" element={<AddFood />} />
          <Route path="list" element={<ListFood />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="requests" element={<AdminRequests />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;