// src/pages/CartPage.js
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const CartPage = () => {
    const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [priceSummary, setPriceSummary] = useState({
        subtotal: 0,
        discount: 0,
        delivery: 0,
        total: 0,
    });

    useEffect(() => {
        const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity * 83), 0);
        const discount = subtotal * 0.10; // Apply a mock 10% discount
        const delivery = subtotal - discount > 500 ? 0 : 40; // Free delivery over ₹500
        const total = subtotal - discount + delivery;
        
        setPriceSummary({ subtotal, discount, delivery, total });
    }, [cartItems]);
    
    const handleCheckout = () => {
        if (!user) {
            navigate('/login?redirect=/cart');
        } else if (cartItems.length === 0) {
            alert("Your cart is empty.");
        } else {
            navigate('/payment');
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="container mt-5 text-center empty-cart">
                <div className="empty-cart-content">
                    <img src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt="Empty Cart" style={{width: '220px'}}/>
                    <h3>Your cart is empty!</h3>
                    <p>Add items to it now.</p>
                    <Link to="/" className="btn btn-primary shop-now-btn">Shop Now</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-lg-8">
                    <div className="cart-section">
                        <div className="cart-header">
                            <h2>My Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})</h2>
                        </div>
                        <div className="cart-items">
                            {cartItems.map(item => (
                                <div className="cart-item" key={item.id}>
                                    <img src={item.image} alt={item.title} className="item-image" />
                                    <div className="item-details">
                                        <Link to={`/product/${item.id}`} className="item-title">{item.title}</Link>
                                        <div className="item-price">
                                            <span className="current-price">₹{Math.round(item.price * 83)}</span>
                                        </div>
                                        <div className="item-actions">
                                             <div className="quantity-controls">
                                                <button className="quantity-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                                                <input type="text" className="quantity-display" value={item.quantity} readOnly />
                                                <button className="quantity-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                            </div>
                                            <button className="remove-btn" onClick={() => removeFromCart(item.id)}>REMOVE</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="price-summary">
                        <div className="price-header"><h4>PRICE DETAILS</h4></div>
                        <div className="price-breakdown">
                            <div className="price-row">
                                <span>Price ({cartItems.length} items)</span>
                                <span>₹{Math.round(priceSummary.subtotal)}</span>
                            </div>
                            <div className="price-row">
                                <span>Discount</span>
                                <span className="discount-amount">- ₹{Math.round(priceSummary.discount)}</span>
                            </div>
                            <div className="price-row">
                                <span>Delivery Charges</span>
                                <span className={priceSummary.delivery === 0 ? 'delivery-free' : ''}>
                                    {priceSummary.delivery === 0 ? 'FREE' : `₹${priceSummary.delivery}`}
                                </span>
                            </div>
                            <hr/>
                            <div className="price-row total-amount">
                                <span>Total Amount</span>
                                <span>₹{Math.round(priceSummary.total)}</span>
                            </div>
                             <div className="savings-info">
                                You will save ₹{Math.round(priceSummary.discount)} on this order
                            </div>
                        </div>
                        <div className="checkout-section">
                           <button className="btn btn-checkout" onClick={handleCheckout}>
                               PLACE ORDER
                           </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CartPage;