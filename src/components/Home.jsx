import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-wrapper">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to WaggyCare <span className="paw-emoji">🐾</span></h1>
          <p className="hero-subtitle">Professional Dog Walking & Pet Care Services</p>
          <div className="hero-buttons">
            <Link to="/dogwalkerspage" className="primary-button">
              Find Dog Walkers
            </Link>
            <Link to="/dogWalkerForm" className="secondary-button">
              Become a Walker
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose WaggyCare?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Professional Walkers</h3>
            <p>Vetted, trained, and insured dog walking professionals</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Real-Time Updates</h3>
            <p>Track walks and receive photos of your happy pup</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🗓️</div>
            <h3>Flexible Scheduling</h3>
            <p>Easy booking for one-time or recurring walks</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💝</div>
            <h3>Personalized Care</h3>
            <p>Tailored attention to your dog's unique needs</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Book Your Walk</h3>
            <p>Choose your preferred time and walker</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Meet & Greet</h3>
            <p>Free in-person introduction with your walker</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Regular Updates</h3>
            <p>Get photos and notes during the walk</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Give Your Dog the Best Care?</h2>
          <p>Join thousands of happy dogs and their owners</p>
          <Link to="/dogwalkerspage" className="cta-button">
            Get Started Today
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Pet Parents Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p>"The best dog walking service we've ever used. Our pup loves their walks!"</p>
            <div className="testimonial-author">- Sarah & Max 🐕</div>
          </div>
          <div className="testimonial-card">
            <p>"Reliable, professional, and caring. Couldn't ask for better service!"</p>
            <div className="testimonial-author">- Mike & Luna 🐾</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;