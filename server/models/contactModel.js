const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        trim: true,
        maxlength: 100 
    },
    email: { 
        type: String, 
        required: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    phone: { 
        type: String, 
        trim: true,
        match: [/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, 'Please fill a valid phone number']
    },
    subject: { 
        type: String, 
        enum: ['General Inquiry', 'Service Booking', 'Pricing Question', 'Feedback'],
        default: 'General Inquiry'
    },
    message: { 
        type: String, 
        required: true,
        trim: true,
        maxlength: 1000 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    status: {
        type: String,
        enum: ['New', 'Reviewed', 'Closed'],
        default: 'New'
    }
});

module.exports = mongoose.model('contactModel', ContactSchema);