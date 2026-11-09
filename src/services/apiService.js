// src/services/apiService.js
import { API_CONFIG, API_ENDPOINTS } from '../config/apiConfig';
import { ErrorHandler, retryRequest } from '../utils/errorHandler';
import { mockProductAPI, mockUserAPI, mockCartAPI } from './mockDataService';

// Generic fetch wrapper with error handling and retry logic
const apiCall = (endpoint, options = {}) => {
  const requestFn = () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

    return fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      signal: controller.signal,
      ...options,
    })
    .then(response => {
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const error = new Error(`HTTP error! status: ${response.status}`);
        error.response = response;
        error.status = response.status;
        throw error;
      }
      
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      clearTimeout(timeoutId);
      // Add more context to the error
      if (error.name === 'AbortError') {
        const timeoutError = new Error('Request timeout');
        timeoutError.name = 'AbortError';
        throw timeoutError;
      }
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        const networkError = new Error('Network error');
        networkError.name = 'NetworkError';
        throw networkError;
      }
      throw error;
    });
  };

  return retryRequest(requestFn, API_CONFIG.RETRY_ATTEMPTS, API_CONFIG.RETRY_DELAY);
};

// Product API functions with fallback to mock data
export const productAPI = {
  // Get all products
  getAllProducts: () => {
    return apiCall(API_ENDPOINTS.PRODUCTS)
      .then(data => {
        return data;
      })
      .catch(error => {
        console.warn('API failed, using mock data:', error.message);
        return mockProductAPI.getAllProducts();
      });
  },
  
  // Get product by ID
  getProductById: (id) => {
    return apiCall(API_ENDPOINTS.PRODUCT_BY_ID(id))
      .then(data => {
        return data;
      })
      .catch(error => {
        console.warn('API failed, using mock data:', error.message);
        return mockProductAPI.getProductById(id);
      });
  },
  
  // Get products by category
  getProductsByCategory: (category) => {
    return apiCall(API_ENDPOINTS.PRODUCTS_BY_CATEGORY(category))
      .then(data => {
        return data;
      })
      .catch(error => {
        console.warn('API failed, using mock data:', error.message);
        return mockProductAPI.getProductsByCategory(category);
      });
  },
  
  // Get all categories
  getCategories: () => {
    return apiCall(API_ENDPOINTS.CATEGORIES)
      .then(data => {
        return data;
      })
      .catch(error => {
        console.warn('API failed, using mock data:', error.message);
        return mockProductAPI.getCategories();
      });
  },
  
  // Get limited products
  getLimitedProducts: (limit = 20) => {
    return apiCall(`${API_ENDPOINTS.PRODUCTS}?limit=${limit}`)
      .then(data => {
        return data;
      })
      .catch(error => {
        console.warn('API failed, using mock data:', error.message);
        return mockProductAPI.getLimitedProducts(limit);
      });
  },
  
  // Sort products
  getSortedProducts: (sort = 'asc') => {
    return apiCall(`${API_ENDPOINTS.PRODUCTS}?sort=${sort}`)
      .then(data => {
        return data;
      })
      .catch(error => {
        console.warn('API failed, using mock data:', error.message);
        return mockProductAPI.getSortedProducts(sort);
      });
  },
};

// User API functions with fallback to mock data
export const userAPI = {
  // Get all users
  getAllUsers: () => {
    return apiCall(API_ENDPOINTS.USERS)
      .then(data => {
        return data;
      })
      .catch(error => {
        console.warn('API failed, using mock data:', error.message);
        return mockUserAPI.getAllUsers();
      });
  },
  
  // Get user by ID
  getUserById: (id) => {
    return apiCall(API_ENDPOINTS.USER_BY_ID(id))
      .then(data => {
        return data;
      })
      .catch(error => {
        console.warn('API failed, using mock data:', error.message);
        return mockUserAPI.getUserById(id);
      });
  },
  
  // User authentication
  login: (username, password) => {
    const requestFn = () => {
      return fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.LOGIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })
      .then(response => {
        if (!response.ok) {
          const error = new Error('Login failed');
          error.response = response;
          error.status = response.status;
          throw error;
        }
        return response.json();
      })
      .then(data => {
        return data;
      });
    };

    return retryRequest(requestFn, API_CONFIG.RETRY_ATTEMPTS, API_CONFIG.RETRY_DELAY)
      .then(data => {
        return data;
      })
      .catch(error => {
        console.warn('API failed, using mock data:', error.message);
        return mockUserAPI.login(username, password);
      });
  },
};

// Cart API functions with fallback to mock data
export const cartAPI = {
  // Get all carts
  getAllCarts: () => {
    return apiCall(API_ENDPOINTS.CARTS)
      .then(data => {
        return data;
      })
      .catch(error => {
        console.warn('API failed, using mock data:', error.message);
        return mockCartAPI.getAllCarts();
      });
  },
  
  // Get cart by user ID
  getUserCart: (userId) => {
    return apiCall(API_ENDPOINTS.USER_CART(userId))
      .then(data => {
        return data;
      })
      .catch(error => {
        console.warn('API failed, using mock data:', error.message);
        return mockCartAPI.getUserCart(userId);
      });
  },
  
  // Get cart by ID
  getCartById: (id) => {
    return apiCall(API_ENDPOINTS.CART_BY_ID(id))
      .then(data => {
        return data;
      })
      .catch(error => {
        console.warn('API failed, using mock data:', error.message);
        return mockCartAPI.getCartById(id);
      });
  },
  
  // Add new cart
  addCart: (cartData) => {
    return apiCall(API_ENDPOINTS.CARTS, {
      method: 'POST',
      body: JSON.stringify(cartData),
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.warn('API failed, using mock data:', error.message);
      return mockCartAPI.addCart(cartData);
    });
  },
  
  // Update cart
  updateCart: (cartId, cartData) => {
    return apiCall(API_ENDPOINTS.CART_BY_ID(cartId), {
      method: 'PUT',
      body: JSON.stringify(cartData),
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.warn('API failed, using mock data:', error.message);
      return mockCartAPI.updateCart(cartId, cartData);
    });
  },
  
  // Delete cart
  deleteCart: (cartId) => {
    return apiCall(API_ENDPOINTS.CART_BY_ID(cartId), {
      method: 'DELETE',
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.warn('API failed, using mock data:', error.message);
      return mockCartAPI.deleteCart(cartId);
    });
  },
};

// Utility functions
export const utils = {
  // Convert USD to INR (approximate rate)
  usdToInr: (usdPrice) => Math.round(usdPrice * 83),
  
  // Format price with currency symbol
  formatPrice: (price, currency = '₹') => `${currency}${price}`,
  
  // Generate random user ID for demo purposes
  generateRandomUserId: () => Math.floor(Math.random() * 10) + 1,
  
  // Format date
  formatDate: (date) => new Date(date).toLocaleDateString(),
  
  // Truncate text
  truncateText: (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  },
  
  // Validate email
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
};

// Export all APIs as a single object for convenience
export default {
  productAPI,
  userAPI,
  cartAPI,
  utils,
};
