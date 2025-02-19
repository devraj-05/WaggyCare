import React from 'react';
import './Services.css';
import { Navigate, useNavigate } from 'react-router-dom';

const Services = () => {

    const navigate = useNavigate();
    const handleContact = () =>{
        navigate("/contact");
    }
        
    
    const services = [
        {
            title: "Daily Dog Walks",
            description: "Individual attention and exercise tailored to your dog's needs",
            features: ["30-60 minute sessions", "Flexible scheduling", "Real-time updates", "GPS tracked walks"],
            price: "From $25/walk",
            icon: "🦮"
        },
        {
            title: "Group Adventures",
            description: "Socialization and fun with other friendly dogs in the neighborhood",
            features: ["Small groups (max 4 dogs)", "Supervised play", "Social interaction", "Energy release"],
            price: "From $20/walk",
            icon: "👥"
        },
        {
            title: "Puppy Care",
            description: "Special attention and care for your growing puppy",
            features: ["Short, frequent walks", "Basic training", "Potty breaks", "Extra attention"],
            price: "From $30/visit",
            icon: "🐕"
        },
        {
            title: "Dog Sitting",
            description: "In-home care when you're away",
            features: ["Overnight stays", "Feeding & medication", "Regular updates", "Home security"],
            price: "From $50/night",
            icon: "🏠"
        }
    ];

    return (
        <div className="services-container">
            {/* Hero Section */}
            <div className="services-hero">
                <h1>Our Services</h1>
                <p>Professional dog walking and pet care services tailored to your needs</p>
            </div>

            {/* Main Services Grid */}
            <div className="services-grid">
                {services.map((service, index) => (
                    <div className="service-card" key={index}>
                        <div className="service-icon">{service.icon}</div>
                        <h2>{service.title}</h2>
                        <p className="service-description">{service.description}</p>
                        <ul className="service-features">
                            {service.features.map((feature, idx) => (
                                <li key={idx}>{feature}</li>
                            ))}
                        </ul>
                        <div className="service-price">{service.price}</div>
                        <button className="book-button">Book Now</button>
                    </div>
                ))}
            </div>

            {/* Additional Services Info */}
            <div className="additional-info">
                <h2>Why Choose Our Services?</h2>
                <div className="benefits-grid">
                    <div className="benefit-item">
                        <div className="benefit-icon">✓</div>
                        <h3>Licensed & Insured</h3>
                        <p>All our dog walkers are professionally certified</p>
                    </div>
                    <div className="benefit-item">
                        <div className="benefit-icon">📱</div>
                        <h3>Real-Time Updates</h3>
                        <p>Get photos and updates during every visit</p>
                    </div>
                    <div className="benefit-item">
                        <div className="benefit-icon">🔒</div>
                        <h3>Reliable & Safe</h3>
                        <p>Background-checked and trusted professionals</p>
                    </div>
                    <div className="benefit-item">
                        <div className="benefit-icon">⭐</div>
                        <h3>5-Star Service</h3>
                        <p>Consistently highly rated by our clients</p>
                    </div>
                </div>
            </div>

            {/* Contact Section */}
            <div className="contact-section">
                <h2>Have Questions?</h2>
                <p>Contact us to learn more about our services or to schedule a meet-and-greet</p>
                <button className="contact-button" onClick={handleContact}>Contact Us</button>
            </div>
        </div>
    );
};

export default Services;