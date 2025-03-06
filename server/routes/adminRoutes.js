const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const verifyToken = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/roleMiddleware');

// Apply verifyToken middleware to all admin routes
router.use(verifyToken);

// Apply authorizeRoles middleware with 'admin' role to all admin routes
router.use(authorizeRoles('admin'));

// User management routes
router.get('/users', adminController.getAllUsers);
router.get('/users/dog-owners', adminController.getDogOwners);
router.get('/users/dog-walkers', adminController.getDogWalkers);
router.post('/users', adminController.createUser);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);


// Booking management routes
router.get('/bookings', adminController.getAllBookings);
router.put('/bookings/:id', adminController.updateBooking);
router.delete('/bookings/:id', adminController.deleteBooking);

// Dashboard statistics
router.get('/dashboard/stats', adminController.getDashboardStats);

module.exports = router;