import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { restaurants } from "../data/restaurants"; // Local static data
import { CartContext } from "../context/CartContext";
import "./Restaurant.css";

const Restaurant = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        // 1. Try to find the item in your MongoDB Database (For items like Biryani)
        const response = await fetch("http://localhost:5000/api/food/list");
        const result = await response.json();

        if (result.success) {
          // MongoDB uses _id. We check if the URL ID matches a database _id
          const dbItem = result.data.find((f) => f._id === id);
          if (dbItem) {
            setItem(dbItem);
            setLoading(false);
            return;
          }
        }

        // 2. THE FIX: Look in your local restaurants.js (For Pizza Hut, KFC, etc.)
        // We use String() on both sides to make sure "1" matches 1
        const staticItem = restaurants.find((r) => String(r.id) === String(id));
        
        if (staticItem) {
          setItem(staticItem);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
        
        // Fallback if backend is down but static data exists
        const staticItem = restaurants.find((r) => String(r.id) === String(id));
        if (staticItem) setItem(staticItem);
        
        setLoading(false);
      }
    };

    fetchRestaurantData();
  }, [id]);

  if (loading) return <div className="loader-container"><h2>Loading Menu...</h2></div>;

  if (!item) return (
    <div className="not-found" style={{padding: "100px", textAlign: "center"}}>
      <h1>Restaurant Not Found</h1>
      <Link to="/" style={{color: "orange"}}>Back to Home</Link>
    </div>
  );

  // IMAGE LOGIC: Handles /images/pizza.jpg AND backend uploads
  const imageUrl = item.image && (item.image.startsWith("http") || item.image.startsWith("/")) 
    ? item.image 
    : `http://localhost:5000/images/${item.image}`;

  return (
    <div className="restaurant-page">
      <Link to="/" className="back-btn">← Back</Link>

      <div className="res-header">
        <img src={imageUrl} alt={item.name} className="res-image" />
        <div className="res-info-box">
          <h1>{item.name}</h1>
          <p className="res-cuisine">{item.category || item.cuisine}</p>
          
          <div className="res-meta">
            <span className="res-rating">⭐ {item.rating || "4.2"}</span>
            <span className="res-divider">|</span>
            <span>{item.time || "25-35 min"}</span>
            <span className="res-divider">|</span>
            <span className="res-price">{item.price_for_two || item.price || "₹300 for two"}</span>
          </div>
        </div>
      </div>

      <div className="menu-container">
        <h2 className="menu-title">Menu</h2>
        <div className="menu-list">
            {item.menu ? (
            item.menu.map((food) => (
                <div key={food.id} className="menu-item">
                    <div className="menu-text">
                        <h4>{food.name}</h4>
                        <p className="price-tag">₹{food.price}</p>
                    </div>
                    <button className="add-btn" onClick={() => addToCart(food)}>Add</button>
                </div>
            ))
            ) : (
            <div className="menu-item">
                <div className="menu-text">
                    <h4>{item.name}</h4>
                    <p className="price-tag">₹{item.price}</p>
                    <p className="res-desc">{item.description}</p>
                </div>
                <button className="add-btn" onClick={() => addToCart(item)}>Add to Cart</button>
            </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Restaurant;