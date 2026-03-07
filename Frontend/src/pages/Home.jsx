import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { restaurants } from "../data/restaurants";
import FoodDisplay from "../components/FoodDisplay"; 
import "./Home.css";

const Home = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  
  // --- REFERENCES ---
  const heroRef = useRef(null);
  const resultsRef = useRef(null); 

  // --- FEATURE 1: MOUSE PARALLAX LOGIC ---
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 35;
    const y = (window.innerHeight / 2 - e.pageY) / 35;
    setOffset({ x, y });
  };

  // --- FEATURE 2: AUTO-TYPING PLACEHOLDER ---
  const [placeholder, setPlaceholder] = useState("");
  const phrases = ["Pizza...", "Burgers...", "Healthy Salads...", "Desserts...", "Biryani..."];
  
  useEffect(() => {
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 150;

    const type = () => {
      const currentPhrase = phrases[phraseIdx];
      
      if (isDeleting) {
        setPlaceholder(currentPhrase.substring(0, charIdx - 1));
        charIdx--;
        typingSpeed = 100;
      } else {
        setPlaceholder(currentPhrase.substring(0, charIdx + 1));
        charIdx++;
        typingSpeed = 150;
      }

      if (!isDeleting && charIdx === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000; 
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        typingSpeed = 500;
      }

      setTimeout(type, typingSpeed);
    };

    const timer = setTimeout(type, 1000);
    return () => clearTimeout(timer);
  }, []);

  // --- FEATURE 3: UPDATED SEARCH LOGIC (SCROLL ONLY ON CLICK/ENTER) ---
  
  // This updates the text for filtering BUT does not scroll
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // This function performs the scroll only when the user is "Ready"
  const performSearchScroll = () => {
    if (search.trim().length > 0) {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCategoryClick = (clickedCategory) => {
    setCategory(prev => prev === clickedCategory ? "All" : clickedCategory);
    // Categories still scroll immediately as they are direct filters
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // --- DATA FILTERING ---
  const offers = [
    { id: 1, title: "50% OFF", desc: "Up to ₹100 | Code: WELCOME", category: "Pizza", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=500&auto=format&fit=crop" },
    { id: 2, title: "Buy 1 Get 1", desc: "On King Burgers", category: "Burger", image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=500&auto=format&fit=crop" },
    { id: 3, title: "Flat ₹100 OFF", desc: "Italian Pastas", category: "Pasta", image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=500&auto=format&fit=crop" },
    { id: 4, title: "Free Delivery", desc: "On Healthy Salads", category: "Pure Veg", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=500&auto=format&fit=crop" },
    { id: 5, title: "60% OFF", desc: "Weekend Desserts", category: "Cake", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=500&auto=format&fit=crop" }
  ];

  const filteredRestaurants = restaurants.filter((r) => {
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || (r.cuisine && r.cuisine.toLowerCase().includes(category.toLowerCase()));
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="home page-fade-in">
      
      {/* HERO SECTION WITH PARALLAX */}
      <section className="hero" onMouseMove={handleMouseMove} ref={heroRef}>
        <div className="bg-shape shape-1" style={{ transform: `translate(${offset.x * 0.4}px, ${offset.y * 0.4}px)` }}></div>
        <div className="bg-shape shape-2" style={{ transform: `translate(${offset.x * -0.4}px, ${offset.y * -0.4}px)` }}></div>
        
        <div className="floating-icon icon-1" style={{ transform: `translate(${offset.x * 1.2}px, ${offset.y * 1.2}px) rotate(${offset.x}deg)` }}>🍕</div>
        <div className="floating-icon icon-2" style={{ transform: `translate(${offset.x * -1.5}px, ${offset.y * -1.5}px) rotate(${offset.y}deg)` }}>🍔</div>
        <div className="floating-icon icon-3" style={{ transform: `translate(${offset.x * 0.8}px, ${offset.y * -0.8}px)` }}>🥗</div>

        <div className="hero-content">
          <h1 className="hero-title">
            Hungry? <span>We deliver</span>
          </h1>
          <p className="hero-subtitle">The quickest way to find the best food in your neighborhood.</p>

          <div className="search-wrapper">
            <div className="search-glass">
                <input
                    className="search"
                    type="text"
                    placeholder={`Search for ${placeholder}`}
                    value={search}
                    onChange={handleSearchChange} // Only updates text state
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') performSearchScroll(); // Allow Enter key to trigger scroll
                    }}
                />
                <button className="hero-search-btn" onClick={performSearchScroll}>
                    Search
                </button>
            </div>
          </div>
        </div>
      </section>

      {/* OFFERS SECTION */}
      <section className="offers">
        <div className="offers-header">
            <h2>🔥 Best Offers for you</h2>
        </div>
        <div className="offers-scroll">
          {offers.map((item) => (
            <div 
              key={item.id} 
              className={`offer-card ${category === item.category ? "active" : ""}`} 
              onClick={() => handleCategoryClick(item.category)}
            >
              <img src={item.image} alt={item.title} />
              <div className="offer-overlay">
                <div className="offer-info">
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RESULTS ANCHOR (AUTO-SCROLL TARGET) */}
      <div ref={resultsRef} style={{ scrollMarginTop: '100px' }}>
        
        <section className="dynamic-foods">
          <FoodDisplay category={category} search={search} />
        </section>

        <section className="restaurants">
          <h2>Popular Restaurants</h2>
          <div className="restaurant-grid">
            {filteredRestaurants.length > 0 ? (
              filteredRestaurants.map((r, index) => (
                <Link to={`/restaurant/${r.id}`} key={r.id} className="card" style={{ animationDelay: `${index * 0.05}s` }}>
                  <img src={r.image} alt={r.name} />
                  <div className="cardBody">
                      <h3>{r.name}</h3>
                      <p className="cuisine">{r.cuisine}</p>
                      <div className="cardMeta">
                           <span className="rating-badge">⭐ {r.rating}</span>
                           <span className="time-tag">{r.time || "30-40 min"}</span>
                      </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="no-results">
                  <p>No restaurants found for "{category}"</p>
                  <button onClick={() => setCategory("All")}>Reset Filters</button>
              </div>
            )}
          </div>
        </section>
      </div>

    </div>
  );
};

export default Home;