const crosshair = document.getElementById('crosshair');
const gameContainer = document.getElementById('game-container');
const startScreen = document.getElementById('start-screen');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');

let gameInterval, targetInterval, timeLeft = 0, score = 0;

document.addEventListener('mousemove', (e) => {
  crosshair.style.left = `${e.clientX}px`;
  crosshair.style.top = `${e.clientY}px`;
});

document.addEventListener('touchmove', (e) => {
  const touch = e.touches[0];
  crosshair.style.left = `${touch.clientX}px`;
  crosshair.style.top = `${touch.clientY}px`;
});

function startGame() {
  const inputTime = parseInt(document.getElementById('timeInput').value);
  if (isNaN(inputTime) || inputTime < 30 || inputTime > 100) return alert('Enter time between 30-100 sec');

  score = 0;
  timeLeft = inputTime;
  updateHUD();

  startScreen.style.display = 'none';

  spawnTarget();
  targetInterval = setInterval(spawnTarget, 1000);
  gameInterval = setInterval(() => {
    timeLeft--;
    updateHUD();
    if (timeLeft <= 0) endGame();
  }, 1000);
}

function updateHUD() {
  timerDisplay.textContent = timeLeft;
  scoreDisplay.textContent = score;
}

function endGame() {
  clearInterval(gameInterval);
  clearInterval(targetInterval);
  document.querySelectorAll('.target').forEach(t => t.remove());
  alert(`Time's up! Final Score: ${score}`);
  startScreen.style.display = 'flex';
}

function spawnTarget() {
  const target = document.createElement('div');
  target.classList.add('target');
  target.style.left = `${Math.random() * (window.innerWidth - 40)}px`;
  target.style.top = `${Math.random() * (window.innerHeight - 40)}px`;
  gameContainer.appendChild(target);
  setTimeout(() => target.remove(), 4000);
}

function checkHit(x, y) {
  const targets = document.querySelectorAll('.target');
  targets.forEach(target => {
    const rect = target.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = x - centerX;
    const dy = y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 7.5) {
      target.remove();
      score++;
      updateHUD();
    }
  });
}

document.addEventListener('click', (e) => checkHit(e.clientX, e.clientY));
document.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  checkHit(touch.clientX, touch.clientY);
});
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    const rect = crosshair.getBoundingClientRect();
    checkHit(rect.left + 7.5, rect.top + 7.5);
  }
});
