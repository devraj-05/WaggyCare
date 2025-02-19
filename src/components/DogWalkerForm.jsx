import React, { useState } from 'react';
import './DogWalkerForm.css';

const DogWalkerForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    photo: '/images/default.jpg',
    bio: '',
    experience: '',
    certifications: '',
    pricing: '',
    availability: '',
    rating: 0,
    specialties: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSpecialtiesChange = (e) => {
    const specialties = e.target.value.split(',').map(s => s.trim());
    setFormData(prev => ({
      ...prev,
      specialties
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <h2 className="form-title">
          {initialData ? 'Edit Dog Walker Profile' : 'Create Dog Walker Profile'}
        </h2>
        <form onSubmit={handleSubmit} className="walker-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter full name"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              required
              placeholder="Enter your bio and experience description"
              className="form-textarea"
            />
          </div>

          <div className="form-group">
            <label htmlFor="experience">Experience (years)</label>
            <input
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              placeholder="e.g., 5 years"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="certifications">Certifications</label>
            <input
              id="certifications"
              name="certifications"
              value={formData.certifications}
              onChange={handleChange}
              required
              placeholder="e.g., Pet First Aid Certified"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="pricing">Pricing (per hour)</label>
            <input
              id="pricing"
              name="pricing"
              value={formData.pricing}
              onChange={handleChange}
              required
              placeholder="e.g., $20/hr"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="availability">Availability</label>
            <input
              id="availability"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              required
              placeholder="e.g., Weekdays"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="rating">Rating (0-5)</label>
            <input
              id="rating"
              name="rating"
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={formData.rating}
              onChange={handleChange}
              required
              placeholder="Enter rating"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="specialties">Specialties (comma-separated)</label>
            <input
              id="specialties"
              name="specialties"
              value={formData.specialties.join(', ')}
              onChange={handleSpecialtiesChange}
              required
              placeholder="e.g., Large dogs, High-energy dogs"
              className="form-input"
            />
          </div>

          <button type="submit" className="submit-button">
            {initialData ? 'Update Profile' : 'Create Profile'}
          </button>
        </form>
      </div>
      
    </div>
  );
};

export default DogWalkerForm;