import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div style={containerStyle}>
            <header style={headerStyle}>
                <h1>Welcome to the Quiz App</h1>
                <p>Challenge yourself and compete for the top spot!</p>
            </header>

            <main style={mainStyle}>
                <Link to="/register">
                    <button style={buttonStyle}>Register as Participant</button>
                </Link>
                <Link to="/quiz">
                    <button style={buttonStyle}>Start Quiz</button>
                </Link>
                <Link to="/leaderboard">
                    <button style={buttonStyle}>View Leaderboard</button>
                </Link>
                <Link to="/admin-login">
                    <button style={adminButtonStyle}>Admin Login</button>
                </Link>
            </main>

            <footer style={footerStyle}>
                <p>&copy; 2024 Quiz App. All rights reserved.</p>
            </footer>
        </div>
    );
};

// CSS-in-JS styles
const containerStyle = {
    textAlign: 'center',
    fontFamily: '"Arial", sans-serif',
    margin: '0 auto',
    padding: '20px',
    maxWidth: '600px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
};

const headerStyle = {
    marginBottom: '20px',
    color: '#333',
};

const mainStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const buttonStyle = {
    margin: '10px',
    padding: '15px 30px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
};

const adminButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#FF5733',
};

const footerStyle = {
    marginTop: '30px',
    color: '#666',
    fontSize: '14px',
};

export default Home;
