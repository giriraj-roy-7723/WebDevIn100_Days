const gameArea = document.getElementById("game-area");
const hitsDisplay = document.getElementById("hits");
const timeLeftDisplay = document.getElementById("time-left");
const avgTimeDisplay = document.getElementById("avg-time");

let gameInterval;
let spawnInterval;
let timeLeft = 30;
let hits = 0;
let totalReactionTime = 0;
let currentTargetAppearedAt = 0;

function getRandomPosition() {
  const maxX = gameArea.clientWidth - 60;
  const maxY = gameArea.clientHeight - 60;
  const x = Math.floor(Math.random() * maxX);
  const y = Math.floor(Math.random() * maxY);
  return { x, y };
}

function spawnTarget() {
  const target = document.createElement("div");
  target.classList.add("target");

  const { x, y } = getRandomPosition();
  target.style.left = `${x}px`;
  target.style.top = `${y}px`;

  currentTargetAppearedAt = Date.now();

  target.addEventListener("click", () => {
    const reactionTime = Date.now() - currentTargetAppearedAt;
    totalReactionTime += reactionTime;
    hits++;
    hitsDisplay.textContent = hits;
    avgTimeDisplay.textContent = Math.round(totalReactionTime / hits);
    target.remove();
  });

  gameArea.appendChild(target);

  setTimeout(() => {
    if (gameArea.contains(target)) {
      target.remove();
    }
  }, 1000); // target disappears after 1 second
}

function startGame() {
  // Reset
  hits = 0;
  timeLeft = 30;
  totalReactionTime = 0;
  hitsDisplay.textContent = hits;
  timeLeftDisplay.textContent = timeLeft;
  avgTimeDisplay.textContent = 0;
  gameArea.innerHTML = "";

  // Start spawning
  spawnInterval = setInterval(spawnTarget, 800);

  // Countdown timer
  gameInterval = setInterval(() => {
    timeLeft--;
    timeLeftDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(gameInterval);
      clearInterval(spawnInterval);
      alert(`Game Over! You hit ${hits} targets. Avg Reaction: ${Math.round(totalReactionTime / hits || 0)}ms`);
    }
  }, 1000);
}
