const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const gameOverScreen = document.getElementById("gameOverScreen");

const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");

const scoreText = document.getElementById("score");
const finalScore = document.getElementById("finalScore");

const jumpSound = document.getElementById("jumpSound");
const gameOverSound = document.getElementById("gameOverSound");

let isJumping = false;
let isGameOver = true; // IMPORTANT
let score = 0;
let cactusTimer;
let scoreTimer;

// START GAME
function startGame() {
  startScreen.classList.add("hidden");
  gameOverScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");

  isGameOver = false;
  score = 0;
  scoreText.textContent = score;

  cactus.style.left = "-50px";

  startCactus();
  startScore();
}

// MOVE CACTUS
function startCactus() {
  let x = -50;

  clearInterval(cactusTimer);
  cactusTimer = setInterval(() => {
    if (isGameOver) return;

    x += 6;
    cactus.style.left = x + "px";

    if (x > 800) x = -50;

    // COLLISION (only AFTER start)
    const dinoBottom = parseInt(getComputedStyle(dino).bottom);

    if (x > 600 && x < 660 && dinoBottom < 60) {
      endGame();
    }
  }, 20);
}

// SCORE
function startScore() {
  clearInterval(scoreTimer);
  scoreTimer = setInterval(() => {
    if (!isGameOver) {
      score++;
      scoreText.textContent = score;
    }
  }, 200);
}

// JUMP
function jump() {
  if (isJumping || isGameOver) return;

  isJumping = true;
  jumpSound.currentTime = 0;
  jumpSound.play();

  dino.classList.add("jump");

  setTimeout(() => {
    dino.classList.remove("jump");
    isJumping = false;
  }, 500);
}

// GAME OVER
function endGame() {
  isGameOver = true;

  clearInterval(cactusTimer);
  clearInterval(scoreTimer);

  finalScore.textContent = score;
  gameOverSound.play();

  gameScreen.classList.add("hidden");
  gameOverScreen.classList.remove("hidden");
}

// RESTART
function restartGame() {
  startGame();
}
