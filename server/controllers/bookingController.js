const Booking = require("../models/bookingModel");
const User = require("../models/userModel");

const bookingController = {
    createBooking : async (req, res) => {
    try {
        const { dogOwner, dogWalker, startTime, endTime, location, price, notes } = req.body;
        console.log(req.body);
        
        // Verify that both users exist and are approved
        const ownerExists = await User.findOne({ _id: dogOwner, role: 'dogowner', isApproved: true });
        if (!ownerExists) {
            return res.status(404).json({ message: "Dog owner not found or not approved" });
        }
        
        const walkerExists = await User.findOne({ _id: dogWalker, role: 'dogwalker', isApproved: true });
        if (!walkerExists) {
            return res.status(404).json({ message: "Dog walker not found or not approved" });
        }
        
        // Create new booking
        const newBooking = new Booking({
            dogOwner,
            dogWalker,
            startTime,
            endTime,
            location,
            price,
            notes,
            status: 'pending'
        });
        
        const booking = await newBooking.save();
        console.log(booking);
        
        res.status(201).json(booking);
    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ message: error.message });
    }
 },

    getBookings : async (req, res) => {
    try {
        // Using req.user from auth middleware
        const userId = req.user.id;
        const userRole = req.user.role;
        const { status } = req.query;
        
        let filter = {};
        
        // Filter bookings based on user role from auth token
        if (userId && userRole) {
            if (userRole === 'dogowner') {
                filter.dogOwner = userId;
            } else if (userRole === 'dogwalker') {
                filter.dogWalker = userId;
            }
            // Admin can see all bookings
        }
        
        // Filter by status if provided
        if (status) {
            filter.status = status;
        }
        
        const bookings = await Booking.find(filter)
            .populate('dogOwner', 'fullName email phone')
            .populate('dogWalker', 'fullName email phone')
            .sort({ startTime: 1 });
            
        res.status(200).json(bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ message: error.message });
    }
 },

     getBookingById : async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id; // From auth middleware
        const userRole = req.user.role; // From auth middleware
        
        const booking = await Booking.findById(id)
            .populate('dogOwner', 'fullName email phone address')
            .populate('dogWalker', 'fullName email phone bio');
            
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        
        // Check if user has permission to view this booking
        const isOwner = booking.dogOwner.toString() === userId;
        const isWalker = booking.dogWalker.toString() === userId;
        const isAdmin = userRole === 'admin';
        
        if (!isOwner && !isWalker && !isAdmin) {
            return res.status(403).json({ message: "Not authorized to view this booking" });
        }
        
        res.status(200).json(booking);
    } catch (error) {
        console.error("Error fetching booking:", error);
        res.status(500).json({ message: error.message });
    }
 },

     updateBooking : async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const userId = req.user.id; // From auth middleware
        const userRole = req.user.role; // From auth middleware
        
        // Find the booking
        const booking = await Booking.findById(id);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        
        // Check if user has permission to update this booking
        const isOwner = booking.dogOwner.toString() === userId;
        const isWalker = booking.dogWalker.toString() === userId;
        const isAdmin = userRole === 'admin';
        
        if (!isOwner && !isWalker && !isAdmin) {
            return res.status(403).json({ message: "Not authorized to update this booking" });
        }
        
        // Limit what regular users can update
        if (!isAdmin) {
            // Dog owners can only cancel their bookings
            if (isOwner && updates.status && updates.status !== 'cancelled') {
                return res.status(403).json({ message: "Dog owners can only cancel bookings" });
            }
            
            // Dog walkers can only update to confirmed, in-progress, or completed
            if (isWalker && updates.status && 
                !['confirmed', 'in-progress', 'completed'].includes(updates.status)) {
                return res.status(403).json({ message: "Invalid status update for dog walker" });
            }
            
            // Remove fields that users shouldn't be able to update
            delete updates.dogOwner;
            delete updates.dogWalker;
            delete updates.price;
        }
        
        const updatedBooking = await Booking.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true }
        )
            .populate('dogOwner', 'fullName email')
            .populate('dogWalker', 'fullName email');
            
        console.log(`Booking ${id} updated to status: ${updatedBooking.status}`);
        
        res.status(200).json(updatedBooking);
    } catch (error) {
        console.error("Error updating booking:", error);
        res.status(500).json({ message: error.message });
    }
 },

 deleteBooking : async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id; // From auth middleware
        const userRole = req.user.role; // From auth middleware
        
        // Find the booking
        const booking = await Booking.findById(id);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        
        // Only admin or the booking owner can delete
        const isOwner = booking.dogOwner.toString() === userId;
        const isAdmin = userRole === 'admin';
        
        if (!isOwner && !isAdmin) {
            return res.status(403).json({ message: "Not authorized to delete this booking" });
        }
        
        await Booking.findByIdAndDelete(id);
        console.log(`Booking ${id} deleted`);
        
        res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
        console.error("Error deleting booking:", error);
        res.status(500).json({ message: error.message });
    }
 }
};


module.exports = bookingController;