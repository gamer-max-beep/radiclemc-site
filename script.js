async function updatePlayerCount() {
    const playerElem = document.getElementById('playerCount');
    try {
        const res = await fetch('https://api.mcsrvstat.us/2/play.radiclemc.net');
        const data = await res.json();
        if (data.online) {
            playerElem.textContent = data.players.online + " Players Online";
        } else {
            playerElem.textContent = "Server Offline";
        }
    } catch (err) {
        playerElem.textContent = "Server Offline";
    }
}

updatePlayerCount();
setInterval(updatePlayerCount, 10000); // refresh every 10s
