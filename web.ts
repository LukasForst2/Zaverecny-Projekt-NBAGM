import { Player, activePlayers, Team } from "./script.js";
//Zapisovani jmena tymu
//A
const teamAnameInp = document.getElementById(`teamAnameInp`) as HTMLInputElement;
const teamAhead = document.getElementById(`teamAheader`) as HTMLHeadingElement;
//B
const teamBnameInp = document.getElementById(`teamBnameInp`) as HTMLInputElement;
const teamBhead = document.getElementById(`teamBheader`) as HTMLHeadingElement;
//dva tymy na zapas
const teamA = new Team("Team A");
const teamB = new Team("Team B");
teamAhead.textContent = teamA.name;
teamBhead.textContent = teamB.name;

if (teamAnameInp && teamAhead) {
    teamAnameInp.addEventListener(`keydown`, (event: KeyboardEvent) => {
        if (event.key ===  `Enter`) {
            teamA.name = teamAnameInp.value;
            teamAnameInp.value = ``;
            teamAhead.textContent = teamA.name;
        }
    }) 
}
if (teamBnameInp && teamBhead) {
    teamBnameInp.addEventListener(`keydown`, (event: KeyboardEvent) => {
        if (event.key ===  `Enter`) {
            teamB.name = teamBnameInp.value;
            teamBnameInp.value = ``;
            teamBhead.textContent = teamB.name;
        }
    }) 
}
//Vyhledavac hracu, seznam

const players: Player[] = activePlayers;
const playerList = document.getElementById(`playerListUl`) as HTMLUListElement;
const filterGuard = document.getElementById('filterGuard') as HTMLInputElement;
const filterWing = document.getElementById('filterWing') as HTMLInputElement;
const filterBig = document.getElementById('filterBig') as HTMLInputElement;
const searchInp = document.getElementById('searchInp') as HTMLInputElement;

function loadPlayerList() {
    if (playerList) {
        playerList.innerHTML = '';

        //check na zaskrtnute pozice ve vyhledavaci
        const allowedPos: string[] = [];
        if (filterGuard.checked) allowedPos.push("Guard");
        if (filterWing.checked) allowedPos.push("Wing");
        if (filterBig.checked) allowedPos.push("BigMan");
        //check na text v searchbaru
        const searchText = searchInp.value.toLowerCase().trim();

        const filteredPlayers = players.filter(p => {
            const matchPos = allowedPos.includes(p.position);
            const matchTxt = p.fullName.toLowerCase().includes(searchText);
            return matchPos && matchTxt;
        })

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
                const baller = activePlayers.find(b => b.fullName === `${p.fullName}` );
                if (baller) {
                    teamA.addPlayer(baller);
                    console.log(`Hráč přídán do týmu A`);
                    teamA.printRoster();
                }
            })

            const btnB = document.createElement(`button`);
            btnB.textContent = `+B`;
            btnB.addEventListener(`click`, () => {
                const baller = activePlayers.find(b => b.fullName === `${p.fullName}` );
                if (baller) {
                    teamB.addPlayer(baller);
                    console.log(`Hráč přídán do týmu B`);
                    teamB.printRoster();
                }
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

//naslouchaci
filterGuard.addEventListener('change', loadPlayerList);
filterWing.addEventListener('change', loadPlayerList);
filterBig.addEventListener('change', loadPlayerList);

searchInp.addEventListener('input', loadPlayerList);

loadPlayerList();