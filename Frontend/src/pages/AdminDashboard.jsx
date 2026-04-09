import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalOrders: 0, totalFood: 0, totalRevenue: 0 });

  useEffect(() => {
    // FIXED URL: Removed the "double" link and dots
    fetch("https://react-food-app-1-mkmv.onrender.com/api/order/stats")
      .then(res => res.json())
      .then(data => { 
        if(data.success && data.stats) {
          setStats(data.stats);
        }
      })
      .catch(err => console.error("Error fetching stats:", err));
  }, []);

  return (
    <div className='dashboard-container'>
      <h1>Business Overview</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p>₹{stats.totalRevenue.toLocaleString()}</p>
        </div>
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p>{stats.totalOrders}</p>
        </div>
        <div className="stat-card">
          <h3>Items in Menu</h3>
          <p>{stats.totalFood}</p>
        </div>
      </div>
      <div className="recent-activity">
          <h3>Quick Tips</h3>
          <p>Manage your restaurant menu and track deliveries in real-time.</p>
      </div>
    </div>
  );
};
export default AdminDashboard;