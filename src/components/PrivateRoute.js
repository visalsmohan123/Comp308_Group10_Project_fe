import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = sessionStorage.getItem('authToken'); 

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
