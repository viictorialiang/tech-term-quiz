
const quizData = [
  {
    "term": "Big Data Analysis",
    "correct": "The process of examining large and complex datasets to uncover patterns, trends, and insights that can inform decision-making.",
    "options": [
      "The process of examining large and complex datasets to uncover patterns, trends, and insights that can inform decision-making.",
      "The use of virtual environments for realistic simulation.",
      "A framework for evaluating the success of IS in organizations.",
      "A network protocol used for encrypting communication online."
    ]
  },
  {
    "term": "FinTech",
    "correct": "Financial technology, referring to innovative technologies and startups that aim to improve and automate financial services and processes.",
    "options": [
      "Financial technology, referring to innovative technologies and startups that aim to improve and automate financial services and processes.",
      "A platform used to monitor network traffic and security.",
      "A theory of how users adopt and use new technologies.",
      "The set of technologies for visual object recognition."
    ]
  },
  {
    "term": "Data Science",
    "correct": "The interdisciplinary field that uses scientific methods, algorithms, and systems to extract insights and knowledge from structured and unstructured data.",
    "options": [
      "The interdisciplinary field that uses scientific methods, algorithms, and systems to extract insights and knowledge from structured and unstructured data.",
      "The use of 3D printing in medical device production.",
      "A decentralized system that verifies user identities.",
      "A system to extract, transform, and load data from sources."
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
  let optionsHtml = "";
  shuffleArray(question.options).forEach(opt => {
    optionsHtml += `<button onclick="selectOption(this, \\`${opt}\\`)">${opt}</button>`;
  });
  root.innerHTML = `
    <div style="margin-bottom: 10px;">
      <strong>Question ${current + 1} of ${shuffled.length}</strong>
      <div style="background:#e5e7eb;border-radius:8px;height:10px;margin-top:5px;">
        <div style="background:#3b82f6;height:10px;width:${((current)/shuffled.length)*100}%;border-radius:8px;"></div>
      </div>
    </div>
    <h2 style="font-weight:bold;margin-bottom:10px;">${question.term}</h2>
    ${optionsHtml}
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
  const review = wrongAnswers.map(q => '<li><strong>' + q.term + '</strong>: ' + q.correct + '</li>').join('');
  root.innerHTML = `
    <h2>Quiz Completed!</h2>
    <p>You scored ${score} out of ${shuffled.length}</p>
    <h3>Review Incorrect Answers:</h3>
    <ul style="padding-left:20px;">${review}</ul>
    <button onclick="startQuiz()" style="margin-top:20px;">Retry Quiz</button>
  `;
}

document.addEventListener("DOMContentLoaded", startQuiz);
