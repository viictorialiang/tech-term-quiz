
const quizData = Array.from({length: 100}, (_, i) => {
  const correct = `This is the correct definition of term ${i+1}.`;
  const options = [
    correct,
    `Incorrect option A for term ${i+1}`,
    `Incorrect option B for term ${i+1}`,
    `Incorrect option C for term ${i+1}`
  ].sort(() => Math.random() - 0.5);
  return {
    term: `Term ${i+1}`,
    correct,
    options
  };
});

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
    ${question.options.map((opt) => `<button onclick="selectOption(this, \`${opt}\`)">${opt}</button>`).join('')}
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
