import React from 'react';
import { NavLink } from 'react-router-dom';
import './AdminSidebar.css'; // Matches your lowercase 'b' filename

const AdminSideBar = () => {
  return (
    <div className='admin-sidebar'>
      <div className="sidebar-title">
        <p>ADMIN PANEL</p>
      </div>
      <div className="sidebar-options">
        <NavLink to='/admin/dashboard' className="sidebar-option">
           <img src="https://cdn-icons-png.flaticon.com/512/1828/1828762.png" alt="dash"/>
           <p>Dashboard</p>
        </NavLink>

        <NavLink to='/admin/add' className="sidebar-option">
           <img src="https://cdn-icons-png.flaticon.com/512/992/992651.png" alt="add"/>
           <p>Add Food Items</p>
        </NavLink>

        <NavLink to='/admin/list' className="sidebar-option">
           <img src="https://cdn-icons-png.flaticon.com/512/2645/2645890.png" alt="list"/>
           <p>Menu List</p>
        </NavLink>

        <NavLink to='/admin/orders' className="sidebar-option">
           <img src="https://cdn-icons-png.flaticon.com/512/3500/3500833.png" alt="orders"/>
           <p>Orders Management</p>
        </NavLink>

        <NavLink to='/admin/requests' className="sidebar-option">
           <img src="https://cdn-icons-png.flaticon.com/512/1067/1067562.png" alt="help"/>
           <p>Help Requests</p>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSideBar;