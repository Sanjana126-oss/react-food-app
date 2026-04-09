import React, { useEffect, useState } from 'react';
import './Orders.css'; // Make sure this CSS file exists

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to get orders from the Backend API
  const fetchOrders = async () => {
    try {
      const response = await fetch("https://react-food-app-1-mkmv.onrender.com:5000/api/order/list");
      const result = await response.json();
      
      if (result.success) {
        // We reverse the data so the newest orders appear at the top
        setOrders(result.data.reverse());
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <div className="loading">Loading your orders...</div>;

  return (
    <div className='my-orders'>
      <h2>Order History</h2>
      <div className="container">
        {orders.length === 0 ? (
          <p className="no-orders">You haven't placed any orders yet.</p>
        ) : (
          orders.map((order, index) => (
            <div key={index} className='my-orders-order'>
              {/* Parcel Icon */}
              <img src="https://cdn-icons-png.flaticon.com/512/709/709511.png" alt="" className="order-icon" />
              
              {/* Item Names */}
              <p className="order-items">
                {order.items.map((item, i) => (
                  i === order.items.length - 1 
                  ? item.name + " x " + item.quantity 
                  : item.name + " x " + item.quantity + ", "
                ))}
              </p>

              {/* Total Amount */}
              <p className="order-amount">₹{order.amount}.00</p>

              {/* Date & Time (IST Format) */}
              <p className="order-date">
                {new Date(order.date).toLocaleString('en-IN', {
                  day: '2-digit', month: 'short', year: 'numeric',
                  hour: '2-digit', minute: '2-digit', hour12: true
                })}
              </p>

              {/* Status with Green Dot */}
              <p className="order-status">
                <span>&#x25cf;</span> <b>{order.status}</b>
              </p>

              {/* Action Button */}
              <button onClick={fetchOrders} className="track-btn">Track Order</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Orders;