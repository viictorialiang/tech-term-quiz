
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

let current = 0;

function renderQuestion() {
  const root = document.getElementById('root');
  const question = quizData[current];
  root.innerHTML = `
    <h2 style="font-weight:bold;margin-bottom:10px;">Quiz ${current + 1}: ${question.term}</h2>
    ${question.options.map((opt, i) => `<button onclick="selectOption(this, '${opt.replace(/'/g, "\'")}')">${opt}</button>`).join('')}
    <div style="margin-top:20px;"><button onclick="nextQuestion()">Next Question</button></div>
  `;
}

function selectOption(button, selected) {
  const question = quizData[current];
  const buttons = document.querySelectorAll('button');
  buttons.forEach(btn => btn.disabled = true);
  if (selected === question.correct) {
    button.classList.add("correct");
  } else {
    button.classList.add("incorrect");
    buttons.forEach(btn => {
      if (btn.innerText === question.correct) btn.classList.add("correct");
    });
  }
}

function nextQuestion() {
  current = (current + 1) % quizData.length;
  renderQuestion();
}

document.addEventListener("DOMContentLoaded", renderQuestion);
