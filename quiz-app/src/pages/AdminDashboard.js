import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate(); // Hook untuk navigasi

    const handleLogout = () => {
        localStorage.removeItem('isAdmin'); // Hapus status admin
        alert('Logged out successfully.');
        navigate('/'); // Arahkan ke halaman Home
    };

    return (
        <div style={containerStyle}>
            <h1>Welcome to Admin Dashboard</h1>
            <button onClick={handleLogout} style={buttonStyle}>
                Logout
            </button>
        </div>
    );
};

// CSS-in-JS styles
const containerStyle = {
    textAlign: 'center',
    marginTop: '50px',
    fontFamily: '"Arial", sans-serif',
};

const buttonStyle = {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#FF5733',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
};

export default AdminDashboard;
