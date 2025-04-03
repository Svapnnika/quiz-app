import { useState, useEffect, useRef, useCallback } from "react";
import "./Quiz.css";
const questions = [
  { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" },
  { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: "Mars" },
  { question: "What is the largest mammal?", options: ["Elephant", "Giraffe", "Blue Whale", "Polar Bear"], answer: "Blue Whale" },
  { question: "Who painted the Mona Lisa?", options: ["Van Gogh", "Da Vinci", "Picasso", "Michelangelo"], answer: "Da Vinci" },
  { question: "What is the chemical symbol for gold?", options: ["Go", "Gd", "Au", "Ag"], answer: "Au" }
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizStarted, setQuizStarted] = useState(false);
  const timerRef = useRef(null);
  const questionRef = useRef(null);

  const handleAnswerClick = (option) => {
    setSelectedAnswer(option);
  };

  const handleNext = useCallback(() => {
    // Check if answer is correct and update score
    if (selectedAnswer === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    // Move to next question or show results
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  }, [currentQuestion, selectedAnswer, score, questions]);

  // Effect to handle the timer countdown
  useEffect(() => {
    if (quizStarted && !showResult && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && !showResult) {
      // Auto-move to next question when time runs out
      handleNext();
    }

    // Cleanup function to clear the timer
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timeLeft, quizStarted, showResult, handleNext]);

  // Effect to reset timer when moving to a new question
  useEffect(() => {
    if (quizStarted) {
      setTimeLeft(30);
    }
  }, [currentQuestion, quizStarted]);

  // Effect to scroll to the question when it changes
  useEffect(() => {
    if (questionRef.current) {
      questionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentQuestion]);


  const startQuiz = () => {
    setQuizStarted(true);
    setTimeLeft(30);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const restartQuiz = () => {
    setQuizStarted(true);
    setTimeLeft(30);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  return (
    <div className="quiz-container">
      {!quizStarted ? (
        <div className="start-screen">
          <h1>Welcome to the Quiz!</h1>
          <p>Test your knowledge with 5 questions. You have 30 seconds for each question.</p>
          <button onClick={startQuiz} className="start-button">Start Quiz</button>
        </div>
      ) : showResult ? (
        <div className="result-screen">
          <h2>Quiz Completed!</h2>
          <p>Your score: {score} out of {questions.length}</p>
          <p>Percentage: {Math.round((score / questions.length) * 100)}%</p>
          <button onClick={restartQuiz} className="restart-button">Restart Quiz</button>
        </div>
      ) : (
        <div className="question-screen" ref={questionRef}>
          <div className="quiz-header">
            <div className="progress">
              Question {currentQuestion + 1} of {questions.length}
            </div>
            <div className="timer">
              Time Left: {timeLeft} seconds
            </div>
          </div>

          <h2>{questions[currentQuestion].question}</h2>

          <div className="options">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(option)}
                className={`option-button ${selectedAnswer === option ? 'selected' : ''}`}
              >
                {option}
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className="next-button"
          >
            {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      )}
    </div>
  );
}  