feather.replace();

// Fade slide animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.2 });
document.querySelectorAll('.fade-slide').forEach(el => observer.observe(el));

// Player Count
const playerCountEl = document.getElementById('playerCount');
async function fetchPlayerCount() {
  try {
    const res = await fetch('https://api.mcstatus.io/v2/status/java/nl-01.freezehost.pro:11630');
    const data = await res.json();
    playerCountEl.textContent = data.online ? `${data.players.online} Players Online` : "Server Offline";
  } catch {
    playerCountEl.textContent = "Server Offline";
  }
}
fetchPlayerCount();
setInterval(fetchPlayerCount, 15000);

// Modal controls
const modal = document.getElementById('modal');
document.getElementById('playNowBtn').addEventListener('click', () => modal.classList.add('active'));
document.getElementById('closeModal').addEventListener('click', () => modal.classList.remove('active'));
document.getElementById('copyBtn').addEventListener('click', () => {
  navigator.clipboard.writeText(document.getElementById('serverIp').value);
  alert('Server IP copied!');
});

// Particle Background (Subtle Gold Ember Animation)
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
window.addEventListener('resize', resize);
resize();

function createParticles() {
  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.8,
      color: `rgba(255, 215, 0, ${Math.random() * 0.8})`,
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: (Math.random() - 0.5) * 0.4
    });
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
    p.x += p.speedX;
    p.y += p.speedY;
    if (p.y > canvas.height || p.y < 0) p.speedY *= -1;
    if (p.x > canvas.width || p.x < 0) p.speedX *= -1;
  });
  requestAnimationFrame(animateParticles);
}

createParticles();
animateParticles();
