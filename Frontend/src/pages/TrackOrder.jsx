import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './TrackOrder.css';

const TrackOrder = () => {
    const { orderId } = useParams(); // Gets ID from URL
    const [order, setOrder] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/order/list`);
                const result = await response.json();
                if (result.success) {
                    // Find this specific order in the list
                    const foundOrder = result.data.find(o => o._id === orderId);
                    setOrder(foundOrder);
                }
            } catch (error) {
                console.error("Tracking Error:", error);
            }
        };
        fetchOrderDetails();
    }, [orderId]);

    if (!order) return <div style={{padding:"100px", textAlign:"center"}}><h2>Loading Tracking Information...</h2></div>;

    // Define the sequence of delivery steps
    const steps = ["Order Placed", "Food Processing", "Out for delivery", "Delivered"];
    const currentStepIndex = steps.indexOf(order.status);

    return (
        <div className='track-order-container'>
            <div className="track-header">
                <button onClick={() => navigate(-1)} className="back-btn">← Back to Orders</button>
                <h1>Track Order #{order._id.slice(-6)}</h1>
            </div>

            <div className="tracking-content">
                {/* VERTICAL PROGRESS BAR */}
                <div className="status-timeline">
                    {steps.map((step, index) => (
                        <div key={index} className={`status-item ${index <= currentStepIndex ? 'active' : ''}`}>
                            <div className="status-dot"></div>
                            <div className="status-text">
                                <h3>{step}</h3>
                                <p>{index <= currentStepIndex ? "Completed" : "Pending"}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ORDER DETAILS BOX */}
                <div className="order-details-box">
                    <h3>Summary</h3>
                    <div className="item-list">
                        {order.items.map((item, i) => (
                            <p key={i}>{item.name} x {item.quantity} <span>₹{item.price * item.quantity}</span></p>
                        ))}
                    </div>
                    <hr />
                    <div className="total-row">
                        <strong>Total Paid</strong>
                        <strong>₹{order.amount}</strong>
                    </div>
                    <div className="address-info">
                        <p><strong>Delivery Address:</strong></p>
                        <p>{order.address.street}, {order.address.city}</p>
                        <p>Phone: {order.address.phone}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrackOrder;