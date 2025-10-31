async function updatePlayerCount(){
  try{
    const res=await fetch(`https://api.mcstatus.io/v2/status/java/nl-01.freezehost.pro:11630`);
    const data=await res.json();
    const online=data.players?.online??0;
    document.getElementById('playerCount').textContent=online+" Players Online";
  }catch{
    document.getElementById('playerCount').textContent="Server Offline";
  }
}
updatePlayerCount();
setInterval(updatePlayerCount, 10000);
