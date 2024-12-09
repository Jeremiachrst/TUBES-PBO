import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const QuizPage = ({ quizName, peserta }) => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Menyimpan soal yang sedang ditampilkan
    const navigate = useNavigate();

    useEffect(() => {
        // Mengambil soal berdasarkan nama quiz
        axios.get(`http://localhost:8080/api/quiz/questions/${quizName}`)
            .then(response => {
                setQuestions(response.data);
            })
            .catch(error => console.error('Error fetching questions:', error));
    }, [quizName]);

    const handleAnswerChange = (questionId, answer) => {
        // Update jawaban hanya untuk soal yang sedang aktif
        setAnswers({ ...answers, [questionId]: answer });
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            // Reset jawaban untuk soal sebelumnya
            setAnswers(prevAnswers => {
                const updatedAnswers = { ...prevAnswers };
                delete updatedAnswers[questions[currentQuestionIndex].id]; // Menghapus jawaban soal sebelumnya
                return updatedAnswers;
            });
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            // Reset jawaban untuk soal sebelumnya
            setAnswers(prevAnswers => {
                const updatedAnswers = { ...prevAnswers };
                delete updatedAnswers[questions[currentQuestionIndex].id]; // Menghapus jawaban soal sebelumnya
                return updatedAnswers;
            });
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmit = () => {
        // Menghitung score berdasarkan jawaban
        let newScore = 0;
        questions.forEach(question => {
            if (answers[question.id] === question.correctAnswer) {
                newScore += 1; // Tambah 1 poin jika jawabannya benar
            }
        });
        setScore(newScore);

        // Mengirimkan hasil ke backend
        const result = { peserta: peserta, quiz: quizName, score: newScore };
        axios.post('http://localhost:8080/api/quiz/submit', result)
            .then(response => alert('Quiz submitted successfully!'))
            .catch(error => console.error('Error submitting quiz:', error));

        // Redirect kembali ke halaman dashboard setelah submit
        navigate('/user-dashboard');
    };

    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>{quizName}</h1>
            {questions.length === 0 ? (
                <p>Loading questions...</p>
            ) : (
                <div>
                    {/* Tampilkan soal yang sesuai dengan currentQuestionIndex */}
                    <div style={questionContainerStyle}>
                        <p style={questionTextStyle}>{questions[currentQuestionIndex].questionText}</p>
                        <div style={optionsContainerStyle}>
                            {['A', 'B', 'C', 'D'].map((option) => (
                                <label key={option} style={optionLabelStyle}>
                                    <input
                                        type="radio"
                                        name={questions[currentQuestionIndex].id}
                                        value={option}
                                        onChange={() => handleAnswerChange(questions[currentQuestionIndex].id, option)}
                                        checked={answers[questions[currentQuestionIndex].id] === option}
                                        style={inputStyle}
                                    />
                                    {questions[currentQuestionIndex][`option${option}`]}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Navigasi soal */}
                    <div style={navigationContainerStyle}>
                        <button
                            onClick={handlePrevious}
                            style={navigationButtonStyle}
                            disabled={currentQuestionIndex === 0}
                        >
                            Previous
                        </button>
                        <button
                            onClick={handleNext}
                            style={navigationButtonStyle}
                            disabled={currentQuestionIndex === questions.length - 1}
                        >
                            Next
                        </button>
                    </div>

                    {/* Tombol Submit hanya muncul pada soal terakhir */}
                    {currentQuestionIndex === questions.length - 1 && (
                        <div style={submitContainerStyle}>
                            <button onClick={handleSubmit} style={submitButtonStyle}>
                                Submit Quiz
                            </button>
                            <p style={scoreTextStyle}>Score: {score}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const containerStyle = {
    padding: '20px',
    maxWidth: '100%',
    margin: '50px auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    fontFamily: '"Arial", sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const headerStyle = {
    fontSize: '24px',
    color: '#333',
    marginBottom: '20px',
};

const questionContainerStyle = {
    marginBottom: '20px',
    textAlign: 'left',
    width: '100%',
    maxWidth: '600px',
};

const questionTextStyle = {
    fontSize: '18px',
    marginBottom: '10px',
};

const optionsContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
};

const optionLabelStyle = {
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
};

const inputStyle = {
    marginRight: '10px',
};

const navigationContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '600px',
    marginTop: '20px',
    padding: '10px 0',  // Menambah jarak vertikal antar tombol
};

const navigationButtonStyle = {
    padding: '12px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    width: '48%',
    minWidth: '120px', // Set width agar tetap konstan
    maxWidth: '160px', // Set max width untuk fleksibilitas
    margin: '0 10px', // Menambah jarak antar tombol
};

const submitContainerStyle = {
    marginTop: '30px',
};

const submitButtonStyle = {
    padding: '12px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#28a745',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
};

const scoreTextStyle = {
    marginTop: '10px',
    fontSize: '18px',
    color: '#555',
};

export default QuizPage;
