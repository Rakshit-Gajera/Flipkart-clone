// src/pages/RegisterPage.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (!name || !email || !password) {
            setError('Please fill in all fields.');
            return;
        }
        // In a real app, you'd make an API call here.
        // For this demo, we'll just log it and redirect.
        console.log('Registered user:', { name, email });
        alert('Registration successful! Please log in.');
        navigate('/login');
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                 <div className="row g-0">
                    <div className="col-md-6">
                        <div className="auth-welcome">
                            <h2>Looks like you're new here!</h2>
                            <p>Sign up to get started</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="auth-form">
                            <form onSubmit={handleSubmit}>
                                {error && <div className="alert alert-danger">{error}</div>}
                                <div className="form-group mb-3">
                                    <label htmlFor="name">Full Name</label>
                                    <input type="text" id="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </div>
                                <button type="submit" className="btn btn-login w-100">Create Account</button>
                                <div className="auth-switch mt-3">
                                    <span>Existing User? </span>
                                    <Link to="/login">Log in</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;