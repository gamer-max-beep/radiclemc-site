// Feather icons
feather.replace();

// Smooth scroll
document.querySelectorAll('.scroll-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior:'smooth' });
  });
});

// Modal
const modal = document.getElementById('modal');
const playBtn = document.getElementById('playNowBtn');
const closeModal = document.getElementById('closeModal');
playBtn.addEventListener('click', () => modal.classList.add('active'));
closeModal.addEventListener('click', () => modal.classList.remove('active'));

// Copy server IP
document.getElementById('copyBtn').addEventListener('click', () => {
  const ip = document.getElementById('serverIp');
  ip.select();
  navigator.clipboard.writeText(ip.value);
  alert('Server IP copied!');
});

// Live Player Count
const playerCountEl = document.getElementById('playerCount');
const serverIP = "nl-01.freezehost.pro:11630";

async function updatePlayerCount() {
  try {
    const response = await fetch(`https://api.mcsrvstat.us/2/${serverIP}`);
    const data = await response.json();
    if(data.online) {
      playerCountEl.textContent = `${data.players.online} Players Online`;
    } else {
      playerCountEl.textContent = "Server Offline";
    }
  } catch(err) {
    playerCountEl.textContent = "Server Offline";
    console.error(err);
  }
}
updatePlayerCount();
setInterval(updatePlayerCount, 10000);
