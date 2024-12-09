import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
        alert('Unauthorized access. Redirecting to login.');
        return <Navigate to="/admin-login" />;
    }
    return children;
};

export default AdminRoute;
