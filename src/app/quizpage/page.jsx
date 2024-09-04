"use client";

import React from "react";
import QuizPlay from "@/components/QuizPlay"; // Adjust path if necessary

const mcqQuestions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["Paris", "Berlin", "Madrid", "Rome"],
    correctAnswer: "Paris",
  },
  {
    id: 2,
    question: "Which language is primarily used for web development?",
    options: ["Python", "Java", "HTML", "C++"],
    correctAnswer: "HTML",
  },
  {
    id: 3,
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "4",
  },
];

export default function QuizPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">MCQ Quiz</h1>
      <QuizPlay questions={mcqQuestions} />
    </div>
  );
}
