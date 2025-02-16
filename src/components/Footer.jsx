import React from 'react';
import './Footer.css';

const Footer = () => (
    <footer className="footer">
        <div className="container">
            <p>&copy; {new Date().getFullYear()} Dog Walker. All rights reserved.</p>
        </div>
    </footer>
)

export default Footer;
