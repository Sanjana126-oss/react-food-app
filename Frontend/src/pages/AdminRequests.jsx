import React, { useEffect, useState } from 'react';
import './AdminRequests.css';

const AdminRequests = () => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const response = await fetch("https://react-food-app-1-mkmv.onrender.com:https://...onrender.com/api/.../api/contact/list");
      const result = await response.json();
      
      console.log("Admin received:", result); // LOOK AT THIS IN THE BROWSER CONSOLE

      if (result.success) {
        setMessages(result.data);
      } else {
        console.error("Server says success is false");
      }
    } catch (error) {
      console.error("Connection failed:", error);
    }
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className='requests-page'>
      <h3>Customer Help Requests</h3>
      <div className="requests-list">
        {/* Check if messages has data before mapping */}
        {messages && messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className='request-card'>
              <div className="request-header">
                <strong>{msg.name}</strong>
                <span>{new Date(msg.date).toLocaleDateString()}</span>
              </div>
              <p className="request-email">📧 {msg.email}</p>
              <div className="request-body">
                <p>{msg.message}</p>
              </div>
            </div>
          ))
        ) : (
          <div style={{padding: "20px", textAlign: "center", color: "#888"}}>
            <p>No messages found in the database.</p>
            <button onClick={fetchMessages} style={{marginTop: "10px", padding: "5px 15px", cursor: "pointer"}}>Refresh List</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminRequests;