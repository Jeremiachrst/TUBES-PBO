import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ParticipantRegister from './pages/ParticipantRegister';
import Quiz from './pages/Quiz';
import Leaderboard from './pages/Leaderboard';
import AdminRoute from './components/AdminRoute';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard.js';
import QuizPage from './pages/QuizPage';
import { useParams } from 'react-router-dom';

const QuizPageWrapper = () => {
    const { quizName } = useParams();
    const peserta = localStorage.getItem('nim'); // Ambil NIM peserta dari localStorage
    return <QuizPage quizName={decodeURIComponent(quizName)} peserta={peserta} />;
};

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<ParticipantRegister />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/user-dashboard" element={<UserDashboard />} />
                <Route path="/quiz/:quizName" element={<QuizPageWrapper />} />
                <Route
                    path="/admin-dashboard"
                    element={
                        <AdminRoute>
                            <AdminDashboard />
                        </AdminRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
