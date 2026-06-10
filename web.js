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
const filterGuard = document.getElementById('filterGuard');
const filterWing = document.getElementById('filterWing');
const filterBig = document.getElementById('filterBig');
function loadPlayerList() {
    if (playerList) {
        playerList.innerHTML = '';
        //check na zaskrtnute pozice ve vyhledavaci
        const allowedPos = [];
        if (filterGuard.checked)
            allowedPos.push("Guard");
        if (filterWing.checked)
            allowedPos.push("Wing");
        if (filterBig.checked)
            allowedPos.push("BigMan");
        const filteredPlayers = players.filter(p => allowedPos.includes(p.position));
        filteredPlayers.forEach((p) => {
            const li = document.createElement(`li`);
            //prvni sloupec jmeno
            const nameCol = document.createElement(`span`);
            nameCol.textContent = p.fullName;
            //druhy sloupec pozice
            const posCol = document.createElement(`span`);
            posCol.textContent = p.position;
            //treti sloupec overall
            const ovrCol = document.createElement(`span`);
            ovrCol.textContent = `OVR: ${p.calcOverall().toString()}`;
            //ctvrty sloupec, plat
            const slryCol = document.createElement(`span`);
            slryCol.textContent = `SAL: ${(p.salary / 1000000).toFixed(0)}M`;
            //paty sloupec tlacitka na pridani do tymu A/B
            const butCont = document.createElement(`div`);
            butCont.className = `add-btn`;
            const btnA = document.createElement(`button`);
            btnA.textContent = `+A`;
            btnA.addEventListener(`click`, () => {
            });
            const btnB = document.createElement(`button`);
            btnB.textContent = `+B`;
            btnB.addEventListener(`click`, () => {
            });
            //sestaveni karty hrace ve vyhledavaci
            butCont.appendChild(btnA);
            butCont.appendChild(btnB);
            li.appendChild(nameCol);
            li.appendChild(posCol);
            li.appendChild(ovrCol);
            li.appendChild(slryCol);
            li.appendChild(butCont);
            playerList.appendChild(li);
        });
    }
}
filterGuard.addEventListener('change', loadPlayerList);
filterWing.addEventListener('change', loadPlayerList);
filterBig.addEventListener('change', loadPlayerList);
loadPlayerList();
