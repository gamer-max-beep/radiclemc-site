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

// Player count fetch
async function updatePlayerCount(){
  const playerCountEl = document.getElementById('playerCount');
  try{
    const response = await fetch('https://api.mcstatus.io/v2/status/java/nl-01.freezehost.pro:11630');
    const data = await response.json();
    if(data.online && data.players && data.players.online != undefined){
      playerCountEl.textContent = `${data.players.online} Players Online`;
    } else {
      playerCountEl.textContent = "Server Offline";
    }
  } catch(e){
    playerCountEl.textContent = "Server Offline";
  }
}
updatePlayerCount();
setInterval(updatePlayerCount, 5000);

// Particles
const canvas = document.getElementById('particles-js');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
for(let i=0;i<100;i++){
  particles.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    r: Math.random()*3+1,
    speed: Math.random()*0.5+0.2
  });
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    p.y -= p.speed;
    if(p.y<0) p.y = canvas.height;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle="rgba(255,215,0,0.4)";
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', ()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
