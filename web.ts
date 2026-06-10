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
const filterGuard = document.getElementById('filterGuard') as HTMLInputElement;
const filterWing = document.getElementById('filterWing') as HTMLInputElement;
const filterBig = document.getElementById('filterBig') as HTMLInputElement;

function loadPlayerList() {
    if (playerList) {
        playerList.innerHTML = '';

        //check na zaskrtnute pozice ve vyhledavaci
        const allowedPos: string[] = [];
        if (filterGuard.checked) allowedPos.push("Guard");
        if (filterWing.checked) allowedPos.push("Wing");
        if (filterBig.checked) allowedPos.push("BigMan");

        const filteredPlayers = players.filter(p => allowedPos.indexOf(p.position) !== -1);

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
            })

            const btnB = document.createElement(`button`);
            btnB.textContent = `+B`;
            btnB.addEventListener(`click`, () => {
            })

            //sestaveni karty hrace ve vyhledavaci
            butCont.appendChild(btnA);
            butCont.appendChild(btnB);

            li.appendChild(nameCol);
            li.appendChild(posCol);
            li.appendChild(ovrCol);
            li.appendChild(slryCol);
            li.appendChild(butCont);

            playerList.appendChild(li);
        })
    } 
}

filterGuard.addEventListener('change', loadPlayerList);
filterWing.addEventListener('change', loadPlayerList);
filterBig.addEventListener('change', loadPlayerList);

loadPlayerList();