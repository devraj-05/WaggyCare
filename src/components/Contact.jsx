import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Form submitted:', formData);
        alert('Thank you for your message! We will get back to you soon.');
    };

    return (
        <div className="contact-container">
            {/* Hero Section */}
            <div className="contact-hero">
                <h1>Get in Touch</h1>
                <p>We're here to help with all your dog walking needs</p>
            </div>

            <div className="contact-content">
                {/* Contact Information */}
                <div className="contact-info">
                    <div className="info-card">
                        <div className="info-icon">📞</div>
                        <h3>Call Us</h3>
                        <p>9265725713</p>
                        <p className="availability">Available 7am - 8pm</p>
                    </div>

                    <div className="info-card">
                        <div className="info-icon">✉️</div>
                        <h3>Email Us</h3>
                        <p>trivediparth92657@gmail.com</p>
                        <p className="availability">24/7 support</p>
                    </div>

                    <div className="info-card">
                        <div className="info-icon">📍</div>
                        <h3>Visit Us</h3>
                        <p>123 Paw Street</p>
                        <p>Dog City, DC 12345</p>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="form-section">
                    <h2>Send Us a Message</h2>
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="phone">Phone (Optional)</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <select
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                >
                                    <option value="General Inquiry">General Inquiry</option>
                                    <option value="Service Booking">Service Booking</option>
                                    <option value="Pricing Question">Pricing Question</option>
                                    <option value="Feedback">Feedback</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="5"
                                required
                            ></textarea>
                        </div>

                        <button type="submit" className="submit-button">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="faq-section">
                <h2>Frequently Asked Questions</h2>
                <div className="faq-grid">
                    <div className="faq-item">
                        <h3>What areas do you serve?</h3>
                        <p>We currently serve the entire Dog City metropolitan area and surrounding suburbs.</p>
                    </div>
                    <div className="faq-item">
                        <h3>How do I schedule a walk?</h3>
                        <p>You can book through our website, mobile app, or give us a call directly.</p>
                    </div>
                    <div className="faq-item">
                        <h3>What's your cancellation policy?</h3>
                        <p>We require 24-hour notice for cancellations to avoid any charges.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;