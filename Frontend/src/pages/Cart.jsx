import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const {    
    cart,
    addToCart,
    decreaseQty,
    removeItem,
    subtotal,
    discount,
    total,
  } = useContext(CartContext); 

  // ⭐ EMPTY CART
  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty 😔</h2>
        <p>Add something tasty</p>

        <Link to="/">
          <button className="browse-btn">Browse Food</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2>Your Cart</h2>

      {/* ⭐ ITEMS */}
      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <div>
            <h4>{item.name}</h4>
            <p>₹{item.price}</p>
          </div>

          {/* ⭐ Quantity Stepper */}
          <div className="qty">
            <button onClick={() => decreaseQty(item.id)}>-</button>
            <span>{item.qty}</span>
            <button onClick={() => addToCart(item)}>+</button>
          </div>

          <p className="item-total">₹{item.price * item.qty}</p>

          {/* ⭐ Remove */}
          <button
            className="remove-btn"
            onClick={() => removeItem(item.id)}
          >
            Remove
          </button>
        </div>
      ))}
 

      {/* ⭐ BILL SECTION */}
      <div className="bill">
        <div className="bill-row">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        {discount > 0 && (
          <div className="bill-row discount">
            <span>Discount</span>
            <span>-₹{discount}</span>
          </div>
        )}

        <div className="bill-row total">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>

      {/* ⭐ CHECKOUT */}
      <Link to="/checkout">
        <button className="checkout-btn">Checkout</button>
      </Link>
    </div>
  );
};

export default Cart;