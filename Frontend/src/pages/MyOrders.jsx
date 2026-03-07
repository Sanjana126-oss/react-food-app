import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"; // 1. ADD THIS IMPORT
import './MyOrders.css';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate(); // 2. ADD THIS INITIALIZATION

  const fetchOrders = async () => {
    try {
      console.log("Attempting to fetch orders...");
      const response = await fetch("http://localhost:5000/api/order/list");
      const result = await response.json();
      
      console.log("Data received from server:", result);

      if (result.success) {
        setOrders(result.data.reverse()); // Newest first
      } else {
        console.error("Server returned success:false", result.message);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <h2 style={{textAlign:'center', marginTop:'50px'}}>Loading Orders...</h2>;

  return (
    <div className='my-orders'>
      <h2>Order History</h2>
      <div className="container">
        {orders.length === 0 ? (
          <div style={{textAlign:'center'}}>
             <p>No orders found in database.</p>
             <button onClick={fetchOrders}>Try Refreshing</button>
          </div>
        ) : (
          orders.map((order, index) => (
            <div key={index} className='my-orders-order'>
              <img src="https://cdn-icons-png.flaticon.com/512/709/709511.png" width="40px" alt="" />
              <p>
                {order.items.map((item, i) => (
                  i === order.items.length - 1 
                  ? item.name + " x " + item.quantity 
                  : item.name + " x " + item.quantity + ", "
                ))}
              </p>
              <p>₹{order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p><span>&#x25cf;</span> <b>{order.status}</b></p>
              
              {/* 3. UPDATED BUTTON: This now navigates to the TrackOrder page */}
              <button onClick={() => navigate(`/track-order/${order._id}`)}>
                Track Order
              </button>
              
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;