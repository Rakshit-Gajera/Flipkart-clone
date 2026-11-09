// src/context/CartContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { cartAPI, utils } from '../services/apiService';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
      console.error('Failed to parse cart from localStorage:', e);
      return [];
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  // Sync cartItems with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [cartItems]);

  // Load cart from API when user logs in if local cart is empty
  useEffect(() => {
    if (user && cartItems.length === 0) {
      loadUserCart();
    }
  }, [user]);

  // Load user's cart from API
  const loadUserCart = () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    const userId = user.id || 1;
    
    cartAPI.getUserCart(userId)
      .then(cartData => {
        if (cartData && Array.isArray(cartData) && cartData.length > 0) {
          const items = cartData[0].products.map(item => ({
            id: item.productId,
            title: item.title || `Product ${item.productId}`,
            price: item.price || 50,
            image: item.image || 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
            quantity: item.quantity || 1,
            category: item.category || 'General'
          }));
          setCartItems(prev => (prev.length === 0 ? items : prev));
        }
      })
      .catch(error => {
        console.error('Failed to load cart:', error);
        setError('Failed to load cart data');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Save cart to API
  const saveCartToAPI = (items) => {
    if (!user) return;
    
    const userId = user.id || utils.generateRandomUserId();
    const cartData = {
      userId: userId,
      date: new Date().toISOString(),
      products: items.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        title: item.title,
        price: item.price,
        image: item.image,
        category: item.category
      }))
    };
    
    cartAPI.addCart(cartData)
      .then(data => {
        console.log('Cart saved to API:', data);
      })
      .catch(error => {
        console.error('Failed to save cart:', error);
      });
  };

  // Add a product with a specific quantity
  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const isItemInCart = prevItems.find(item => item.id === product.id);
      let newItems;
      
      if (isItemInCart) {
        newItems = prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...prevItems, { ...product, quantity }];
      }
      
      if (user) {
        saveCartToAPI(newItems);
      }
      
      return newItems;
    });
  };

  // Remove a product completely
  const removeFromCart = (productId) => {
    setCartItems(prevItems => {
      const newItems = prevItems.filter(item => item.id !== productId);
      
      if (user) {
        saveCartToAPI(newItems);
      }
      
      return newItems;
    });
  };

  // Update the quantity of a specific item
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems => {
      const newItems = prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
      
      if (user) {
        saveCartToAPI(newItems);
      }
      
      return newItems;
    });
  };
  
  // Clear the entire cart (used after placing an order)
  const clearCart = () => {
    setCartItems([]);
    try {
      localStorage.removeItem('cart');
    } catch (e) {
      console.error('Failed to clear cart in localStorage:', e);
    }
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      loading, 
      error,
      loadUserCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};
