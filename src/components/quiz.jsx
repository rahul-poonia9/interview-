import React, { useEffect, useState } from "react";
import questions from "../data/questions.js";

const Quiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  useEffect(() => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    if (selectedOption === shuffledQuestions[currentIndex].correctAnswer) {
      setScore((prev) => prev + 1);
    }

    if (currentIndex + 1 < shuffledQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption("");
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    const reshuffled = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(reshuffled);
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption("");
    setQuizCompleted(false);
  };

  if (shuffledQuestions.length === 0) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow-lg">
      {quizCompleted ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
          <p className="text-lg mb-6">Your Score: {score} / {shuffledQuestions.length}</p>
          <button
            onClick={handleRestart}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-semibold mb-4">
            {shuffledQuestions[currentIndex].text}
          </h3>
          <div className="space-y-2 mb-4">
            {shuffledQuestions[currentIndex].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className={`block w-full text-left px-4 py-2 rounded border ${
                  selectedOption === option ? "bg-blue-100 border-blue-500" : "border-gray-300"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            {currentIndex === shuffledQuestions.length - 1 ? "Finish Quiz" : "Next Question"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
