// src/pages/LoginPage.js
import React, { useState, useContext } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { userAPI } from '../services/apiService';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const redirectPath = searchParams.get('redirect') || '/';

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Use FakeStore API for authentication
        userAPI.login(email, password)
            .then(authData => {
                if (authData && authData.token) {
                    // Get user details using the token
                    const userData = {
                        name: email.split('@')[0], // Extract name from email
                        email: email,
                        token: authData.token
                    };
                    
                    login(userData);
                    navigate(redirectPath);
                } else {
                    setError('Invalid credentials. Please try again.');
                }
            })
            .catch(error => {
                console.error('Login error:', error);
                // Handle different types of errors
                if (error.message && error.message.includes('401')) {
                    setError('Invalid email or password. Please try again.');
                } else if (error.message && error.message.includes('Network')) {
                    setError('Network error. Please check your internet connection and try again.');
                } else {
                    setError('Login failed. Please check your credentials and try again.');
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="auth-container">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10 col-xl-8">
                        <div className="auth-card">
                            <div className="row g-0">
                                <div className="col-md-6 d-none d-md-flex">
                                    <div className="auth-welcome">
                                        <h2>Login</h2>
                                        <p>Get access to your Orders, Wishlist and Recommendations</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="auth-form">
                                        <form onSubmit={handleSubmit} noValidate>
                                            {error && <div className="alert alert-danger p-2 small">{error}</div>}
                                            <div className="form-group">
                                                <input
                                                    type="email"
                                                    id="email"
                                                    className="form-control"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="Enter Email"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="password"
                                                    id="password"
                                                    className="form-control"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    placeholder="Enter Password"
                                                />
                                            </div>
                                            <p className="form-text small">
                                                By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.
                                            </p>
                                            <div className="alert alert-info small">
                                                <strong>Demo Credentials:</strong> Use any valid email format (e.g., test@example.com) and any password to test the API integration.
                                            </div>
                                            <button type="submit" className="btn btn-login w-100" disabled={loading}>
                                                {loading ? 'Logging in...' : 'Login'}
                                            </button>
                                            <div className="auth-switch">
                                                <Link to="/register" className="create-account">New to Flipkart? Create an account</Link>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;