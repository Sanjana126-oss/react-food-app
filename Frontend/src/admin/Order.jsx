import React, { useEffect, useState } from 'react';

const Orders = () => {
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
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ orderId, status: event.target.value })
    });
    if ((await response.json()).success) {
        await fetchAllOrders();
    }
  }

  useEffect(() => { fetchAllOrders(); }, []);

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className='order-item'>
            <p className='order-item-food'>
                {order.items.map((item, i) => i === order.items.length-1 ? item.name+" x "+item.quantity : item.name+" x "+item.quantity+", ")}
            </p>
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
export default Orders;