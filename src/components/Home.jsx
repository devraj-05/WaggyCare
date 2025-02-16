import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-card">
        <h1>Welcome to WaggyCare 🐾</h1>
        <p>Your trusted service for happy, healthy dogs.</p>
        <div className="home-links">
          <Link to="/dogwalkerspage" className="home-button">
            Find Dog Walkers
          </Link>
          <br></br>
          <br></br>
          <Link to="/dogWalkerForm" className="home-button">
            Add Dog Walker 
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home;
