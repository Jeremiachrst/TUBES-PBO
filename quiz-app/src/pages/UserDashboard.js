import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserDashboard = () => {
    const [name, setName] = useState('');
    const [quizzes, setQuizzes] = useState([]);
    const [quizResults, setQuizResults] = useState([]); // State untuk menyimpan hasil quiz
    const navigate = useNavigate();

    useEffect(() => {
        const storedNim = localStorage.getItem('nim');
        if (storedNim) {
            // Ambil nama pengguna berdasarkan NIM
            axios
                .get(`http://localhost:8080/api/participant/get-user-name/${storedNim}`)
                .then((response) => {
                    if (response.data && response.data.name) {
                        console.log('Nama pengguna diterima:', response.data.name);
                        setName(response.data.name); // Set nama pengguna berdasarkan data dari API
                    } else {
                        console.error('Nama tidak ditemukan dalam respons');
                        setName('User'); // Set default nama jika tidak ada nama
                    }
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                    setName('User'); // Jika terjadi error, tampilkan 'User'
                });

            // Ambil daftar quiz yang tersedia
            axios
                .get('http://localhost:8080/api/quiz/get-available-quizzes')
                .then((response) => {
                    setQuizzes(response.data); // Set daftar quiz yang tersedia dari API
                })
                .catch((error) => {
                    console.error('Error fetching quiz data:', error);
                    setQuizzes([]); // Jika terjadi error, tampilkan daftar kosong
                });

            // Ambil hasil quiz yang telah dikerjakan oleh pengguna
            axios
                .get(`http://localhost:8080/api/quiz/results/${storedNim}`)
                .then((response) => {
                    setQuizResults(response.data); // Set hasil quiz yang sudah diikuti
                })
                .catch((error) => {
                    console.error('Error fetching quiz results:', error);
                    setQuizResults([]); // Jika terjadi error, tampilkan hasil kosong
                });
        } else {
            navigate('/'); // Jika tidak ada nim, kembali ke halaman login
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('nim');
        navigate('/'); // Redirect ke halaman login setelah logout
    };

    const handleAttemptQuiz = (quizName) => {
        // Mengarahkan ke halaman quiz yang dipilih
        navigate(`/quiz/${quizName}`);
    };

    const handleViewScore = (quizName) => {
        const result = quizResults.find(result => result.quiz === quizName);
        alert(`Score for ${quizName}: ${result ? result.score : 'Not attempted'}`);
    };

    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>Hello, {name}</h1>
            <p style={welcomeTextStyle}>Welcome to your Dashboard</p>
            <div style={quizListStyle}>
                {quizzes.length > 0 ? (
                    quizzes.map((quiz, index) => (
                        <div key={index} style={quizItemStyle}>
                            <div style={quizButtonContainerStyle}>
                                <button
                                    onClick={() => handleAttemptQuiz(quiz.name)}
                                    style={quizButtonStyle}
                                >
                                    {quiz.name}
                                </button>
                                <div style={scoreContainerStyle}>
                                    <button
                                        onClick={() => handleViewScore(quiz.name)}
                                        style={scoreButtonStyle}
                                    >
                                        View Score
                                    </button>
                                    <p style={scoreTextStyle}>
                                        {quizResults.length > 0 && (
                                            quizResults.find(result => result.quiz === quiz.name) 
                                                ? `Score: ${quizResults.find(result => result.quiz === quiz.name).score}`
                                                : 'Not attempted'
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No quizzes available.</p>
                )}
            </div>
            <button onClick={handleLogout} style={logoutButtonStyle}>Logout</button>
        </div>
    );
};

const containerStyle = {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
    fontFamily: '"Arial", sans-serif',
};

const headerStyle = {
    fontSize: '24px',
    color: '#333',
};

const welcomeTextStyle = {
    margin: '20px 0',
    fontSize: '18px',
    color: '#555',
};

const quizListStyle = {
    marginBottom: '20px',
};

const quizItemStyle = {
    marginBottom: '10px',
};

const quizButtonContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
};

const quizButtonStyle = {
    display: 'block',
    width: '70%',
    padding: '12px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#28a745',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
};

const scoreContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: '25%',
};

const scoreButtonStyle = {
    padding: '8px 15px',
    fontSize: '14px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '5px',
    transition: 'background-color 0.3s',
};

const scoreTextStyle = {
    fontSize: '14px',
    color: '#333',
    marginTop: '5px',
    padding: '5px',
    border: '1px solid #007bff',
    borderRadius: '4px',
    backgroundColor: '#f0f8ff',
};

const logoutButtonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#dc3545',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
};

export default UserDashboard;
