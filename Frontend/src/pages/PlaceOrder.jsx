import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './placeOrder.css';

const PlaceOrder = () => {
    const { cart, total, clearCart } = useContext(CartContext); 
    const navigate = useNavigate();

    const [data, setData] = useState({
        firstName: "", lastName: "", email: "",
        street: "", city: "", state: "",
        zipcode: "", country: "", phone: ""
    });

    const onChangeHandler = (event) => {
        setData(data => ({ ...data, [event.target.name]: event.target.value }));
    };

    const handlePlaceOrder = async (event) => {
        event.preventDefault();

        const orderItems = cart.map((item) => ({
            foodId: item._id,
            name: item.name,
            quantity: item.quantity || 1,
            price: item.price
        }));

        const orderData = {
            userId: localStorage.getItem("userId") || "65f123456789012345678901", 
            items: orderItems,
            amount: total + 40,
            address: data,
        };

        try {
            // FIXED: Changed localhost to your live Render URL
            const response = await fetch("https://react-food-app-1-mkmv.onrender.com/api/order/place", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData)
            });

            const result = await response.json();

            if (result.success) {
                alert("SUCCESS: Order placed!");
                clearCart(); 
                navigate('/myorders'); 
            } else {
                alert("Error: " + result.message);
            }
        } catch (error) {
            console.error(error);
            alert("Server Error: Check if backend is awake.");
        }
    };

    useEffect(() => {
        if (cart.length === 0) { navigate('/cart'); }
    }, [cart]);

    return (
        <form onSubmit={handlePlaceOrder} className='place-order'>
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input required name='firstName' onChange={onChangeHandler} placeholder='First name' />
                    <input required name='lastName' onChange={onChangeHandler} placeholder='Last name' />
                </div>
                <input required name='email' onChange={onChangeHandler} type="email" placeholder='Email' />
                <input required name='street' onChange={onChangeHandler} placeholder='Street' />
                <div className="multi-fields">
                    <input required name='city' onChange={onChangeHandler} placeholder='City' />
                    <input required name='state' onChange={onChangeHandler} placeholder='State' />
                </div>
                <div className="multi-fields">
                    <input required name='zipcode' onChange={onChangeHandler} placeholder='Zip code' />
                    <input required name='country' onChange={onChangeHandler} placeholder='Country' />
                </div>
                <input required name='phone' onChange={onChangeHandler} placeholder='Phone' />
            </div>

            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div className="cart-total-details"><p>Subtotal</p><p>₹{total}</p></div>
                    <hr /><div className="cart-total-details"><p>Delivery</p><p>₹40</p></div>
                    <hr /><div className="cart-total-details"><b>Total</b><b>₹{total + 40}</b></div>
                    <button type='submit'>PLACE ORDER</button>
                </div>
            </div>
        </form>
    );
};

export default PlaceOrder;