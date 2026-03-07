import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import "./CartBar.css";

const CartBar = () => {
  const { cart, total } = useContext(CartContext);
  const navigate = useNavigate();

  // If the cart is empty, do not show the bar at all
  if (cart.length === 0) return null;

  return (
    <div className="cart-bar">
      <div className="cart-info">
        <div className="cart-count-total">
          <span className="count-badge">{cart.length} items</span>
          <span className="total-amount">₹{total}</span>
        </div>
        <p className="plus-taxes">Extra charges may apply</p>
      </div>

      <div className="cart-actions">
        {/* Link to view the detailed cart list */}
        <Link to="/cart">
          <button className="view-cart-button">View Cart</button>
        </Link>

        {/* This button leads to the PlaceOrder/Address page */}
        <button 
          className="checkout-button" 
          onClick={() => navigate('/order')}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartBar;