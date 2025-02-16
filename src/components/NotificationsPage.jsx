import React, { useState, useEffect } from "react";
import "./NotificationsPage.css";

const NotificationsPage = () => {
    const [notifications, setNotifications] = useState([])

    // Simulate receiving real-time notifications
    useEffect(() => {
        const mockNotifications = [
            {
                id: 1,
                type: "Confirmation",
                message: "Your booking with John the Dog Walker has been confirmed!",
                time: "2 minutes ago",
            },
            {
                id: 2,
                type: "Reminder",
                message: "Reminder: You have a booking tomorrow at 10:00 AM.",
                time: "1 hour ago",
            },
        ]

        const fetchNotifications = () => {
            setNotifications((prev) => [...mockNotifications, ...prev])
        }

        // Simulating notifications being pushed every 5 seconds
        const interval = setInterval(fetchNotifications, 5000)

        return () => clearInterval(interval); // Cleanup
    }, [])

    const clearNotifications = () => {
        setNotifications([]);
    }

    return (
        <div className="notifications-page">
            <h1>Real-Time Notifications</h1>

            <button className="clear-btn" onClick={clearNotifications}>
                Clear All Notifications
            </button>

            <div className="notifications-list">
                {notifications.length === 0 ? (
                    <p>No notifications at the moment.</p>
                ) : (
                    notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`notification ${notification.type.toLowerCase()}`}
                        >
                            <h3>{notification.type}</h3>
                            <p>{notification.message}</p>
                            <span className="time">{notification.time}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default NotificationsPage;
