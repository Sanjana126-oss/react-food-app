import React, { useEffect, useState } from 'react';
import './AdminOrders.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await fetch("https://react-food-app-1-mkmv.onrender.com:https://...onrender.com/api/.../api/order/list");
    const result = await response.json();
    if (result.success) {
      setOrders(result.data);
    }
  }

  const statusHandler = async (event, orderId) => {
    const response = await fetch("https://react-food-app-1-mkmv.onrender.com:https://...onrender.com/api/.../api/order/status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, status: event.target.value })
    });
    const result = await response.json();
    if (result.success) {
      await fetchAllOrders(); // Refresh UI
    }
  }

  useEffect(() => { fetchAllOrders(); }, []);

  return (
    <div className='order-page'>
      <h3>Admin Order Management</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className='order-item'>
            <img src="https://cdn-icons-png.flaticon.com/512/709/709511.png" alt="" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item, i) => i === order.items.length - 1 ? item.name + " x " + item.quantity : item.name + " x " + item.quantity + ", ")}
              </p>
              <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}</p>
              <div className='order-item-address'>
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>₹{order.amount}</p>
            <select onChange={(e) => statusHandler(e, order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminOrders;