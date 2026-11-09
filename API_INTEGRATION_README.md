# Flipkart Clone - API Integration Documentation

## Overview

This Flipkart clone React project has been enhanced with comprehensive API integration using the **FakeStore API** (`https://fakestoreapi.com`). The integration includes centralized API management, error handling, authentication, cart management, and utility functions.

## 🚀 Features Implemented

### 1. Centralized API Service (`src/services/apiService.js`)
- **Product API**: Fetch products, categories, and individual product details
- **User API**: User authentication and management
- **Cart API**: Cart operations (add, update, delete, fetch)
- **Utility Functions**: Price conversion, formatting, validation

### 2. API Configuration (`src/config/apiConfig.js`)
- Centralized configuration for all API endpoints
- Error messages and success messages
- Loading states and currency configuration
- Pagination and cache settings

### 3. Error Handling (`src/utils/errorHandler.js`)
- Comprehensive error handling with retry logic
- Network error detection and timeout handling
- User-friendly error messages
- Loading state management

### 4. Enhanced Components
- **HomePage**: Uses centralized API for product fetching
- **ProductsPage**: Integrated with product and category APIs
- **ProductDetailPage**: Fetches individual product details
- **LoginPage**: Real authentication using FakeStore API
- **CartContext**: Cart persistence with API integration

## 📁 Project Structure

```
src/
├── services/
│   └── apiService.js          # Centralized API service
├── config/
│   └── apiConfig.js           # API configuration
├── utils/
│   └── errorHandler.js        # Error handling utilities
├── context/
│   ├── AuthContext.js         # Authentication context
│   └── CartContext.js         # Cart management with API
└── pages/
    ├── HomePage.js            # Enhanced with API integration
    ├── ProductsPage.js        # Uses centralized API service
    ├── ProductDetailPage.js   # API-powered product details
    └── LoginPage.js           # Real authentication API
```

## 🔧 API Endpoints Used

### Products
- `GET /products` - Get all products
- `GET /products/{id}` - Get product by ID
- `GET /products/category/{category}` - Get products by category
- `GET /products/categories` - Get all categories

### Authentication
- `POST /auth/login` - User login

### Users
- `GET /users` - Get all users
- `GET /users/{id}` - Get user by ID

### Carts
- `GET /carts` - Get all carts
- `GET /carts/user/{userId}` - Get user's cart
- `POST /carts` - Add new cart
- `PUT /carts/{id}` - Update cart
- `DELETE /carts/{id}` - Delete cart

## 🛠️ Usage Examples

### Fetching Products
```javascript
import { productAPI } from '../services/apiService';

// Get all products
const products = await productAPI.getAllProducts();

// Get product by ID
const product = await productAPI.getProductById(1);

// Get products by category
const electronics = await productAPI.getProductsByCategory('electronics');
```

### User Authentication
```javascript
import { userAPI } from '../services/apiService';

// Login user
const authData = await userAPI.login('test@example.com', 'password123');
```

### Cart Management
```javascript
import { cartAPI } from '../services/apiService';

// Get user's cart
const userCart = await cartAPI.getUserCart(userId);

// Add new cart
const newCart = await cartAPI.addCart(cartData);
```

## 🔐 Authentication

The project now uses real authentication through the FakeStore API:

1. **Login**: Users can log in with any valid email format and password
2. **Token Management**: JWT tokens are handled automatically
3. **Session Persistence**: User sessions are maintained across page refreshes
4. **Cart Persistence**: Cart data is saved and loaded based on user authentication

### Demo Credentials
- **Email**: Any valid email format (e.g., `test@example.com`)
- **Password**: Any password

## 🛒 Cart Integration

The cart system now includes:

1. **API Persistence**: Cart data is saved to and loaded from the API
2. **User-Specific Carts**: Each user has their own cart
3. **Real-time Updates**: Cart changes are immediately synced with the API
4. **Error Handling**: Graceful handling of cart API failures

## 💰 Currency Conversion

- **USD to INR**: Automatic conversion using current exchange rate (₹83 per $1)
- **Price Formatting**: Consistent price display across the application
- **Configurable**: Exchange rates can be easily updated in the configuration

## 🚨 Error Handling

The project includes comprehensive error handling:

1. **Network Errors**: Automatic retry with exponential backoff
2. **Timeout Handling**: Requests timeout after 10 seconds
3. **User-Friendly Messages**: Clear error messages for users
4. **Graceful Degradation**: App continues to work even when API calls fail

## 🔄 Loading States

All API calls include proper loading states:

1. **Visual Indicators**: Spinners and loading messages
2. **Button States**: Disabled buttons during API calls
3. **Error States**: Clear error messages when things go wrong
4. **Success States**: Confirmation messages for successful operations

## 🎯 Key Benefits

1. **Centralized Management**: All API calls are managed in one place
2. **Error Resilience**: Robust error handling and retry logic
3. **User Experience**: Smooth loading states and error messages
4. **Maintainability**: Easy to update API endpoints and configurations
5. **Scalability**: Ready for additional API integrations
6. **Real Data**: Uses actual API data instead of mock data

## 🚀 Getting Started

1. **Install Dependencies**: `npm install`
2. **Start Development Server**: `npm start`
3. **Test Authentication**: Use any valid email and password to log in
4. **Explore Features**: Browse products, add to cart, and test the API integration

## 📝 Notes

- The FakeStore API is a demo API, so some features may be limited
- Cart persistence uses random user IDs for demo purposes
- In a production environment, you would use real user authentication
- All API calls include proper error handling and loading states

## 🔗 Resources

- [FakeStore API Documentation](https://fakestoreapi.com/)
- [React Documentation](https://reactjs.org/)
- [React Router Documentation](https://reactrouter.com/)

---

**Happy Coding! 🎉**
