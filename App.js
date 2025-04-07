import { useState } from "react";

const quizData = [
  {
    term: "Big Data Analysis",
    correct: "The process of examining large and complex datasets to uncover patterns, trends, and insights that can inform decision-making.",
    options: [
      "The process of examining large and complex datasets to uncover patterns, trends, and insights that can inform decision-making.",
      "The simulation of human intelligence processes by machines, typically involving tasks such as learning, reasoning, and problem-solving.",
      "The convergence of AI and the Internet of Things (IoT), enabling intelligent decision-making and automation.",
      "The ability of machines to interpret and analyze visual information from images or videos."
    ]
  },
  {
    term: "FinTech",
    correct: "Financial technology, referring to innovative technologies and startups that aim to improve and automate financial services and processes.",
    options: [
      "The field of AI that focuses on enabling computers to interpret and understand visual information from images or videos.",
      "Financial technology, referring to innovative technologies and startups that aim to improve and automate financial services and processes.",
      "A technology that creates a secure, encrypted connection over a public network such as the internet.",
      "A set of techniques and tools for transforming raw data into meaningful and useful information."
    ]
  },
  {
    term: "Data Science",
    correct: "The interdisciplinary field that uses scientific methods, algorithms, and systems to extract insights and knowledge from structured and unstructured data.",
    options: [
      "The branch of artificial intelligence focused on enabling computers to understand, interpret, and generate human language.",
      "The interdisciplinary field that uses scientific methods, algorithms, and systems to extract insights and knowledge from structured and unstructured data.",
      "Techniques and technologies to control access and usage rights of digital content.",
      "A structured collection of data organized for efficient storage, retrieval, and manipulation."
    ]
  }
];

export default function TechTermQuiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const question = quizData[current];

  const handleOptionClick = (option) => {
    setSelected(option);
    setShowAnswer(true);
  };

  const handleNext = () => {
    setSelected(null);
    setShowAnswer(false);
    setCurrent((prev) => (prev + 1) % quizData.length);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg space-y-4">
      <h1 className="text-xl font-bold">Quiz {current + 1}: {question.term}</h1>
      <div className="space-y-2">
        {question.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleOptionClick(opt)}
            className={`w-full text-left p-3 rounded-xl border ${
              showAnswer
                ? opt === question.correct
                  ? "border-green-500 bg-green-100"
                  : opt === selected
                  ? "border-red-500 bg-red-100"
                  : "border-gray-300"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      {showAnswer && (
        <button
          onClick={handleNext}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
        >
          Next Question
        </button>
      )}
    </div>
  );
}
