"use client";

import React, { useState } from "react";

const QuizPlay = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [currentQuestionIndex]: option,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmitQuiz = () => {
    setIsQuizSubmitted(true);
  };

  const calculateResults = () => {
    let correctCount = 0;
    questions.forEach((question, index) => {
      if (selectedOptions[index] === question.correctAnswer) {
        correctCount++;
      }
    });
    return {
      total: questions.length,
      correct: correctCount,
      incorrect: questions.length - correctCount,
      accuracy: ((correctCount / questions.length) * 100).toFixed(2),
    };
  };

  const results = isQuizSubmitted ? calculateResults() : null;

  return (
    <div className="quiz-container flex justify-center items-center min-h-screen bg-gray-100 p-4">
      {!isQuizSubmitted ? (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Question {currentQuestionIndex + 1} of {questions.length}
          </h2>
          <p className="text-xl text-center mb-6">
            {questions[currentQuestionIndex].question}
          </p>
          <div className="options-container mb-6 grid grid-cols-1 gap-4">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <button
                key={index}
                className={`p-4 rounded-lg block w-full text-center font-medium text-lg transition duration-300 transform hover:scale-105 ${
                  selectedOptions[currentQuestionIndex] === option
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-blue-300"
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
          {currentQuestionIndex < questions.length - 1 ? (
            <button
              className="bg-blue-600 text-white p-3 rounded-lg w-full font-semibold text-lg hover:bg-blue-700"
              onClick={handleNextQuestion}
            >
              Next Question
            </button>
          ) : (
            <button
              className="bg-green-600 text-white p-3 rounded-lg w-full font-semibold text-lg hover:bg-green-700"
              onClick={handleSubmitQuiz}
            >
              Submit Quiz
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
          <h2 className="text-2xl font-bold mb-4 text-center">Quiz Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-8">
            <div className="bg-green-100 p-4 rounded-lg shadow-md">
              <p className="text-lg font-semibold">Correct Answers</p>
              <p className="text-3xl font-bold text-green-600">
                {results.correct}
              </p>
            </div>
            <div className="bg-red-100 p-4 rounded-lg shadow-md">
              <p className="text-lg font-semibold">Wrong Answers</p>
              <p className="text-3xl font-bold text-red-600">
                {results.incorrect}
              </p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg shadow-md">
              <p className="text-lg font-semibold">Accuracy</p>
              <p className="text-3xl font-bold text-blue-600">
                {results.accuracy}%
              </p>
            </div>
          </div>
          <div>
            {questions.map((question, index) => (
              <div
                key={index}
                className="mb-6 p-4 rounded-lg bg-gray-50 shadow-sm"
              >
                <h3 className="font-semibold text-lg mb-2">
                  Question {index + 1}: {question.question}
                </h3>
                <p>
                  Your Answer:{" "}
                  <span
                    className={
                      selectedOptions[index] === question.correctAnswer
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {selectedOptions[index] || "No answer selected"}
                  </span>
                </p>
                <p>Correct Answer: {question.correctAnswer}</p>
                {selectedOptions[index] !== question.correctAnswer && (
                  <p className="text-red-600 font-medium mt-1">
                    You answered this question incorrectly.
                  </p>
                )}
                {selectedOptions[index] === question.correctAnswer && (
                  <p className="text-green-600 font-medium mt-1">
                    You answered this question correctly.
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPlay;
