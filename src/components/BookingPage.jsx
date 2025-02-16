import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./BookingPage.css";

const BookingsPage = ({ notifications, setNotifications }) => {
    const location = useLocation();
    const selectedWalker = location.state?.selectedWalker || null;

    const [bookings, setBookings] = useState([]);
    const [newBooking, setNewBooking] = useState({
        date: "",
        time: "",
        duration: "",
        dogWalker: selectedWalker ? selectedWalker.name : "",
    });

    // Function to add a new notification
    const addNotification = (type, message) => {
        setNotifications((prev) => [...prev, { id: Date.now(), type, message, time: "Just now" }]);
    };

    // Handle booking input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBooking((prev) => ({ ...prev, [name]: value }));
    };

    // Add a new booking and schedule notifications
    const handleAddBooking = () => {
        if (!newBooking.date || !newBooking.time || !newBooking.duration || !newBooking.dogWalker) {
            alert("Please fill in all the fields.");
            return;
        }

        const newBookingEntry = { ...newBooking, id: Date.now() };
        setBookings((prev) => [...prev, newBookingEntry]);
        setNewBooking({ date: "", time: "", duration: "", dogWalker: selectedWalker.name });

        // Send a confirmation notification
        addNotification("Confirmation", `Your booking with ${newBookingEntry.dogWalker} has been confirmed!`);

        // Schedule a reminder 1 hour before booking time
        const bookingDateTime = new Date(`${newBookingEntry.date}T${newBookingEntry.time}`);
        const reminderTime = new Date(bookingDateTime.getTime() - 60 * 60 * 1000); // 1 hour before

        const timeUntilReminder = reminderTime.getTime() - new Date().getTime();
        if (timeUntilReminder > 0) {
            setTimeout(() => {
                addNotification("Reminder", `Reminder: You have a booking with ${newBookingEntry.dogWalker} at ${newBookingEntry.time}.`);
            }, timeUntilReminder);
        }
    };

    return (
        <div className="bookings-page">
            <h1>Booking Management</h1>

            {selectedWalker && (
                <div className="selected-walker">
                    <h2>Booking for {selectedWalker.name}</h2>
                    <p><strong>Bio:</strong> {selectedWalker.bio}</p>
                    <p><strong>Experience:</strong> {selectedWalker.experience}</p>
                    <p><strong>Certifications:</strong> {selectedWalker.certifications}</p>
                    <p><strong>Pricing:</strong> {selectedWalker.pricing}</p>
                    <p><strong>Availability:</strong> {selectedWalker.availability}</p>
                    <p><strong>Rating:</strong> {selectedWalker.rating} ⭐</p>
                </div>
            )}

            <div className="new-booking-form">
                <h2>Book a Dog Walker</h2>
                <input type="date" name="date" value={newBooking.date} onChange={handleInputChange} />
                <input type="time" name="time" value={newBooking.time} onChange={handleInputChange} />
                <select name="duration" value={newBooking.duration} onChange={handleInputChange}>
                    <option value="">Select Duration</option>
                    <option value="30 minutes">30 minutes</option>
                    <option value="1 hour">1 hour</option>
                    <option value="2 hours">2 hours</option>
                </select>
                <input type="text" name="dogWalker" value={newBooking.dogWalker} disabled />

                <button onClick={handleAddBooking}>Add Booking</button>
            </div>

            <div className="upcoming-bookings">
                <h2>Upcoming Bookings</h2>
                {bookings.length === 0 ? (
                    <p>No upcoming bookings.</p>
                ) : (
                    bookings.map((booking) => (
                        <div key={booking.id} className="booking-card">
                            <p><strong>Date:</strong> {booking.date}</p>
                            <p><strong>Time:</strong> {booking.time}</p>
                            <p><strong>Duration:</strong> {booking.duration}</p>
                            <p><strong>Dog Walker:</strong> {booking.dogWalker}</p>
                            <div className="flex flex-col">
                                <Link to="/paymentpage" className="home-button">Proceed to Payment</Link>
                            </div>
                        </div>
                    ))
                )}
            </div>

        
        </div>
    );
};

export default BookingsPage;
