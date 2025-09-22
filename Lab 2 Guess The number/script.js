let randomNumber;
let attempts = 0;
let wins = 0;
let losses = 0;
const maxAttempts = 7;

const playerGuess = document.querySelector('#guessInput');
const guessBtn = document.querySelector('#guessBtn');
const resetBtn = document.querySelector('#resetBtn');
const feedback = document.querySelector('#message');
const guessList = document.querySelector('#guessList');
const attemptsDisplay = document.querySelector('#attempts');
const winsDisplay = document.querySelector('#wins');
const lossesDisplay = document.querySelector('#losses');

function initializeGame() {
  randomNumber = Math.floor(Math.random() * 99) + 1;
  console.log("Random number: " + randomNumber);
  attempts = 0;

  resetBtn.style.display = "none";
  guessBtn.style.display = "inline-block";

  playerGuess.disabled = false;
  playerGuess.focus();
  playerGuess.value = "";

  feedback.textContent = "";
  feedback.classList.remove('lost');
  guessList.textContent = "";
  attemptsDisplay.textContent = attempts;
}

guessBtn.addEventListener('click', checkGuess);

function checkGuess() {
  const guess = parseInt(playerGuess.value);
  console.log("Player guess: " + guess);

  if (isNaN(guess) || guess < 1 || guess > 99) {
    alert("Guess out of range!");
    return;
  }
  attempts++;
  console.log("Attempts: " + attempts);
  attemptsDisplay.textContent = attempts;
  guessList.textContent += guess + " ";
  feedback.style.color = "orange";

  if (guess === randomNumber) {
    feedback.textContent = "You guessed it! You Won!";
    feedback.style.color = "darkgreen";
    wins++;
    winsDisplay.textContent = wins;
    endGame();
  } else {
    if (attempts === maxAttempts) {
      feedback.textContent = "Sorry, you lost!";
      feedback.style.color = "red";
      feedback.classList.add('lost');
      losses++;
      lossesDisplay.textContent = losses;
      endGame();
    } else if (guess > randomNumber) {
      feedback.textContent = "Guess was high";
    } else {
      feedback.textContent = "Guess was low";
    }
  }
  playerGuess.value = "";
  playerGuess.focus();
}

resetBtn.addEventListener('click', () => {
  initializeGame();
});

function endGame() {
  guessBtn.style.display = "none";
  resetBtn.style.display = "inline-block";
  playerGuess.disabled = true;
}

initializeGame();