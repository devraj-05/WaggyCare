import React from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const LoginPage = () => {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        navigate("/")
    };

    const navigateToRegister = () => {
        navigate("/registerpage"); // Navigate to register page
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <label>Email:</label>
                <input type="email" required />
                <label>Password:</label>
                <input type="password" required />
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? 
                <span 
                    onClick={navigateToRegister} 
                    style={{ cursor: 'pointer', color: 'blue', marginLeft: '5px' }}
                >
                    Register
                </span>
            </p>
        </div>
    );
};

export default LoginPage;