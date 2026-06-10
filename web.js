import { activePlayers } from "./script.js";
//Zapisovani jmena tymu
const teamAnameInp = document.getElementById(`teamAnameInp`);
const teamAhead = document.getElementById(`teamAheader`);
if (teamAnameInp && teamAhead) {
    teamAnameInp.addEventListener(`keydown`, (event) => {
        if (event.key === `Enter`) {
            teamAhead.textContent = teamAnameInp.value;
            teamAnameInp.value = ``;
        }
    });
}
const teamBnameInp = document.getElementById(`teamBnameInp`);
const teamBhead = document.getElementById(`teamBheader`);
if (teamBnameInp && teamBhead) {
    teamBnameInp.addEventListener(`keydown`, (event) => {
        if (event.key === `Enter`) {
            teamBhead.textContent = teamBnameInp.value;
            teamBnameInp.value = ``;
        }
    });
}
//Vyhledavac hracu, seznam
const players = activePlayers;
const playerList = document.getElementById(`playerListUl`);
if (playerList) {
    players.forEach((p) => {
        const li = document.createElement(`li`);
        li.textContent = `${p.fullName} - $${p.salary.toLocaleString()}`;
        playerList.appendChild(li);
    });
}
