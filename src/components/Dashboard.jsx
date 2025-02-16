import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
    const role = localStorage.getItem("userRole")
    console.log(role)
    return (
        <div className="dashboard">
            
            
            <h2>Welcome to the Dashboard</h2>
            <p>Your Role: <strong>{role}</strong></p>
            <p>Access role-specific features here!</p>
        </div>
    )
}

export default Dashboard;
