import { activePlayers, Team } from "./script.js";
//Zapisovani jmena tymu
//A
const teamAnameInp = document.getElementById(`teamAnameInp`);
const teamAhead = document.getElementById(`teamAheader`);
//B
const teamBnameInp = document.getElementById(`teamBnameInp`);
const teamBhead = document.getElementById(`teamBheader`);
//dva tymy na zapas
const teamA = new Team("Team A");
const teamB = new Team("Team B");
teamAhead.textContent = teamA.name;
teamBhead.textContent = teamB.name;
if (teamAnameInp && teamAhead) {
    teamAnameInp.addEventListener(`keydown`, (event) => {
        if (event.key === `Enter`) {
            teamA.name = teamAnameInp.value;
            teamAnameInp.value = ``;
            teamAhead.textContent = teamA.name;
        }
    });
}
if (teamBnameInp && teamBhead) {
    teamBnameInp.addEventListener(`keydown`, (event) => {
        if (event.key === `Enter`) {
            teamB.name = teamBnameInp.value;
            teamBnameInp.value = ``;
            teamBhead.textContent = teamB.name;
        }
    });
}
//Vyhledavac hracu, seznam
const players = activePlayers;
const playerList = document.getElementById(`playerListUl`);
const filterGuard = document.getElementById('filterGuard');
const filterWing = document.getElementById('filterWing');
const filterBig = document.getElementById('filterBig');
const searchInp = document.getElementById('searchInp');
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
        //check na text v searchbaru
        const searchText = searchInp.value.toLowerCase().trim();
        const filteredPlayers = players.filter(p => {
            const matchPos = allowedPos.includes(p.position);
            const matchTxt = p.fullName.toLowerCase().includes(searchText);
            return matchPos && matchTxt;
        });
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
                const baller = activePlayers.find(b => b.fullName === `${p.fullName}`);
                if (baller) {
                    teamA.addPlayer(baller);
                    console.log(`Hráč přídán do týmu A`);
                    teamA.printRoster();
                }
            });
            const btnB = document.createElement(`button`);
            btnB.textContent = `+B`;
            btnB.addEventListener(`click`, () => {
                const baller = activePlayers.find(b => b.fullName === `${p.fullName}`);
                if (baller) {
                    teamB.addPlayer(baller);
                    console.log(`Hráč přídán do týmu B`);
                    teamB.printRoster();
                }
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
//naslouchaci
filterGuard.addEventListener('change', loadPlayerList);
filterWing.addEventListener('change', loadPlayerList);
filterBig.addEventListener('change', loadPlayerList);
searchInp.addEventListener('input', loadPlayerList);
loadPlayerList();
