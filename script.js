const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
const countdownEl = document.getElementById('countdown');
const textEl = document.getElementById('center-text');

let countdown = 3;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();

window.addEventListener('resize', resizeCanvas);

const letters = "Happy Birthday ".split('');
const fontSize = 20;
let columns = Math.floor(canvas.width / fontSize);
const drops = Array.from({ length: columns }, () => Math.random() * canvas.height);

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#FF69B4";
  ctx.font = fontSize + "px monospace";

  drops.forEach((y, i) => {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, y * fontSize);

    if (y * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  });
}

setInterval(drawMatrix, 50);

function startCountdown() {
  countdownEl.textContent = countdown;
  countdownEl.style.animation = 'pop 1s ease forwards';
  countdown--;

  const timer = setInterval(() => {
    if (countdown > 0) {
      countdownEl.textContent = countdown;
      countdownEl.style.animation = 'none';
      countdownEl.offsetHeight; // триггер перерисовки
      countdownEl.style.animation = 'pop 1s ease forwards';
      countdown--;
    } else {
      clearInterval(timer);
      countdownEl.style.display = 'none';
      textEl.style.opacity = 1;
    }
  }, 1000);
}

window.onload = startCountdown;
