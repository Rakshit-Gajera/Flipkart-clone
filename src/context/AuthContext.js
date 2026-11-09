// src/context/AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      console.error('Failed to parse user from localStorage:', e);
      return null;
    }
  });

  const login = (userData) => {
    setUser(userData);
    try {
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (e) {
      console.error('Failed to save user to localStorage:', e);
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('user');
    } catch (e) {
      console.error('Failed to remove user from localStorage:', e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};