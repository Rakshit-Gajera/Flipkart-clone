import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

test('renders Flipkart clone header elements', () => {
  render(
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  );

  const cartElement = screen.getByText(/cart/i);
  expect(cartElement).toBeInTheDocument();

  const sellerElement = screen.getByText(/become a seller/i);
  expect(sellerElement).toBeInTheDocument();
});
