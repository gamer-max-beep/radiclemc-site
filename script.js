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

// Fetch player count
function updatePlayerCount() {
  const countElem = document.getElementById('playerCount');
  fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://api.mcsrvstat.us/2/play.radiclemc.net'))
  .then(res=>res.json())
  .then(data=>{
    const server = JSON.parse(data.contents);
    if(server.online) countElem.textContent = server.players.online + " Players Online";
    else countElem.textContent = "Server Offline";
  })
  .catch(()=>countElem.textContent = "Server Offline");
}
updatePlayerCount();
setInterval(updatePlayerCount, 10000);

// Particles
const canvas = document.getElementById('particles-js');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particles = [];
for(let i=0;i<50;i++){
    particles.push({x:Math.random()*canvas.width, y:Math.random()*canvas.height, r:Math.random()*3+1, dx:(Math.random()-0.5)/2, dy:(Math.random()-0.5)/2});
}
function animate(){
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    particles.forEach(p=>{
        p.x+=p.dx;
        p.y+=p.dy;
        if(p.x<0)p.x=canvas.width;
        if(p.x>canvas.width)p.x=0;
        if(p.y<0)p.y=canvas.height;
        if(p.y>canvas.height)p.y=0;
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle="rgba(255,215,0,0.4)";
        ctx.fill();
    });
    requestAnimationFrame(animate);
}
animate();

// Resize
window.addEventListener('resize', ()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
