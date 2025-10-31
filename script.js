// Particle Background
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
  constructor() {
    this.x = Math.random()*canvas.width;
    this.y = Math.random()*canvas.height;
    this.size = Math.random()*3+1;
    this.speed = Math.random()*0.3+0.1;
    this.color = `rgba(218,165,32,${Math.random()*0.5+0.2})`;
  }
  update() { this.y -= this.speed; if(this.y < 0) { this.y = canvas.height; this.x = Math.random()*canvas.width; } }
  draw() { ctx.beginPath(); ctx.arc(this.x,this.y,this.size,0,Math.PI*2); ctx.fillStyle=this.color; ctx.fill(); }
}

let particlesArray = [];
for(let i=0;i<100;i++) particlesArray.push(new Particle());

function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particlesArray.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", ()=> { canvas.width=window.innerWidth; canvas.height=window.innerHeight; });

// Fetch live player count
async function updatePlayerCount() {
  try {
    const res = await fetch("https://api.mcstatus.io/v2/status/java/nl-01.freezehost.pro:11630");
    const data = await res.json();
    const players = data.players.online;
    document.getElementById("playerCount").textContent = `${players} Players Online`;
  } catch(e) {
    document.getElementById("playerCount").textContent = "Server Offline";
  }
}
updatePlayerCount();
setInterval(updatePlayerCount, 10000);
