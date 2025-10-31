// Feather icons
feather.replace();

// Particles background
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const particles = [];
for(let i=0;i<80;i++){
  particles.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    r: Math.random()*3+1,
    d: Math.random()*2,
    color: "rgba(255,215,0,0.6)"
  });
}

function drawParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(let p of particles){
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle = p.color;
    ctx.fill();
    p.y -= p.d;
    if(p.y<0) p.y = canvas.height;
  }
  requestAnimationFrame(drawParticles);
}
drawParticles();

// Server status & player count
const playerCountElem = document.getElementById('playerCount');
async function fetchServerStatus(){
  try{
    const res = await fetch('https://api.mcstatus.io/v2/status/java/play.radiclemc.net');
    const data = await res.json();
    if(data.online){
      playerCountElem.textContent = `${data.players.online} Players Online`;
    }else{
      playerCountElem.textContent = 'Server Offline';
    }
  }catch(e){
    playerCountElem.textContent = 'Server Offline';
  }
}
fetchServerStatus();
setInterval(fetchServerStatus, 10000);
