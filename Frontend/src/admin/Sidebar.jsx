import React from 'react';
import { NavLink } from 'react-router-dom';
import './Admin.css';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/admin/add' className="sidebar-option">
           <p>Add Items</p>
        </NavLink>
        <NavLink to='/admin/list' className="sidebar-option">
           <p>List Items</p>
        </NavLink>
        <NavLink to='/admin/orders' className="sidebar-option">
           <p>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}
export default Sidebar;