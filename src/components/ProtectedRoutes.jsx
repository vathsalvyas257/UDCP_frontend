import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoutes = ({ children }) => {
    const token = localStorage.getItem("token"); // Get token from cookies

    if (!token) {
        return <Navigate to="/auth" replace />; // Correct way to redirect
    }

    return children; // Render protected content if authenticated
};

export default ProtectedRoutes;
