const playArea = document.getElementById('play-area');
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');

let score = 0;
let timeLeft = 30;
let gameInterval;
let targetSize = 50;

function createTarget() {
  const target = document.createElement('div');
  target.classList.add('target');

  const maxLeft = playArea.clientWidth - targetSize;
  const maxTop = playArea.clientHeight - targetSize;

  const x = Math.random() * maxLeft;
  const y = Math.random() * maxTop;

  target.style.left = `${x}px`;
  target.style.top = `${y}px`;
  target.style.width = `${targetSize}px`;
  target.style.height = `${targetSize}px`;

  target.addEventListener('click', () => {
    score++;
    scoreEl.textContent = `Score: ${score}`;
    target.remove();

    if (score % 5 === 0 && targetSize > 20) {
      targetSize -= 5;
    }

    createTarget();
  });

  playArea.appendChild(target);
}

function startGame() {
  score = 0;
  timeLeft = 30;
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
      playArea.innerHTML = '';
      alert(`Time's up! Final Score: ${score}`);
    }
  }, 1000);
}

startBtn.addEventListener('click', startGame);
