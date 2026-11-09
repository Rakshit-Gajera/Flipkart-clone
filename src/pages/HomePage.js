// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productAPI, utils } from '../services/apiService';
import LoadingSpinner from '../components/LoadingSpinner';

const HomePage = () => {
  const [electronics, setElectronics] = useState([]);
  const [fashion, setFashion] = useState([]);
  const [loading, setLoading] = useState(true);

  // This object maps our display names to the actual category names in the API
  const categoryAPIMap = {
    'Top Offers': '',
    'Mobiles': 'electronics',
    'Electronics': 'electronics',
    'Fashion': "women's clothing",
    'Home': 'jewelery',
    'Appliances': 'electronics',
    'Travel': "men's clothing",
    'Beauty, Toys & More': "jewelery",
    'Two Wheelers': 'electronics'
  };

  const categories = [
    { name: 'Top Offers', img: 'https://rukminim1.flixcart.com/flap/128/128/image/f15c02bfeb02d15d.png?q=100' },
    { name: 'Mobiles', img: 'https://rukminim1.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png?q=100' },
    { name: 'Electronics', img: 'https://rukminim1.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100' },
    { name: 'Fashion', img: 'https://rukminim1.flixcart.com/flap/128/128/image/82b3ca5fb2301045.png?q=100' },
    { name: 'Home', img: 'https://rukminim1.flixcart.com/flap/128/128/image/ab7e2b022a4587dd.jpg?q=100' },
    { name: 'Appliances', img: 'https://rukminim1.flixcart.com/fk-p-flap/64/64/image/e90944802d996756.jpg?q=100' },
    { name: 'Travel', img: 'https://rukminim1.flixcart.com/flap/128/128/image/71050627a56b4693.png?q=100' },
    { name: 'Beauty, Toys & More', img: 'https://rukminim1.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png?q=100' },
    { name: 'Two Wheelers', img: 'https://rukminim1.flixcart.com/fk-p-flap/128/128/image/05d708653beff580.png?q=100' }
  ];

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    Promise.all([
      productAPI.getProductsByCategory('electronics').catch(error => {
        console.error('Failed to fetch electronics:', error);
        return [];
      }),
      productAPI.getProductsByCategory('jewelery').catch(error => {
        console.error('Failed to fetch fashion:', error);
        return [];
      })
    ]).then(([electronicsData, fashionData]) => {
      if (isMounted) {
        setElectronics(Array.isArray(electronicsData) ? electronicsData.slice(0, 6) : []);
        setFashion(Array.isArray(fashionData) ? fashionData.slice(0, 6) : []);
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

  const renderProductSection = (title, productData) => (
    <section className="product-section">
        <h2 className="section-title">{title}</h2>
        <div className="product-grid">
          {productData.map(product => (
            <div className="product-card-home" key={product.id}>
              <Link to={`/product/${product.id}`} className="text-decoration-none">
                <div className="product-image-container">
                  <img src={product.image} alt={product.title} />
                </div>
                <div className="product-info-home">
                  <div className="product-title-home">{product.title}</div>
                  <div className="product-price-home">From {utils.formatPrice(utils.usdToInr(product.price))}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
    </section>
  );

  return (
    <div className="home-page">
      <div className="categories-bar">
        <div className="categories-container">
          {categories.map(cat => {
            const apiCategory = categoryAPIMap[cat.name] !== undefined ? categoryAPIMap[cat.name] : cat.name.toLowerCase();
            const targetUrl = apiCategory ? `/products?category=${encodeURIComponent(apiCategory)}` : '/products';
            return (
              <Link to={targetUrl} className="category-item text-decoration-none" key={cat.name}>
                <img src={cat.img} alt={cat.name} />
                <span className="category-name">{cat.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <section className="hero-section">
        <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="https://rukminim1.flixcart.com/fk-p-flap/3240/540/image/8b6ca008fd2f7d2b.jpg?q=60" className="d-block w-100" alt="Banner 1"/>
            </div>
            <div className="carousel-item">
              <img src="https://rukminim1.flixcart.com/fk-p-flap/3240/540/image/b480bd26b3ccc4e6.png?q=60" className="d-block w-100" alt="Banner 2"/>
            </div>
             <div className="carousel-item">
              <img src="https://rukminim1.flixcart.com/fk-p-flap/3240/540/image/0a08b3795f997b1d.jpg?q=60" className="d-block w-100" alt="Banner 3"/>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev"><span className="carousel-control-prev-icon" aria-hidden="true"></span></button>
          <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next"><span className="carousel-control-next-icon" aria-hidden="true"></span></button>
        </div>
      </section>

      {loading ? (
        <LoadingSpinner message="Loading products..." />
      ) : (
        <div className="container-fluid">
          {renderProductSection("Best Of Electronics", electronics)}
          {renderProductSection("Top Deals on Fashion", fashion)}
        </div>
      )}
    </div>
  );
};

export default HomePage;