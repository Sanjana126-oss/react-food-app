import React, { useEffect, useState } from "react";
import "./Checkout.css";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  //  Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    const t = storedCart.reduce((sum, item) => sum + item.price, 0);
    setTotal(t);
  }, []);

  //  Handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // PLACE ORDER (your logic)
  const placeOrder = () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Fill all details");
      return;
    }

    const oldOrders = JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {
      items: cart,
      total,
      user: form,
      date: new Date().toLocaleString(),
    };

    localStorage.setItem("orders", JSON.stringify([...oldOrders, newOrder]));

    localStorage.removeItem("cart");

    window.location.href = "/success";
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>

      {/* Cart items */}
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="checkout-items">
            {cart.map((item, index) => (
              <div key={index} className="checkout-item">
                <img src={item.image} alt={item.name} />
                <div>
                  <h4>{item.name}</h4>
                  <p>₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>

          <h3>Total: ₹{total}</h3>

          {/* Form */}
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
          />

          <textarea
            name="address"
            placeholder="Delivery Address"
            value={form.address}
            onChange={handleChange}
          />

          <button className="place-order" onClick={placeOrder}>
            Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;