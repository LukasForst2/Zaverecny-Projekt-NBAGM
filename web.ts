import { Player, activePlayers } from "./script.js";

//Zapisovani jmena tymu
const teamAnameInp = document.getElementById(`teamAnameInp`) as HTMLInputElement;
const teamAhead = document.getElementById(`teamAheader`) as HTMLHeadingElement;

if (teamAnameInp && teamAhead) {
    teamAnameInp.addEventListener(`keydown`, (event: KeyboardEvent) => {
        if (event.key ===  `Enter`) {
            teamAhead.textContent = teamAnameInp.value;
            teamAnameInp.value = ``;

        }
    }) 
}

const teamBnameInp = document.getElementById(`teamBnameInp`) as HTMLInputElement;
const teamBhead = document.getElementById(`teamBheader`) as HTMLHeadingElement;

if (teamBnameInp && teamBhead) {
    teamBnameInp.addEventListener(`keydown`, (event: KeyboardEvent) => {
        if (event.key ===  `Enter`) {
            teamBhead.textContent = teamBnameInp.value;
            teamBnameInp.value = ``;

        }
    }) 
}

//Vyhledavac hracu, seznam

const players: Player[] = activePlayers;
const playerList = document.getElementById(`playerListUl`) as HTMLUListElement;

if (playerList) {
    players.forEach((p) => {
        const li = document.createElement(`li`);
        li.textContent = `${p.fullName} - $${p.salary.toLocaleString()}`;
        playerList.appendChild(li);
    })
} 