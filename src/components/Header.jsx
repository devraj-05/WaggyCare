import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <h1 className="heading-tag">ABC</h1>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/services">Services</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/loginpage" className="signup-btn">SignUp</Link> 
                </nav>
            </div>
        </header>
    )
}

export default Header;
