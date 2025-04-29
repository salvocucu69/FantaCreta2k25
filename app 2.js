let players = ["Alice", "Bob", "Charlie", "Diana"];
let selectedPlayers = [];
let standings = {};

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}

function renderPlayers() {
    const playerList = document.getElementById('player-list');
    playerList.innerHTML = "";
    players.forEach(player => {
        const btn = document.createElement('button');
        btn.innerText = player;
        btn.onclick = () => selectPlayer(player);
        playerList.appendChild(btn);
    });
}

function selectPlayer(player) {
    if (selectedPlayers.includes(player)) {
        selectedPlayers = selectedPlayers.filter(p => p !== player);
    } else {
        if (selectedPlayers.length < 2) {
            selectedPlayers.push(player);
        }
    }
}

function confirmTeam() {
    if (selectedPlayers.length === 2) {
        document.getElementById('team-selection').style.display = 'none';
        document.getElementById('game-area').style.display = 'block';
        const targetSelect = document.getElementById('target-player');
        selectedPlayers.forEach(player => {
            standings[player] = 0;
            const option = document.createElement('option');
            option.value = player;
            option.text = player;
            targetSelect.add(option);
        });
        updateStandings();
    } else {
        alert('Seleziona esattamente 2 compagni.');
    }
}

function assignPoints() {
    const type = document.getElementById('type').value;
    const description = document.getElementById('description').value;
    const points = parseInt(document.getElementById('points').value);
    const target = document.getElementById('target-player').value;
    if (description && !isNaN(points)) {
        standings[target] += (type === 'bonus' ? points : -points);
        updateStandings();
        document.getElementById('description').value = '';
        document.getElementById('points').value = '';
    } else {
        alert('Compila tutti i campi correttamente.');
    }
}

function updateStandings() {
    const standingsDiv = document.getElementById('standings');
    standingsDiv.innerHTML = "";
    Object.keys(standings).forEach(player => {
        const p = document.createElement('p');
        p.innerText = `${player}: ${standings[player]} punti`;
        standingsDiv.appendChild(p);
    });
}

renderPlayers();
