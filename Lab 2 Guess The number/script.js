let target = Math.floor(Math.random() * 99) + 1;
let attempts = 0;
let wins = 0;
let losses = 0;
const maxAttempts = 7;

const guessInput = document.getElementById('guessInput');
const guessBtn = document.getElementById('guessBtn');
const resetBtn = document.getElementById('resetBtn');
const message = document.getElementById('message');
const guessList = document.getElementById('guessList');
const attemptsDisplay = document.getElementById('attempts');
const winsDisplay = document.getElementById('wins');
const lossesDisplay = document.getElementById('losses');

guessBtn.addEventListener('click', () => {
  const guess = parseInt(guessInput.value);

  if (isNaN(guess) || guess < 1 || guess > 99) {
    message.textContent = "Please enter a number between 1 and 99.";
    message.classList.remove('lost');
    return;
  }

  attempts++;
  attemptsDisplay.textContent = attempts;
  guessList.textContent += guess + " ";

  if (guess === target) {
    message.textContent = `Correct! You guessed it in ${attempts} attempts.`;
    message.classList.remove('lost');
    wins++;
    winsDisplay.textContent = wins;
    endGame();

  } else if (attempts >= maxAttempts) {
    message.textContent = `You lost! The number was ${target}.`;
    message.classList.add('lost'); 
    losses++;
    lossesDisplay.textContent = losses;
    endGame();

  } else if (guess < target) {
    message.textContent = "Try a higher number.";
    message.classList.remove('lost');
  } else {
    message.textContent = "Try a lower number.";
    message.classList.remove('lost');
  }
  
  guessInput.value = "";
  guessInput.focus();
});

resetBtn.addEventListener('click', () => {
  target = Math.floor(Math.random() * 99) + 1;
  attempts = 0;
  attemptsDisplay.textContent = attempts;
  guessList.textContent = "";
  message.textContent = "Guess a number between 1 and 99.";
  message.classList.remove('lost');
  guessBtn.style.display = "inline-block";
  resetBtn.style.display = "none";
  guessInput.disabled = false;
  guessInput.value = "";
  guessInput.focus();
});

function endGame() {
  guessBtn.style.display = "none";
  resetBtn.style.display = "inline-block";
  guessInput.disabled = true;
}