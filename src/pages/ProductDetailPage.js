// src/pages/ProductDetailPage.js
import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { productAPI, utils } from '../services/apiService';
import LoadingSpinner from '../components/LoadingSpinner';

const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [showToast, setShowToast] = useState(false); // State for toast notification
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = () => {
            setLoading(true);
            productAPI.getProductById(id)
                .then(data => {
                    if (data && data.id) {
                        setProduct(data);
                    } else {
                        setProduct(null);
                    }
                })
                .catch(error => {
                    console.error("Failed to fetch product:", error);
                    setProduct(null);
                })
                .finally(() => {
                    setLoading(false);
                });
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product, quantity);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
        }
    };

    const handleBuyNow = () => {
        if (product) {
            addToCart(product, quantity);
            navigate('/cart');
        }
    };

    if (loading) return <LoadingSpinner message="Loading product details..." />;
    if (!product) return <div className="container mt-5">Product not found.</div>;

    return (
        <div className="container my-4">
            {/* Toast Notification */}
            {showToast && (
                <div className="toast show" style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1050 }}>
                    <div className="toast-header">
                        <strong className="me-auto">Success</strong>
                        <button type="button" className="btn-close" onClick={() => setShowToast(false)}></button>
                    </div>
                    <div className="toast-body">
                        {product.title} has been added to your cart!
                    </div>
                </div>
            )}
            
            {/* Breadcrumb */}
            <nav aria-label="breadcrumb" className="bg-white p-3 mb-3">
                <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/products?category=${product.category}`} className="text-capitalize">{product.category}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{product.title}</li>
                </ol>
            </nav>

            <div className="row">
                <div className="col-lg-5 col-md-6">
                    <div className="product-images">
                        <div className="main-image-container">
                            <img src={product.image} alt={product.title} className="main-image" />
                        </div>
                    </div>
                </div>
                <div className="col-lg-7 col-md-6">
                    <div className="product-info">
                        <h1 className="product-title-detail">{product.title}</h1>
                        <div className="product-rating">
                            <span className="rating-badge">{product.rating?.rate ?? '4.0'} <i className="fas fa-star"></i></span>
                            <span className="rating-count">({product.rating?.count ?? 0} ratings)</span>
                        </div>
                        <div className="product-pricing">
                            <span className="current-price-detail">{utils.formatPrice(utils.usdToInr(product.price))}</span>
                        </div>
                        <p className="product-description">{product.description}</p>
                        <div className="action-buttons">
                            <button className="btn btn-add-cart" onClick={handleAddToCart}>
                                <i className="fas fa-shopping-cart"></i> ADD TO CART
                            </button>
                            <button className="btn btn-buy-now" onClick={handleBuyNow}>
                                <i className="fas fa-bolt"></i> BUY NOW
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;