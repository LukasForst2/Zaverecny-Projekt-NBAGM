import { Player, activePlayers, Team, simulateMatch } from "./script.js";
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

const player1 = activePlayers.find(p => p.id === 5);
const player2 = activePlayers.find(p => p.id === 23); 
const player3 = activePlayers.find(p => p.id === 14);
const player4 = activePlayers.find(p => p.id === 2); 
const player5 = activePlayers.find(p => p.id === 4);
if(player1 && player2 && player3 && player4 && player5){
    teamA.addPlayer(player1);
    teamB.addPlayer(player1);
    teamA.addPlayer(player2);
    teamB.addPlayer(player2);
    teamA.addPlayer(player3);
    teamB.addPlayer(player3);
    teamA.addPlayer(player4);
    teamB.addPlayer(player4);
    teamA.addPlayer(player5);
    teamB.addPlayer(player5);
}

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
            //Kdyz je hrac uz v tymu tak se nebudeme zobrazovat v listu hracu
            const isAvailable = !teamA._roster.some(r => r.id === p.id) && !teamB._roster.some(r => r.id === p.id);
            
            return matchPos && matchTxt && isAvailable;
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
            ovrCol.textContent = `Rating: ${p.calcOverall().toString()}`;

            //ctvrty sloupec, plat
            const slryCol = document.createElement(`span`);
            slryCol.textContent = `Salary: $${p.salary}M`;

            //paty sloupec tlacitka na pridani do tymu A/B
            const butCont = document.createElement(`div`);
            butCont.className = `add-btn`;

            const btnA = document.createElement(`button`);
            btnA.textContent = `+A`;
            btnA.addEventListener(`click`, () => {
                const baller = activePlayers.find(b => b.id === p.id);
                if (baller) {
                    if (teamA.addPlayer(baller)) {
                        loadPlayerList(); // Přenačte seznam bez přidaného hráče
                        loadTeamRoster(); // Překreslí sestavy v UI
                        loadTeamStats();
                        weaknessList();
                    }
                    teamA.printRoster();
                }
            })

            const btnB = document.createElement(`button`);
            btnB.textContent = `+B`;
            btnB.addEventListener(`click`, () => {
                const baller = activePlayers.find(b => b.id === p.id);
                if (baller) {
                    if (teamB.addPlayer(baller)) {
                        loadPlayerList(); // Přenačte seznam bez přidaného hráče
                        loadTeamRoster(); // Překreslí sestavy v UI
                        loadTeamStats();
                        weaknessList();
                    }
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

const teamAChart = document.getElementById('teamAchart') as HTMLDivElement;
const teamBChart = document.getElementById('teamBchart') as HTMLDivElement;

const max_roster_size = 5;

//funkce na zivy zapis tymu do chartu
function loadTeamRoster(){
    if(teamAChart) {
        teamAChart.innerHTML = ``; //clean
        teamA._roster.forEach((p) => {
            const slot = document.createElement(`div`);
            slot.className = `slot`;

            const info = document.createElement('span');
            info.innerHTML = `<p>${p.fullName}</p>|${p.position} |Rating: ${p.calcOverall()} |Salary: $${p.salary}M|<br><small>|Scoring: ${p.scoring}| Shooting: ${p.shooting}| Playmaking: ${p.playmaking}|<br>|Defense: ${p.defense}| Rebounding: ${p.rebounding}|</small>`;
            info.className = `info`;

            const removeBtn = document.createElement(`button`);
            removeBtn.className = `remove-btn`;
            removeBtn.textContent = 'X';
            //vizualni odebirani hracu z tymu
            removeBtn.addEventListener(`click`, () => {
                if (teamA.delPlayer(p)) {
                    loadTeamRoster(); // Aktualizuje tým po odebrání
                    loadPlayerList(); // Vrátí hráče zpět do tabulky
                    loadTeamStats();
                    weaknessList();
                }
            })

            slot.appendChild(info);
            slot.appendChild(removeBtn);
            teamAChart.appendChild(slot);
        })
        //dokresleni prazdnych slotu
        const emptySlotsNeeded = max_roster_size - teamA._roster.length;

        for (let i = 0; i < emptySlotsNeeded; i++) {
            const emptySlot = document.createElement('div');
            emptySlot.className = 'slot-empty';
            emptySlot.textContent = 'Empty slot...';
            teamAChart.appendChild(emptySlot);
        }
    }

    if(teamBChart) {
        teamBChart.innerHTML = ``; //clean
        teamB._roster.forEach((p) => {
            const slot = document.createElement(`div`);
            slot.className = `slot`;

            const info = document.createElement('span');
            info.innerHTML = `<p>${p.fullName}</p>|${p.position} |Rating: ${p.calcOverall()} |Salary: $${p.salary}M|<br><small>|Scoring: ${p.scoring}| Shooting: ${p.shooting}| Playmaking: ${p.playmaking}|<br>|Defense: ${p.defense}| Rebounding: ${p.rebounding}|</small>`;
            info.className = `info`;

            const removeBtn = document.createElement(`button`);
            removeBtn.className = `remove-btn`;
            removeBtn.textContent = 'X';
            //vizualni odebirani hracu z tymu
            removeBtn.addEventListener(`click`, () => {
                if (teamB.delPlayer(p)) {
                    loadTeamRoster(); // aktualizuje team
                    loadPlayerList(); // vrati hrace zpet
                    loadTeamStats(); //aktualizuje staty
                    weaknessList();
                }
            })

            slot.appendChild(info);
            slot.appendChild(removeBtn);
            teamBChart.appendChild(slot);
        })
        //dokresleni prazdnych slotu
        const emptySlotsNeededB = max_roster_size - teamB._roster.length;

        for (let i = 0; i < emptySlotsNeededB; i++) {
            const emptySlot = document.createElement('div');
            emptySlot.className = 'slot-empty';
            emptySlot.textContent = 'Empty slot...';
            teamBChart.appendChild(emptySlot);
        }
    }
}
loadTeamRoster();

function loadTeamStats(){ //funkce na vypsani statistik tymu
    // Team A stats
    const teamACapEl = document.getElementById('teamAcap') as HTMLDivElement;
    const teamAScoreEl = document.getElementById('teamAscoring') as HTMLDivElement;
    const teamAShootEl = document.getElementById('teamAshooting') as HTMLDivElement;
    const teamAPlaymakEl = document.getElementById('teamAplaymaking') as HTMLDivElement;
    const teamADefEl = document.getElementById('teamAdefense') as HTMLDivElement;
    const teamARebEl = document.getElementById('teamArebounding') as HTMLDivElement;
    const teamAOvrEl = document.getElementById('teamAoverall') as HTMLDivElement;

    // Team B stats
    const teamBCapEl = document.getElementById('teamBcap') as HTMLDivElement;
    const teamBScoreEl = document.getElementById('teamBscoring') as HTMLDivElement;
    const teamBShootEl = document.getElementById('teamBshooting') as HTMLDivElement;
    const teamBPlaymakEl = document.getElementById('teamBplaymaking') as HTMLDivElement;
    const teamBDefEl = document.getElementById('teamBdefense') as HTMLDivElement;
    const teamBRebEl = document.getElementById('teamBrebounding') as HTMLDivElement;
    const teamBOvrEl = document.getElementById('teamBoverall') as HTMLDivElement;

    // ziskani statu pomoci funkce z classy
    const statsA = teamA.getCategoryStats();
    const statsB = teamB.getCategoryStats();

    // vypis Team A stats
    teamACapEl.innerHTML = `<p>Salary Cap:</p> <span>$${teamA.getTotalSalary()}M / $185M</span>`;
    teamAScoreEl.innerHTML = `<p>Scoring:</p> <span>${statsA.scoring.toFixed(1)}</span>`;
    teamAShootEl.innerHTML = `<p>Shooting:</p> <span>${statsA.shooting.toFixed(1)}</span>`;
    teamAPlaymakEl.innerHTML = `<p>Playmaking:</p> <span>${statsA.playmaking.toFixed(1)}</span>`;
    teamADefEl.innerHTML = `<p>Defense:</p> <span>${statsA.defense.toFixed(1)}</span>`;
    teamARebEl.innerHTML = `<p>Rebounding:</p> <span>${statsA.rebounding.toFixed(1)}</span>`;
    teamAOvrEl.innerHTML = `<p>Overall Rating:</p> <span>${teamA.getTeamRating().toFixed(1)}</span>`;

    // vypis Team B stats
    teamBCapEl.innerHTML = `<p>Salary Cap:</p> <span>$${teamB.getTotalSalary()}M / $185M</span>`;
    teamBScoreEl.innerHTML = `<p>Scoring:</p> <span>${statsB.scoring.toFixed(1)}</span>`;
    teamBShootEl.innerHTML = `<p>Shooting:</p> <span>${statsB.shooting.toFixed(1)}</span>`;
    teamBPlaymakEl.innerHTML = `<p>Playmaking:</p> <span>${statsB.playmaking.toFixed(1)}</span>`;
    teamBDefEl.innerHTML = `<p>Defense:</p> <span>${statsB.defense.toFixed(1)}</span>`;
    teamBRebEl.innerHTML = `<p>Rebounding:</p> <span>${statsB.rebounding.toFixed(1)}</span>`;
    teamBOvrEl.innerHTML = `<p>Overall Rating:</p> <span>${teamB.getTeamRating().toFixed(1)}</span>`;
}
loadTeamStats();

const weakA = document.getElementById(`weaknessesA`) as HTMLDivElement;
const weakB = document.getElementById(`weaknessesB`) as HTMLDivElement;

function weaknessList() {
    weakA.innerHTML = teamA.printWeaknesses();
    weakB.innerHTML= teamB.printWeaknesses();
}
weaknessList();

// Simulace zápasu
const simBtn = document.getElementById('simulateBtn') as HTMLButtonElement;
const simRes = document.querySelector('.simulate-res') as HTMLDivElement;

if (simBtn && simRes) {
    simBtn.addEventListener('click', () => {
        simRes.innerHTML = simulateMatch(teamA, teamB);
    });
}