const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const crosshairImg = new Image();
crosshairImg.src = 'crosshair.png'; // Place the image in the same folder
const crosshairSize = 15;

let targets = [];
let score = 0;
let timer = 0;
let gameDuration = 60;
let gameRunning = false;

document.addEventListener('mousemove', (e) => {
  crosshair.x = e.clientX;
  crosshair.y = e.clientY;
});

document.addEventListener('click', shoot);
document.addEventListener('touchstart', shoot);
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') shoot();
});

const crosshair = { x: canvas.width / 2, y: canvas.height / 2 };

function spawnTarget() {
  const radius = 20;
  const x = Math.random() * (canvas.width - radius * 2) + radius;
  const y = Math.random() * (canvas.height - radius * 2) + radius;
  targets.push({ x, y, radius });
}

function shoot() {
  if (!gameRunning) return;
  for (let i = 0; i < targets.length; i++) {
    const dx = crosshair.x - targets[i].x;
    const dy = crosshair.y - targets[i].y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < crosshairSize) {
      targets.splice(i, 1);
      score++;
      break;
    }
  }
}

function update() {
  if (!gameRunning) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  targets.forEach(t => {
    ctx.beginPath();
    ctx.arc(t.x, t.y, t.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
  });

  ctx.drawImage(
    crosshairImg,
    crosshair.x - crosshairSize / 2,
    crosshair.y - crosshairSize / 2,
    crosshairSize,
    crosshairSize
  );

  if (Math.random() < 0.02) spawnTarget();

  requestAnimationFrame(update);
}

function startGame() {
  const input = document.getElementById('timeInput');
  gameDuration = Math.max(30, Math.min(100, parseInt(input.value)));
  score = 0;
  targets = [];
  document.getElementById('startScreen').style.display = 'none';
  gameRunning = true;
  timer = gameDuration;
  document.getElementById('timer').innerText = timer;

  const countdown = setInterval(() => {
    timer--;
    document.getElementById('timer').innerText = timer;
    if (timer <= 0) {
      clearInterval(countdown);
      gameRunning = false;
      alert("Time's up! Your Score: " + score);
      location.reload();
    }
  }, 1000);

  update();
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
