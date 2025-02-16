import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const RegisterPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("DogOwner")
    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault()

        // Mock registration logic
        console.log({ email, password, role })
        alert("Registered successfully!")
        navigate("/loginpage")
    }

    return (
        <div className="auth-container">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label>Role:</label>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="DogWalker">Dog Walker</option>
                    <option value="DogOwner">Dog Owner</option>
                </select>
                <button type="submit">Register</button>
            </form>
            <p>
                Already have an account? <a href="/loginpage">Login</a>
            </p>
        </div>
    )
}

export default RegisterPage;
