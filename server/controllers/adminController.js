const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const bcrypt = require('bcryptjs');

// No need to check admin role in each function since we'll use middleware

const adminController = {
  // User management controllers
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({ role: { $ne: 'admin' } }).select('-password');
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
  },
  
  getDogOwners: async (req, res) => {
    try {
      const dogOwners = await User.find({ role: 'dogowner' }).select('-password');
      res.status(200).json(dogOwners);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching dog owners', error: error.message });
    }
  },
  
  getDogWalkers: async (req, res) => {
    try {
      const dogWalkers = await User.find({ role: 'dogwalker' }).select('-password');
      res.status(200).json(dogWalkers);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching dog walkers', error: error.message });
    }
  },
  
  createUser: async (req, res) => {
    try {
      const { email, password, role } = req.body;
      
      // Check if user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }
      
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      // Create new user
      const newUser = new User({
        ...req.body,
        password: hashedPassword,
        isApproved: true // Admin-created users are auto-approved
      });
      
      await newUser.save();
      
      const userResponse = { ...newUser._doc };
      delete userResponse.password;
      
      res.status(201).json(userResponse);
    } catch (error) {
      res.status(500).json({ message: 'Error creating user', error: error.message });
    }
  },
  
  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      // Don't allow role change to admin through this endpoint
      if (updates.role === 'admin') {
        return res.status(403).json({ message: 'Cannot update user to admin role' });
      }
      
      // Hash password if it's being updated
      if (updates.password) {
        const salt = await bcrypt.genSalt(10);
        updates.password = await bcrypt.hash(updates.password, salt);
      }
      
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $set: updates },
        { new: true }
      ).select('-password');
      
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Error updating user', error: error.message });
    }
  },
  
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      
      // Check if user exists
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Delete associated bookings
      await Booking.deleteMany({ 
        $or: [
          { dogOwner: id },
          { dogWalker: id }
        ]
      });
      
      // Delete the user
      await User.findByIdAndDelete(id);
      
      res.status(200).json({ message: 'User and associated bookings deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
  },
  
  
  
  // Booking management controllers
  getAllBookings: async (req, res) => {
    try {
      const bookings = await Booking.find()
        .populate('dogOwner', 'fullName email')
        .populate('dogWalker', 'fullName email');
      
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching bookings', error: error.message });
    }
  },
  
  updateBooking: async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const updatedBooking = await Booking.findByIdAndUpdate(
        id,
        { $set: updates },
        { new: true }
      )
        .populate('dogOwner', 'fullName email')
        .populate('dogWalker', 'fullName email');
      
      if (!updatedBooking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
      
      res.status(200).json(updatedBooking);
    } catch (error) {
      res.status(500).json({ message: 'Error updating booking', error: error.message });
    }
  },
  
  deleteBooking: async (req, res) => {
    try {
      const { id } = req.params;
      
      const booking = await Booking.findByIdAndDelete(id);
      
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
      
      res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting booking', error: error.message });
    }
  },
  
  // Dashboard statistics
  getDashboardStats: async (req, res) => {
    try {
      const totalDogOwners = await User.countDocuments({ role: 'dogowner' });
      const totalDogWalkers = await User.countDocuments({ role: 'dogwalker' });
      const pendingDogOwners = await User.countDocuments({ role: 'dogowner', isApproved: false });
      const pendingDogWalkers = await User.countDocuments({ role: 'dogwalker', isApproved: false });
      const totalBookings = await Booking.countDocuments();
      const pendingBookings = await Booking.countDocuments({ status: 'pending' });
      const completedBookings = await Booking.countDocuments({ status: 'completed' });
      
      // Get recent bookings
      const recentBookings = await Booking.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('dogOwner', 'fullName')
        .populate('dogWalker', 'fullName');
      
      // Get recent users
      const recentUsers = await User.find({ role: { $ne: 'admin' } })
        .sort({ createdAt: -1 })
        .limit(5)
        .select('fullName email role isApproved createdAt');
      
      res.status(200).json({
        users: {
          totalDogOwners,
          totalDogWalkers,
          pendingDogOwners,
          pendingDogWalkers
        },
        bookings: {
          total: totalBookings,
          pending: pendingBookings,
          completed: completedBookings
        },
        recent: {
          bookings: recentBookings,
          users: recentUsers
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching dashboard stats', error: error.message });
    }
  }
};

module.exports = adminController;