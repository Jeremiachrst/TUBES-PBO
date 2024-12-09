import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterParticipant = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [nim, setNim] = useState(''); // State untuk NIM
    const [error, setError] = useState(''); // State untuk menampilkan error
    const navigate = useNavigate(); // Hook untuk navigasi

    // Fungsi untuk mengecek apakah NIM sudah terdaftar
    const checkNimAvailability = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/participant/check-nim', {
                nim: nim
            });
            return response.data.status === 'success'; // NIM tersedia jika status success
        } catch (error) {
            console.error(error);
            return false; // Jika ada error, anggap NIM tidak tersedia
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Cek apakah NIM sudah terdaftar
        const isNimAvailable = await checkNimAvailability();
        if (!isNimAvailable) {
            setError('NIM sudah terdaftar. Silakan gunakan NIM lain.');
            return; // Jika NIM sudah terdaftar, hentikan proses
        }
        
        // Kirim data jika NIM tersedia
        try {
            const response = await axios.post('http://localhost:8080/api/participant/register', {
                name,
                email,
                nim, // NIM ditambahkan ke body request
            });
            alert('Registration successful!'); // Tampilkan pesan sukses
            console.log(response.data); // Debugging
            navigate('/'); // Redirect ke Home setelah registrasi berhasil
        } catch (error) {
            alert('Registration failed. Please try again.'); // Tampilkan pesan gagal
            console.error(error);
        }
    };

    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>Register as Participant</h1>
            <form onSubmit={handleSubmit} style={formStyle}>
                <div style={inputGroupStyle}>
                    <label htmlFor="name" style={labelStyle}>Name:</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={inputStyle}
                    />
                </div>
                <div style={inputGroupStyle}>
                    <label htmlFor="email" style={labelStyle}>Email:</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={inputStyle}
                    />
                </div>
                <div style={inputGroupStyle}>
                    <label htmlFor="nim" style={labelStyle}>NIM:</label>
                    <input
                        id="nim"
                        type="text"
                        value={nim}
                        onChange={(e) => setNim(e.target.value)} // Mengatur nilai NIM
                        required
                        style={inputStyle}
                    />
                </div>
                {error && <p style={errorStyle}>{error}</p>} {/* Menampilkan pesan error */}
                <button type="submit" style={buttonStyle}>Register</button>
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
    marginBottom: '10px',
};

export default RegisterParticipant;
