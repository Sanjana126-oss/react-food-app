import React, { useEffect, useState } from 'react';
import RestaurantCard from './RestaurantCard';
import './FoodDisplay.css';

const FoodDisplay = ({ category, search }) => {
  const [foodList, setFoodList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch food from the Backend API
  const fetchFoodList = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://react-food-app-1-mkmv.onrender.com:https://...onrender.com/api/.../api/food/list");
      const result = await response.json();
      
      if (result.success) {
        setFoodList(result.data); 
      }
    } catch (error) {
      console.error("Error fetching food:", error);
    } finally {
      // Small timeout to show the beautiful shimmer effect
      setTimeout(() => setLoading(false), 800);
    }
  };

  useEffect(() => {
    fetchFoodList();
  }, []);

  // --- 1. SHIMMER LOADING STATE ---
  if (loading) {
    return (
      <div className='food-display'>
        <div className='food-display-list'>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div key={n} className="shimmer-card"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='food-display' id='food-display'>
      <div className='food-display-list'>
        {foodList.map((item, index) => {
          
          // --- 2. FILTER LOGIC (Category + Search) ---
          const matchesCategory = category === "All" || item.category === category;
          const matchesSearch = item.name.toLowerCase().includes((search || "").toLowerCase());

          if (matchesCategory && matchesSearch) {
            return (
              /* --- 3. STAGGERED ANIMATION WRAPPER --- */
              <div 
                key={index} 
                className="stagger-item" 
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <RestaurantCard item={item} />
              </div>
            );
          }
          return null;
        })}
      </div>
      
      {/* Show message if no search results found */}
      {foodList.length > 0 && foodList.filter(item => 
        (category === "All" || item.category === category) && 
        item.name.toLowerCase().includes((search || "").toLowerCase())
      ).length === 0 && (
        <div className="no-food-found">
           <p>No dishes found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default FoodDisplay;