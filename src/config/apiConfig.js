// src/config/apiConfig.js

// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://fakestoreapi.com',
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
};

// API Endpoints
export const API_ENDPOINTS = {
  // Products
  PRODUCTS: '/products',
  PRODUCT_BY_ID: (id) => `/products/${id}`,
  PRODUCTS_BY_CATEGORY: (category) => `/products/category/${category}`,
  CATEGORIES: '/products/categories',
  
  // Users
  USERS: '/users',
  USER_BY_ID: (id) => `/users/${id}`,
  LOGIN: '/auth/login',
  
  // Carts
  CARTS: '/carts',
  CART_BY_ID: (id) => `/carts/${id}`,
  USER_CART: (userId) => `/carts/user/${userId}`,
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  TIMEOUT_ERROR: 'Request timeout. Please try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  NOT_FOUND: 'Resource not found.',
  UNAUTHORIZED: 'Unauthorized access. Please log in.',
  FORBIDDEN: 'Access forbidden.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  UNKNOWN_ERROR: 'An unexpected error occurred.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  LOGOUT_SUCCESS: 'Logged out successfully!',
  CART_ADDED: 'Item added to cart!',
  CART_REMOVED: 'Item removed from cart!',
  CART_UPDATED: 'Cart updated successfully!',
  ORDER_PLACED: 'Order placed successfully!',
};

// Loading States
export const LOADING_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

// Currency Configuration
export const CURRENCY_CONFIG = {
  USD_TO_INR_RATE: 83,
  SYMBOL: '₹',
  DECIMAL_PLACES: 0,
};

// Pagination Configuration
export const PAGINATION_CONFIG = {
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
  DEFAULT_PAGE: 1,
};

// Cache Configuration
export const CACHE_CONFIG = {
  PRODUCTS_TTL: 5 * 60 * 1000, // 5 minutes
  CATEGORIES_TTL: 30 * 60 * 1000, // 30 minutes
  USER_TTL: 15 * 60 * 1000, // 15 minutes
};

export default {
  API_CONFIG,
  API_ENDPOINTS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  LOADING_STATES,
  CURRENCY_CONFIG,
  PAGINATION_CONFIG,
  CACHE_CONFIG,
};
