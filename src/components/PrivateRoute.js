import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';

// Extend the PrivateRoute to include role-based access control
const PrivateRoute = ({ children, allowedRoles }) => {
    const isAuthenticated = sessionStorage.getItem('authToken'); // Check if user is authenticated
    const userRole = sessionStorage.getItem('userRole'); // Retrieve the user role from sessionStorage

    // Check both authentication and if the user role is among the allowed roles for this route
    if (isAuthenticated && (!allowedRoles || allowedRoles.includes(userRole))) {
        return children;
    } else {
        return <Navigate to="/login" />;
    }
};

export default PrivateRoute;
