import { useState, useEffect, useRef, useCallback } from "react";
import "./Quiz.css";
const questions = [
  { question: "What does HTML stand for?", options: [ "Hypertext Markup Language","Hightext","Hypertransfer","Markup"], answer: "Hypertext Markup Language" },
  { question: " Which HTML tag is used to create a hyperlink?", options: ["<link>", "<a>", "<href>", "<url>"], answer: "<a>" },
  { question: "What property in CSS is used to change text color?", options: ["color", "background color", "background", "text color"], answer: "color" },
  { question: "Which CSS property makes an element responsive?", options: ["flex", "z-index", "position", "display"], answer: "flex" },
  { question: "What is the default display type of a <div>?", options: ["block", "inline", "grid", "flex"], answer: "block" },
  { question: "Which React hook is used for managing state?", options: ["useState", "useEffect", "useRef", "None"], answer: "useState" },
  { question: "What function is used to create components in React?", options: ["const", "class", "function", "None"], answer: "function" },
  { question: "Which command creates a new React app?", options: ["npm start", "npx create-react-app", "npm init react-app", " npx react-new-app"], answer: "npx create-react-app" },
  { question: "What does JSX stand for in React?", options: [" JavaScript XML", " JSON XML", "Java Syntax Extension", "JavaScript XHTML"], answer: " JavaScript XML" },
  { question: " Which React hook runs after every render?", options: ["useRef", "useState", "useContext", "useEffect"], answer: "useEffect" }
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
          <p>Test your knowledge with 10 questions. You have 30 seconds for each question.</p>
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