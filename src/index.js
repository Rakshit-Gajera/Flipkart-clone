// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

import './assets/css/header.css';
import './assets/css/home.css';
import './assets/css/products.css';
import './assets/css/product-detail.css';
import './assets/css/cart.css';
import './assets/css/auth.css';
import './assets/css/payment.css';
import './assets/css/order-confirmation.css';
import './assets/css/components.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);