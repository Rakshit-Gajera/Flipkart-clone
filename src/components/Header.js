// src/components/Header.js
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const { cartItems } = useContext(CartContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    // Calculate total items in the cart
    const cartItemCount = (cartItems || []).reduce((acc, item) => acc + (item.quantity || 1), 0);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
        }
    };

    return (
        <header className="main-header">
            <div className="header-content">
                <div className="header-logo-container">
                    <Link to="/" className="logo-link">
                        <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-44005d.svg" alt="Flipkart" className="logo-main"/>
                    </Link>
                </div>

                <div className="header-search-container">
                    <form className="search-form" onSubmit={handleSearchSubmit}>
                        <button type="submit" className="search-btn-icon" style={{background: 'none', border: 'none'}}>
                            <i className="fas fa-search search-icon"></i>
                        </button>
                        <input
                            type="text"
                            placeholder="Search for Products, Brands and More"
                            className="search-input"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </form>
                </div>

                <nav className="header-nav">
                    {user ? (
                        <div className={`dropdown ${dropdownOpen ? 'show' : ''}`} onMouseLeave={() => setDropdownOpen(false)}>
                            <button 
                                className="btn dropdown-toggle header-nav-item login-btn-dropdown" 
                                type="button" 
                                onClick={() => setDropdownOpen(prev => !prev)}
                                aria-expanded={dropdownOpen}
                            >
                                <i className="fas fa-user-circle"></i> {user.name}
                            </button>
                            <ul className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`} style={dropdownOpen ? { display: 'block', position: 'absolute' } : {}}>
                                <li><Link className="dropdown-item" to="#" onClick={() => setDropdownOpen(false)}><i className="fas fa-user-circle me-2"></i> My Profile</Link></li>
                                <li><Link className="dropdown-item" to="#" onClick={() => setDropdownOpen(false)}><i className="fas fa-box me-2"></i> Orders</Link></li>
                                <li><Link className="dropdown-item" to="#" onClick={() => setDropdownOpen(false)}><i className="fas fa-heart me-2"></i> Wishlist</Link></li>
                                <li><hr className="dropdown-divider"/></li>
                                <li><button onClick={() => { setDropdownOpen(false); logout(); }} className="dropdown-item"><i className="fas fa-sign-out-alt me-2"></i> Logout</button></li>
                            </ul>
                        </div>
                    ) : (
                        <Link to="/login" className="header-nav-item login-btn-link">
                            Login
                        </Link>
                    )}

                    <Link to="/cart" className="header-nav-item">
                        <i className="fas fa-shopping-cart"></i>
                        <span>Cart</span>
                        {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
                    </Link>

                    <Link to="#" className="header-nav-item">
                        <i className="fas fa-store"></i>
                        <span>Become a Seller</span>
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;