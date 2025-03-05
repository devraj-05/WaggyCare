const express = require('express');
const router = express.Router();
const Contact = require('../models/contactModel'); // We'll create this model

// POST route for contact form submission
router.post('/submit', async (req, res) => {
    try {
        // Destructure form data
        const { name, email, phone, subject, message } = req.body;

        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({ 
                message: 'Name, email, and message are required' 
            });
        }

        // Create new contact submission
        const newContact = new Contact({
            name,
            email,
            phone: phone || '', // Optional field
            subject: subject || 'General Inquiry',
            message
        });

        // Save to database
        await newContact.save();

        // Optional: Send email notification or perform additional processing
        // You could integrate email service here

        res.status(201).json({ 
            message: 'Message received successfully!', 
            contactId: newContact._id 
        });
    } catch (error) {
        console.error('Contact form submission error:', error);
        res.status(500).json({ 
            message: 'Error submitting message', 
            error: error.message 
        });
    }
});

// GET route to retrieve contact submissions (admin use)
router.get('/submissions', async (req, res) => {
    try {
        // Retrieve all contact submissions, sorted by most recent
        const submissions = await Contact.find()
            .sort({ createdAt: -1 })
            .select('-__v'); // Exclude version key

        res.status(200).json(submissions);
    } catch (error) {
        console.error('Error retrieving contact submissions:', error);
        res.status(500).json({ 
            message: 'Unable to retrieve submissions', 
            error: error.message 
        });
    }
});

module.exports = router;