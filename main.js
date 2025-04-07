
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
let score = 0;
let wrongAnswers = [];
let shuffled = [];

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function startQuiz() {
  shuffled = shuffleArray(quizData);
  current = 0;
  score = 0;
  wrongAnswers = [];
  renderQuestion();
}

function renderQuestion() {
  const root = document.getElementById('root');
  const question = shuffled[current];
  root.innerHTML = `
    <div style="margin-bottom: 10px;">
      <strong>Question ${current + 1} of ${shuffled.length}</strong>
      <div style="background:#e5e7eb;border-radius:8px;height:10px;margin-top:5px;">
        <div style="background:#3b82f6;height:10px;width:${((current)/shuffled.length)*100}%;border-radius:8px;"></div>
      </div>
    </div>
    <h2 style="font-weight:bold;margin-bottom:10px;">${question.term}</h2>
    ${shuffleArray(question.options).map((opt, i) => `<button onclick="selectOption(this, '${opt.replace(/'/g, "\'")}')">${opt}</button>`).join('')}
    <div id="next-btn" style="margin-top:20px;"></div>
    <div id="score" style="margin-top:10px;font-weight:bold;">Score: ${score}</div>
  `;
}

function selectOption(button, selected) {
  const question = shuffled[current];
  const buttons = document.querySelectorAll('button');
  buttons.forEach(btn => btn.disabled = true);

  if (selected === question.correct) {
    button.classList.add("correct");
    score++;
    setTimeout(() => {
      current++;
      if (current < shuffled.length) {
        renderQuestion();
      } else {
        showResults();
      }
    }, 500);
  } else {
    button.classList.add("incorrect");
    buttons.forEach(btn => {
      if (btn.innerText === question.correct) btn.classList.add("correct");
    });
    wrongAnswers.push(question);
    const nextBtn = document.getElementById("next-btn");
    nextBtn.innerHTML = '<button onclick="next()">Next Question</button>';
  }
}

function next() {
  current++;
  if (current < shuffled.length) {
    renderQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  const root = document.getElementById('root');
  root.innerHTML = `
    <h2>Quiz Completed!</h2>
    <p>You scored ${score} out of ${shuffled.length}</p>
    <h3>Review Incorrect Answers:</h3>
    <ul style="padding-left:20px;">${
      wrongAnswers.map(q => `<li><strong>${q.term}</strong>: ${q.correct}</li>`).join('')
    }</ul>
    <button onclick="startQuiz()" style="margin-top:20px;">Retry Quiz</button>
  `;
}

document.addEventListener("DOMContentLoaded", startQuiz);
