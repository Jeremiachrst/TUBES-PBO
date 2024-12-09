import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [accessCode, setAccessCode] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:8080/api/admin/validate',
                accessCode,
                {
                    headers: { 'Content-Type': 'text/plain' },
                }
            );
            alert(response.data); // Menampilkan pesan sukses
            localStorage.setItem('isAdmin', true); // Simpan status login admin
            navigate('/admin-dashboard'); // Arahkan ke halaman dashboard admin
        } catch (error) {
            alert('Invalid access code. Please try again.');
        }
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div style={containerStyle}>
            <h1 style={titleStyle}>Admin Login</h1>
            <form onSubmit={handleLogin} style={formStyle}>
                <div style={inputGroupStyle}>
                    <label htmlFor="accessCode" style={labelStyle}>
                        Enter Access Code:
                    </label>
                    <div style={passwordContainerStyle}>
                        <input
                            type={isPasswordVisible ? 'text' : 'password'}
                            id="accessCode"
                            value={accessCode}
                            onChange={(e) => setAccessCode(e.target.value)}
                            required
                            style={inputStyle}
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            style={toggleButtonStyle}
                        >
                            {isPasswordVisible ? '🙈' : '👁️'}
                        </button>
                    </div>
                </div>
                <button type="submit" style={submitButtonStyle}>
                    Login
                </button>
            </form>
        </div>
    );
};

// CSS-in-JS Styles
const containerStyle = {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
};

const titleStyle = {
    marginBottom: '20px',
    fontFamily: '"Arial", sans-serif',
    color: '#333',
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
};

const inputGroupStyle = {
    textAlign: 'left',
};

const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
};

const passwordContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
};

const inputStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
};

const toggleButtonStyle = {
    position: 'absolute',
    right: '10px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
};

const submitButtonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
};

export default AdminLogin;
