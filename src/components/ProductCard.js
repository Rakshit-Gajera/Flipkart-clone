// src/components/ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
      <div className="product-card">
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.title} loading="lazy" />
          <div className="product-title">{product.title}</div>
          <div className="product-price">₹{Math.round(product.price * 80)}</div> {/* Basic price conversion */}
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;