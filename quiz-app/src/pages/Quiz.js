import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Quiz = () => {
    const [nim, setNim] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(''); // Reset error message
        try {
            const response = await axios.post('http://localhost:8080/api/participant/validate-nim', { nim });
            if (response.data.status === 'success') {
                // Simulasi penyimpanan data nim dan redirect
                localStorage.setItem('nim', nim);
                navigate('/user-dashboard');
            } else {
                setError('NIM not found. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>Quiz Login</h1>
            <form onSubmit={handleLogin} style={formStyle}>
                <div style={inputGroupStyle}>
                    <label htmlFor="nim" style={labelStyle}>Enter NIM:</label>
                    <input
                        id="nim"
                        type="text"
                        value={nim}
                        onChange={(e) => setNim(e.target.value)}
                        required
                        style={inputStyle}
                    />
                </div>
                <button type="submit" style={buttonStyle} disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            {error && <p style={errorStyle}>{error}</p>}
        </div>
    );
};

const containerStyle = {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
    fontFamily: '"Arial", sans-serif',
};

const headerStyle = {
    marginBottom: '20px',
    fontSize: '24px',
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
    fontSize: '14px',
    color: '#555',
};

const inputStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
    boxSizing: 'border-box',
};

const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
};

const errorStyle = {
    color: 'red',
    fontSize: '14px',
    marginTop: '10px',
};

export default Quiz;
