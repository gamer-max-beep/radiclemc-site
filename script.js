// Smooth scroll
document.querySelectorAll('.scroll-link').forEach(link=>{
  link.addEventListener('click', e=>{
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({behavior:'smooth'});
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
  ip.select(); navigator.clipboard.writeText(ip.value);
  alert('Server IP copied!');
});

// Player count
async function updatePlayerCount() {
  const countEl = document.getElementById('playerCount');
  try {
    const res = await fetch('https://api.mcsrvstat.us/2/nl-01.freezehost.pro:11630');
    const data = await res.json();
    if(data.online) countEl.textContent = `${data.players.online} Players Online`;
    else countEl.textContent = 'Server Offline';
  } catch(e) { countEl.textContent = 'Server Offline'; }
}
updatePlayerCount();
setInterval(updatePlayerCount,15000);

// Simple particle animation
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particles = [];
for(let i=0;i<40;i++){
  particles.push({x:Math.random()*canvas.width, y:Math.random()*canvas.height, r:Math.random()*2+1, dx:(Math.random()-0.5)*0.5, dy:(Math.random()-0.5)*0.5});
}
function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    p.x+=p.dx; p.y+=p.dy;
    if(p.x>canvas.width||p.x<0) p.dx*=-1;
    if(p.y>canvas.height||p.y<0) p.dy*=-1;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle='rgba(218,165,32,0.6)';
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();
window.addEventListener('resize',()=>{canvas.width=window.innerWidth;canvas.height=window.innerHeight;});
