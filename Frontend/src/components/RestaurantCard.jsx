import React from "react";
import { Link } from "react-router-dom";

export default function RestaurantCard({ item }) {
  
  // FIX 1: Handle images from both local static data and database uploads
  const imageUrl = item.image && item.image.startsWith("http") 
    ? item.image 
    : `https://react-food-app-1-mkmv.onrender.com:https://...onrender.com/api/.../images/${item.image}`;

  return (
    /* FIX 2: MongoDB uses '_id'. We use the OR (||) operator to check both. 
       This removes the 'undefined' from your URL */
    <Link to={`/restaurant/${item._id || item.id}`} className="card">
      
      <img src={imageUrl} alt={item.name} />

      <div className="cardBody">
        <h3>{item.name}</h3>

        <p className="cuisine">{item.category || item.cuisine || "Delicious Food"}</p>

        <div className="cardMeta">
          <span className="rating">⭐ {item.rating || "4.2"}</span>
          <span className="delivery-time">{item.time || "25-30 min"}</span>
        </div>

        <p className="price">₹{item.price || "250"}</p>
      </div>
    </Link>
  );
}