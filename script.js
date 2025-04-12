const playArea = document.getElementById('play-area');
const crosshair = document.getElementById('crosshair');
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const timeInput = document.getElementById('time-input');

let score = 0;
let timeLeft = 0;
let gameInterval;
let target;
let targetSize = 50;

function createTarget() {
  if (target) target.remove();

  target = document.createElement('div');
  target.classList.add('target');

  const maxLeft = playArea.clientWidth - targetSize;
  const maxTop = playArea.clientHeight - targetSize;

  const x = Math.random() * maxLeft;
  const y = Math.random() * maxTop;

  target.style.left = `${x}px`;
  target.style.top = `${y}px`;
  target.style.width = `${targetSize}px`;
  target.style.height = `${targetSize}px`;

  playArea.appendChild(target);
}

function updateScore() {
  score++;
  scoreEl.textContent = `Score: ${score}`;
  if (score % 5 === 0 && targetSize > 20) targetSize -= 5;
  createTarget();
}

function shoot() {
  if (!target) return;

  const crossRect = crosshair.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();

  const hit =
    crossRect.left < targetRect.right &&
    crossRect.right > targetRect.left &&
    crossRect.top < targetRect.bottom &&
    crossRect.bottom > targetRect.top;

  if (hit) updateScore();
}

function startGame() {
  const inputTime = parseInt(timeInput.value);
  if (isNaN(inputTime) || inputTime < 30 || inputTime > 100) {
    alert("Please enter a valid time between 30 and 100 seconds.");
    return;
  }

  score = 0;
  timeLeft = inputTime;
  targetSize = 50;
  scoreEl.textContent = `Score: ${score}`;
  timerEl.textContent = `Time: ${timeLeft}`;
  playArea.innerHTML = '';
  createTarget();

  gameInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Time: ${timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(gameInterval);
      if (target) target.remove();
      alert(`Time's up! Final Score: ${score}`);
    }
  }, 1000);
}

document.addEventListener('mousemove', (e) => {
  crosshair.style.left = `${e.clientX}px`;
  crosshair.style.top = `${e.clientY}px`;
});

document.addEventListener('touchmove', (e) => {
  const touch = e.touches[0];
  crosshair.style.left = `${touch.clientX}px`;
  crosshair.style.top = `${touch.clientY}px`;
});

document.addEventListener('click', shoot);
document.addEventListener('touchstart', shoot);
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') shoot();
});

startBtn.addEventListener('click', startGame);
