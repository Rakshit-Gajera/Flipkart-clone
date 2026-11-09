// src/pages/ProductsPage.js
import React, { useState, useEffect, useContext } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { productAPI, utils } from '../services/apiService';
import LoadingSpinner from '../components/LoadingSpinner';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        setLoading(true);

        Promise.all([
            productAPI.getAllProducts().catch(error => {
                console.error("Failed to fetch products:", error);
                return [];
            }),
            productAPI.getCategories().catch(error => {
                console.error("Failed to fetch categories:", error);
                return [];
            })
        ]).then(([productsData, categoriesData]) => {
            if (isMounted) {
                setProducts(Array.isArray(productsData) ? productsData : []);
                setCategories(Array.isArray(categoriesData) ? categoriesData : []);
            }
        }).finally(() => {
            if (isMounted) {
                setLoading(false);
            }
        });

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        let tempProducts = [...products];
        const currentSearch = searchParams.get('search');
        const currentCategory = searchParams.get('category');

        if (currentSearch) {
            tempProducts = tempProducts.filter(p =>
                p.title && p.title.toLowerCase().includes(currentSearch.toLowerCase())
            );
        } else if (currentCategory) {
            tempProducts = tempProducts.filter(p => 
                p.category && p.category.toLowerCase() === currentCategory.toLowerCase()
            );
        }

        setFilteredProducts(tempProducts);
    }, [searchParams, products]);

    const handleFilterChange = (e) => {
        const newCategory = e.target.value;
        navigate(`/products?category=${newCategory}`);
    };

    const handleBuyNow = (product) => {
        addToCart(product);
        navigate('/cart');
    };
    
    const pageTitle = searchParams.get('search') 
        ? `Search results for "${searchParams.get('search')}"` 
        : searchParams.get('category') || 'Products';

    if (loading) return <LoadingSpinner message="Loading products..." />;

    return (
        <div className="container mt-4">
            <div className="breadcrumb-section bg-white p-3 mb-3">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item active text-capitalize" aria-current="page">
                           {pageTitle}
                        </li>
                    </ol>
                </nav>
            </div>

            <div className="row">
                <div className="col-lg-3 col-md-4">
                   <div className="filters-section">
                        <div className="filter-header">
                            <h5>Filters</h5>
                        </div>
                        <div className="filter-group">
                            <div className="filter-title">CATEGORIES</div>
                            <div className="filter-options">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="category"
                                        id="all-categories"
                                        value=""
                                        checked={!searchParams.get('category')}
                                        onChange={() => navigate('/products')}
                                    />
                                    <label className="form-check-label" htmlFor="all-categories">All Products</label>
                                </div>
                                {categories.map(cat => (
                                    <div className="form-check" key={cat}>
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="category"
                                            id={cat}
                                            value={cat}
                                            checked={searchParams.get('category')?.toLowerCase() === cat.toLowerCase()}
                                            onChange={handleFilterChange}
                                        />
                                        <label className="form-check-label text-capitalize" htmlFor={cat}>{cat}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                   </div>
                </div>

                <div className="col-lg-9 col-md-8">
                    <div className="sort-section d-flex justify-content-between align-items-center mb-3 p-3 bg-white">
                        <div>Showing 1 – {filteredProducts.length} of {filteredProducts.length} results</div>
                    </div>

                    <div className="products-grid">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map(product => {
                               const originalPrice = utils.usdToInr(product.price * 1.15);
                               const currentPrice = utils.usdToInr(product.price);
                               const discount = 15;
                               return (
                               <div className="product-card h-100" key={product.id}>
                                   <Link to={`/product/${product.id}`} className="text-decoration-none">
                                       <img src={product.image} alt={product.title} className="product-image"/>
                                       <div className="product-info">
                                           <div className="product-title">{product.title}</div>
                                           <div className="product-rating">
                                                <span className="rating-badge">
                                                    {product.rating?.rate ?? '4.0'} <i className="fas fa-star fa-xs"></i>
                                                </span>
                                                <span className="rating-count">({product.rating?.count ?? 0})</span>
                                           </div>
                                           <div className="product-price">
                                               <span className="current-price">{utils.formatPrice(currentPrice)}</span>
                                               <span className="original-price">{utils.formatPrice(originalPrice)}</span>
                                               <span className="discount-percent">{discount}% off</span>
                                           </div>
                                       </div>
                                   </Link>
                                   <div className="product-actions mt-auto">
                                       <button className="btn btn-add-cart w-100 mb-2" onClick={() => addToCart(product)}>
                                           Add to Cart
                                       </button>
                                       <button className="btn btn-buy-now w-100" onClick={() => handleBuyNow(product)}>
                                           Buy Now
                                       </button>
                                   </div>
                               </div>
                               );
                            })
                        ) : (
                            <div className="text-center w-100 p-5">
                                <h4>No products found.</h4>
                                <p>This category may not have products in our demo API.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;