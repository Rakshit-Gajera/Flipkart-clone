// src/pages/PaymentPage.js
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const PaymentPage = () => {
    const { cartItems, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('upi');

    useEffect(() => {
        if (!user) {
            navigate('/login?redirect=/payment');
        } else if (cartItems.length === 0) {
            navigate('/');
        }
    }, [user, cartItems, navigate]);

    if (!user || cartItems.length === 0) {
        return null;
    }

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity * 83), 0);
    const discount = subtotal * 0.10;
    const delivery = subtotal - discount > 500 ? 0 : 40;
    const total = subtotal - discount + delivery;

    const handlePayment = () => {
        const orderDetails = {
            id: `ORD${Date.now()}`,
            items: cartItems,
            total: total / 83, // Convert back to original currency for consistency
            paymentMethod: paymentMethod,
        };

        console.log("Order Placed:", orderDetails);
        clearCart();
        navigate('/order-confirmation', { state: { order: orderDetails } });
    };

    return (
        <div className="container my-4">
            <div className="row">
                {/* Left Side: Payment Options */}
                <div className="col-lg-8">
                    <div className="payment-options-card">
                        <div className="login-summary">
                            <h5>1. LOGIN <i className="fas fa-check-circle text-success"></i></h5>
                            <p>{user?.name} <span className="ms-3">{user?.email}</span></p>
                        </div>
                        <div className="address-summary">
                            <h5>2. DELIVERY ADDRESS <i className="fas fa-check-circle text-success"></i></h5>
                            <p><strong>{user?.name}</strong>, 123 React Lane, Component City, JSX 12345, India</p>
                        </div>
                        <div className="order-review">
                             <h5>3. ORDER SUMMARY</h5>
                             {cartItems.map(item => (
                                 <div key={item.id} className="d-flex mb-2">
                                     <img src={item.image} alt={item.title} width="50"/>
                                     <div className="ms-3">{item.title}</div>
                                 </div>
                             ))}
                        </div>
                        <div className="payment-selection">
                            <h5>4. PAYMENT OPTIONS</h5>
                            <div className="accordion" id="paymentAccordion">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingUpi">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseUpi">
                                            <input type="radio" name="paymentMethod" value="upi" checked={paymentMethod === 'upi'} onChange={e => setPaymentMethod(e.target.value)}/>
                                            <label className="ms-2">UPI</label>
                                        </button>
                                    </h2>
                                    <div id="collapseUpi" className="accordion-collapse collapse show" data-bs-parent="#paymentAccordion">
                                        <div className="accordion-body">
                                            <p>Enter your UPI ID to proceed with the payment.</p>
                                            <input type="text" className="form-control" placeholder="yourname@bank"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingCard">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCard">
                                            <input type="radio" name="paymentMethod" value="card" checked={paymentMethod === 'card'} onChange={e => setPaymentMethod(e.target.value)}/>
                                            <label className="ms-2">Credit / Debit Card</label>
                                        </button>
                                    </h2>
                                    <div id="collapseCard" className="accordion-collapse collapse" data-bs-parent="#paymentAccordion">
                                        <div className="accordion-body">
                                            Enter your card details. (This is a demo)
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingCod">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCod">
                                             <input type="radio" name="paymentMethod" value="cod" checked={paymentMethod === 'cod'} onChange={e => setPaymentMethod(e.target.value)}/>
                                            <label className="ms-2">Cash on Delivery</label>
                                        </button>
                                    </h2>
                                    <div id="collapseCod" className="accordion-collapse collapse" data-bs-parent="#paymentAccordion">
                                        <div className="accordion-body">
                                            Pay with cash at the time of delivery.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button className="btn btn-checkout mt-3" onClick={handlePayment}>
                                PAY ₹{Math.round(total)}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Side: Price Summary */}
                <div className="col-lg-4">
                     <div className="price-summary sticky-top" style={{top: '80px'}}>
                        <div className="price-header"><h4>PRICE DETAILS</h4></div>
                        <div className="price-breakdown">
                            <div className="price-row">
                                <span>Price ({cartItems.length} items)</span>
                                <span>₹{Math.round(subtotal)}</span>
                            </div>
                            <div className="price-row">
                                <span>Discount</span>
                                <span className="discount-amount">- ₹{Math.round(discount)}</span>
                            </div>
                            <div className="price-row">
                                <span>Delivery Charges</span>
                                <span className={delivery === 0 ? 'delivery-free' : ''}>
                                    {delivery === 0 ? 'FREE' : `₹${delivery}`}
                                </span>
                            </div>
                            <hr/>
                            <div className="price-row total-amount">
                                <span>Total Amount</span>
                                <span>₹{Math.round(total)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;