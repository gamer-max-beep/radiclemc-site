// Feather Icons
feather.replace();

// Smooth scroll
document.querySelectorAll('.scroll-link').forEach(link=>{
  link.addEventListener('click', function(e){
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({behavior:'smooth'});
  });
});

// Modal
const modal = document.getElementById('modal');
const playBtn = document.getElementById('playNowBtn');
const closeModal = document.getElementById('closeModal');
playBtn.addEventListener('click', ()=> modal.classList.add('active'));
closeModal.addEventListener('click', ()=> modal.classList.remove('active'));
document.getElementById('copyBtn').addEventListener('click', ()=>{
  const ip = document.getElementById('serverIp');
  ip.select();
  navigator.clipboard.writeText(ip.value);
  alert('Server IP copied!');
});

// Live Player Count with offline detection
async function updatePlayerCount() {
  try {
    const response = await fetch("https://api.mcsrvstat.us/2/nl-01.freezehost.pro:11630");
    const data = await response.json();
    const playerCountEl = document.getElementById('playerCount');

    if(data.online){
      playerCountEl.textContent = data.players.online + " Players Online";
      playerCountEl.style.color = "#FFD700";
    } else {
      playerCountEl.textContent = "Server Offline";
      playerCountEl.style.color = "#FF4500";
    }
  } catch(err){
    console.error(err);
    const playerCountEl = document.getElementById('playerCount');
    playerCountEl.textContent = "Server Offline";
    playerCountEl.style.color = "#FF4500";
  }
}

updatePlayerCount();
setInterval(updatePlayerCount,15000);
