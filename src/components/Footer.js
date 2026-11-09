// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="footer-section">
        <div className="container">
            <div className="row">
                <div className="col-md-2">
                    <h5>ABOUT</h5>
                    <ul className="footer-links">
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Flipkart Stories</a></li>
                    </ul>
                </div>
                <div className="col-md-2">
                    <h5>HELP</h5>
                    <ul className="footer-links">
                        <li><a href="#">Payments</a></li>
                        <li><a href="#">Shipping</a></li>
                        <li><a href="#">Cancellation & Returns</a></li>
                        <li><a href="#">FAQ</a></li>
                    </ul>
                </div>
                <div className="col-md-2">
                    <h5>POLICY</h5>
                    <ul className="footer-links">
                        <li><a href="#">Return Policy</a></li>
                        <li><a href="#">Terms Of Use</a></li>
                        <li><a href="#">Security</a></li>
                        <li><a href="#">Privacy</a></li>
                    </ul>
                </div>
                <div className="col-md-2">
                    <h5>SOCIAL</h5>
                    <ul className="footer-links">
                        <li><a href="#">Facebook</a></li>
                        <li><a href="#">Twitter</a></li>
                        <li><a href="#">YouTube</a></li>
                    </ul>
                </div>
                <div className="col-md-4">
                    <h5>Mail Us</h5>
                    <p>Flipkart Internet Private Limited, Buildings Alyssa, Begonia & Clove Embassy Tech Village, Outer Ring Road, Devarabeesanahalli Village, Bengaluru, 560103, Karnataka, India</p>
                </div>
            </div>
            <hr />
            <div className="text-center">
                <p>&copy; {new Date().getFullYear()} Flipkart Clone. All Rights Reserved.</p>
            </div>
        </div>
    </footer>
  );
};

export default Footer;