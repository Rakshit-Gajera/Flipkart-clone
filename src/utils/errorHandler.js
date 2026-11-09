// src/utils/errorHandler.js

import { ERROR_MESSAGES } from '../config/apiConfig';

// Error types
export const ERROR_TYPES = {
  NETWORK: 'NETWORK_ERROR',
  TIMEOUT: 'TIMEOUT_ERROR',
  SERVER: 'SERVER_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  VALIDATION: 'VALIDATION_ERROR',
  UNKNOWN: 'UNKNOWN_ERROR',
};

// Error handler class
export class ErrorHandler {
  static handle(error) {
    console.error('API Error:', error);
    
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return {
        type: ERROR_TYPES.NETWORK,
        message: ERROR_MESSAGES.NETWORK_ERROR,
        originalError: error
      };
    }
    
    if (error.name === 'AbortError') {
      return {
        type: ERROR_TYPES.TIMEOUT,
        message: ERROR_MESSAGES.TIMEOUT_ERROR,
        originalError: error
      };
    }
    
    if (error.response) {
      const status = error.response.status;
      
      switch (status) {
        case 400:
          return {
            type: ERROR_TYPES.VALIDATION,
            message: ERROR_MESSAGES.VALIDATION_ERROR,
            originalError: error
          };
        case 401:
          return {
            type: ERROR_TYPES.UNAUTHORIZED,
            message: ERROR_MESSAGES.UNAUTHORIZED,
            originalError: error
          };
        case 403:
          return {
            type: ERROR_TYPES.FORBIDDEN,
            message: ERROR_MESSAGES.FORBIDDEN,
            originalError: error
          };
        case 404:
          return {
            type: ERROR_TYPES.NOT_FOUND,
            message: ERROR_MESSAGES.NOT_FOUND,
            originalError: error
          };
        case 500:
        case 502:
        case 503:
        case 504:
          return {
            type: ERROR_TYPES.SERVER,
            message: ERROR_MESSAGES.SERVER_ERROR,
            originalError: error
          };
        default:
          return {
            type: ERROR_TYPES.UNKNOWN,
            message: ERROR_MESSAGES.UNKNOWN_ERROR,
            originalError: error
          };
      }
    }
    
    return {
      type: ERROR_TYPES.UNKNOWN,
      message: error.message || ERROR_MESSAGES.UNKNOWN_ERROR,
      originalError: error
    };
  }
  
  static isNetworkError(error) {
    return error.type === ERROR_TYPES.NETWORK;
  }
  
  static isTimeoutError(error) {
    return error.type === ERROR_TYPES.TIMEOUT;
  }
  
  static isServerError(error) {
    return error.type === ERROR_TYPES.SERVER;
  }
  
  static isClientError(error) {
    return [
      ERROR_TYPES.VALIDATION,
      ERROR_TYPES.UNAUTHORIZED,
      ERROR_TYPES.FORBIDDEN,
      ERROR_TYPES.NOT_FOUND
    ].includes(error.type);
  }
}

// Retry utility
export const retryRequest = async (requestFn, maxAttempts = 3, delay = 1000) => {
  let lastError;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error;
      
      if (attempt === maxAttempts) {
        throw ErrorHandler.handle(error);
      }
      
      // Only retry on network or timeout errors
      const handledError = ErrorHandler.handle(error);
      if (!ErrorHandler.isNetworkError(handledError) && !ErrorHandler.isTimeoutError(handledError)) {
        throw handledError;
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay * attempt));
    }
  }
  
  throw ErrorHandler.handle(lastError);
};

// Loading state manager
export class LoadingStateManager {
  constructor() {
    this.states = new Map();
  }
  
  setLoading(key, isLoading) {
    this.states.set(key, isLoading);
  }
  
  isLoading(key) {
    return this.states.get(key) || false;
  }
  
  clear(key) {
    this.states.delete(key);
  }
  
  clearAll() {
    this.states.clear();
  }
}

// Toast notification utility
export const showToast = (message, type = 'info', duration = 3000) => {
  // This would integrate with your toast notification system
  console.log(`Toast [${type}]: ${message}`);
  
  // In a real app, you might dispatch an action to show a toast
  // dispatch(showToastAction({ message, type, duration }));
};

// Success notification utility
export const showSuccess = (message, duration = 3000) => {
  showToast(message, 'success', duration);
};

// Error notification utility
export const showError = (message, duration = 5000) => {
  showToast(message, 'error', duration);
};

export default {
  ErrorHandler,
  retryRequest,
  LoadingStateManager,
  showToast,
  showSuccess,
  showError,
};
