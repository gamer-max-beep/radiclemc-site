// Feather icons
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

// Random or live player count with offline check
async function updatePlayerCount() {
  const countEl = document.getElementById('playerCount');
  try {
    const res = await fetch("https://api.mcsrvstat.us/2/nl-01.freezehost.pro:11630");
    const data = await res.json();
    if(data.online) {
      countEl.textContent = `${data.players.online} Players Online`;
    } else {
      countEl.textContent = `Server Offline`;
    }
  } catch(e) {
    countEl.textContent = `Server Offline`;
  }
}
updatePlayerCount();
setInterval(updatePlayerCount, 10000);

// Dynamic icon colors
document.querySelectorAll('.feature-icon').forEach((icon,index)=>{
  const colors = ["#FF4D4D","#FFA500","#FFD700","#DAA520","#ADFF2F","#00CED1"];
  icon.style.color = colors[index % colors.length];
});
