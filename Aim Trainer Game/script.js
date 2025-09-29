const target = document.querySelector("#Target");
const trap = document.querySelector("#Trap");
const message = document.querySelector("#message");
const levelSelect = document.querySelector("#level");
const backgroundContainer = document.getElementById("backgroundContainer");
const difficultyMenu = document.getElementById("difficulty");
const finalScoreDisplay = document.getElementById("finalScore");

let score = 0;
let moveInterval;
let gameTimer;
let speed = 1000;
let timeLimit = 5000;

const gameElements = [
  { id: "Target", type: "target", scoreEffect: +1 },
  { id: "Trap", type: "trap", scoreEffect: -1 }
];

for (let i = 0; i < gameElements.length; i++) {
  const el = document.getElementById(gameElements[i].id);
  el.addEventListener("click", () => {
    score += gameElements[i].scoreEffect;
  });
}

function showBackground() {
  backgroundContainer.innerHTML = "";
  const bgImage = document.createElement("img");
  bgImage.src = "hanamuraBackground.gif";
  bgImage.alt = "Hanamura Background";
  backgroundContainer.appendChild(bgImage);
}

function startGame() {
  score = 0;
  message.textContent = "Go!";
  finalScoreDisplay.textContent = "";
  difficultyMenu.style.display = "none";

  for (let i = 0; i < gameElements.length; i++) {
    document.getElementById(gameElements[i].id).style.display = "inline";
  }

  showBackground();

  const level = levelSelect.value;
  if (level === "easy") {
    timeLimit = 5000;
    speed = 1500;
  } else if (level === "medium") {
    timeLimit = 10000;
    speed = 700;
  } else {
    timeLimit = 15000;
    speed = 500;
  }

  moveAllElements();

  moveInterval = setInterval(() => {
    moveAllElements();
    speed = Math.max(100, speed - 20);
    clearInterval(moveInterval);
    moveInterval = setInterval(moveAllElements, speed);
  }, speed);

  clearTimeout(gameTimer);
  gameTimer = setTimeout(endGame, timeLimit);
}

function moveAllElements() {
  for (let i = 0; i < gameElements.length; i++) {
    const el = document.getElementById(gameElements[i].id);
    const x = Math.random() * (window.innerWidth - 50);
    const y = Math.random() * (window.innerHeight - 50);
    el.style.left = x + "px";
    el.style.top = y + "px";
  }
}

function endGame() {
  clearInterval(moveInterval);
  clearTimeout(gameTimer);

  for (let i = 0; i < gameElements.length; i++) {
    document.getElementById(gameElements[i].id).style.display = "none";
  }

  message.textContent = "";
  difficultyMenu.style.display = "block";
  backgroundContainer.innerHTML = "";

  finalScoreDisplay.textContent = `Game Over! Final Score: ${score}`;
}
