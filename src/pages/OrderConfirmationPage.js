// src/pages/OrderConfirmationPage.js
import React, { useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const OrderConfirmationPage = () => {
    const location = useLocation();
    const { user } = useContext(AuthContext); // Get user info for address
    const { order } = location.state || {};

    if (!order) {
        return (
            <div className="container mt-5 text-center">
                <h2>No order details found.</h2>
                <p>Something went wrong. Please check your orders or contact support.</p>
                <Link to="/" className="btn btn-primary">Go to Homepage</Link>
            </div>
        );
    }

    // A function to format the payment method name nicely
    const formatPaymentMethod = (method) => {
        switch (method) {
            case 'upi':
                return 'UPI';
            case 'card':
                return 'Credit / Debit Card';
            case 'cod':
                return 'Cash on Delivery';
            default:
                return 'N/A';
        }
    };

    return (
        <div className="container my-4">
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    <div className="confirmation-card text-center mb-4">
                        <div className="success-icon">
                            <i className="fas fa-check-circle"></i>
                        </div>
                        <h1>Order Placed Successfully!</h1>
                        <p>Thank you for shopping with us. Your order is confirmed.</p>
                    </div>

                    <div className="row">
                        {/* Left Side: Delivery and Payment */}
                        <div className="col-md-6">
                            <div className="info-card">
                                <h5><i className="fas fa-shipping-fast me-2"></i> Delivery Address</h5>
                                <p className="address-name">{user?.name || 'Guest User'}</p>
                                <p className="address-details">
                                    123 React Lane, Component City, JSX 12345, India<br/>
                                    Phone: 9876543210
                                </p>
                            </div>
                            <div className="info-card">
                                <h5><i className="fas fa-credit-card me-2"></i> Payment Method</h5>
                                <div className="payment-details">
                                    <div className="payment-row">
                                        <span>Payment Method:</span>
                                        <strong>{formatPaymentMethod(order.paymentMethod)}</strong>
                                    </div>
                                    <div className="payment-row">
                                        <span>Order ID:</span>
                                        <strong>{order.id}</strong>
                                    </div>
                                    <div className="payment-row">
                                        <span>Total Amount:</span>
                                        <strong>₹{Math.round(order.total * 83)}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Right Side: Order Items */}
                        <div className="col-md-6">
                            <div className="order-details-section">
                                <h4>Items in your order</h4>
                                {order.items.map(item => (
                                    <div className="order-item" key={item.id}>
                                        <img src={item.image} alt={item.title} />
                                        <div className="order-item-details">
                                            <div className="order-item-title">{item.title}</div>
                                            <div className="order-item-quantity">Quantity: {item.quantity}</div>
                                            <div className="order-item-price">₹{Math.round(item.price * 83)}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-4">
                        <Link to="/products" className="btn btn-primary">Continue Shopping</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmationPage;