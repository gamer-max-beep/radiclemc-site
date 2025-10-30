// FEATHER ICONS
feather.replace();

// SMOOTH SCROLL
document.querySelectorAll('.scroll-link').forEach(link=>{
  link.addEventListener('click', function(e){
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({behavior:'smooth'});
  });
});

// PLAY NOW MODAL
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

// RANDOM PLAYER COUNT (LIVE)
const playerCountEl = document.getElementById('playerCount');
async function updatePlayerCount() {
  try {
    const res = await fetch('https://api.mcstatus.io/v2/status/java/nl-01.freezehost.pro:11630');
    const data = await res.json();
    if(data.online) {
      playerCountEl.textContent = `${data.players.online} Players Online`;
    } else {
      playerCountEl.textContent = `Server Offline`;
    }
  } catch(e) {
    playerCountEl.textContent = 'Server Offline';
  }
}
updatePlayerCount();
setInterval(updatePlayerCount, 5000);

// FLOATING ICONS STAGGER
const floatingIcons = document.querySelectorAll('.floating-icon');
floatingIcons.forEach((icon,i)=>{
  icon.style.animationDelay = `${i*1.5}s`;
  icon.style.width = `${25 + i*5}px`;
  icon.style.height = `${25 + i*5}px`;
});
