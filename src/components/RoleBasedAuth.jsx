import { useNavigate } from "react-router-dom";

const RoleBasedAuth = ({ role, children }) => {
    const navigate = useNavigate()
    const storedRole = localStorage.getItem("userRole")

    if (storedRole !== role) {
        navigate("/login")
        return null
    }

    return children
}

export default RoleBasedAuth;
