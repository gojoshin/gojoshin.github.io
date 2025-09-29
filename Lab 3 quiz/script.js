const submitBtn = document.querySelector("#submit");
const a1Message = document.querySelector("#a1-result");
const a2Message = document.querySelector("#a2-result");
const a3Message = document.querySelector("#a3-result");
const a4Message = document.querySelector("#a4-result");
const a5Message = document.querySelector("#a5-result");
const scoreText = document.querySelector("#scoreText");
const ATTEMPTS_KEY = "quizAttempts";

let attempts = parseInt(localStorage.getItem(ATTEMPTS_KEY) ?? "0", 10);
document.querySelector("#attemptsText").textContent = `Attempts: ${attempts}`;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

window.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("#checkbox-container");
  const options = Array.from(container.querySelectorAll(".option"));
  shuffle(options);
  container.innerHTML = "";
  options.forEach(el => container.appendChild(el));
});

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  attempts++;
  localStorage.setItem(ATTEMPTS_KEY, String(attempts));
  document.querySelector("#attemptsText").textContent = `Attempts: ${attempts}`;

  let score = 100;

  // Question 1
  let answer1 = document.querySelector("#a1").value.trim().toLowerCase();
  if (answer1 === "tetris") {
    a1Message.textContent = "✅ Correct!";
    a1Message.style.color = "green";
  } else {
    a1Message.textContent = "❌ That's incorrect";
    a1Message.style.color = "red";
    score -= 20;
  }

  // Question 2
  let answer2 = document.querySelector("input[name=launchers]:checked");
  if (answer2 && answer2.value === "steam") {
    a2Message.textContent = "✅ Correct!";
    a2Message.style.color = "green";
  } else {
    a2Message.textContent = "❌ Wrong";
    a2Message.style.color = "red";
    score -= 20;
  }

  // Question 3
  let answer3 = document.querySelector("#POV").value;
  if (answer3 === "1994") {
    a3Message.textContent = "✅ Correct!";
    a3Message.style.color = "green";
  } else {
    a3Message.textContent = "❌ Wrong";
    a3Message.style.color = "red";
    score -= 20;
  }

  // Question 4
  let answer4 = document.querySelector("#numberInput").value;
  if (answer4 === "5") {
    a4Message.textContent = "✅ Correct!";
    a4Message.style.color = "green";
  } else {
    a4Message.textContent = "❌ Wrong";
    a4Message.style.color = "red";
    score -= 20;
  }

  // Question 5
  let checked = document.querySelectorAll("input[name=device]:checked");
  let values = Array.from(checked).map(cb => cb.value);
  let correct = ["Switch"];
  let isCorrect = values.length === correct.length && correct.every(item => values.includes(item));

  if (isCorrect) {
    a5Message.textContent = "✅ Correct!";
    a5Message.style.color = "green";
  } else {
    a5Message.textContent = "❌ Wrong";
    a5Message.style.color = "red";
    score -= 20;
  }

  scoreText.textContent = "Score: " + score;

  if (score > 80) {
    alert("Nice job! You got 100!!!");
  }
});
