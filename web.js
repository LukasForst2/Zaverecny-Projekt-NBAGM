import { activePlayers, Team, simulateMatch } from "./script.js";
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
const matchHeader = document.getElementById('matchHeader');
if (matchHeader)
    matchHeader.textContent = `${teamA.name} vs ${teamB.name}`;
if (teamAnameInp && teamAhead) {
    teamAnameInp.addEventListener(`keydown`, (event) => {
        if (event.key === `Enter`) {
            teamA.name = teamAnameInp.value;
            teamAnameInp.value = ``;
            teamAhead.textContent = teamA.name;
            if (matchHeader)
                matchHeader.textContent = `${teamA.name} vs ${teamB.name}`;
        }
    });
}
if (teamBnameInp && teamBhead) {
    teamBnameInp.addEventListener(`keydown`, (event) => {
        if (event.key === `Enter`) {
            teamB.name = teamBnameInp.value;
            teamBnameInp.value = ``;
            teamBhead.textContent = teamB.name;
            if (matchHeader)
                matchHeader.textContent = `${teamA.name} vs ${teamB.name}`;
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
            //Kdyz je hrac uz v tymu tak se nebudeme zobrazovat v listu hracu
            const isAvailable = !teamA._roster.some(r => r.id === p.id) && !teamB._roster.some(r => r.id === p.id);
            return matchPos && matchTxt && isAvailable;
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
                    } else {
                        // Alarm na to ze hrace nelze pridat
                        btnA.textContent = teamA._roster.length === 5 ? `Full!` : `Too expensive!`;
                        btnA.style.backgroundColor = `#D62828`;
                        setTimeout(() => {
                            btnA.textContent = `+A`;
                            btnA.style.backgroundColor = ``;
                        }, 1500);
                    }
                    teamA.printRoster();
                }
            });
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
                    } else {
                        // Stejna logika pro tym B
                        btnB.textContent = teamB._roster.length === 5 ? `Full!` : `Too expensive!`;
                        btnB.style.backgroundColor = `#D62828`;
                        setTimeout(() => {
                            btnB.textContent = `+B`;
                            btnB.style.backgroundColor = ``;
                        }, 1500);
                    }
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
const teamAChart = document.getElementById('teamAchart');
const teamBChart = document.getElementById('teamBchart');
const max_roster_size = 5;
//funkce na zivy zapis tymu do chartu
function loadTeamRoster() {
    if (teamAChart) {
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
            });
            slot.appendChild(info);
            slot.appendChild(removeBtn);
            teamAChart.appendChild(slot);
        });
        //dokresleni prazdnych slotu
        const emptySlotsNeeded = max_roster_size - teamA._roster.length;
        for (let i = 0; i < emptySlotsNeeded; i++) {
            const emptySlot = document.createElement('div');
            emptySlot.className = 'slot-empty';
            emptySlot.textContent = 'Empty slot...';
            teamAChart.appendChild(emptySlot);
        }
    }
    if (teamBChart) {
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
            });
            slot.appendChild(info);
            slot.appendChild(removeBtn);
            teamBChart.appendChild(slot);
        });
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
function loadTeamStats() {
    // Team A stats
    const teamACapEl = document.getElementById('teamAcap');
    const teamAScoreEl = document.getElementById('teamAscoring');
    const teamAShootEl = document.getElementById('teamAshooting');
    const teamAPlaymakEl = document.getElementById('teamAplaymaking');
    const teamADefEl = document.getElementById('teamAdefense');
    const teamARebEl = document.getElementById('teamArebounding');
    const teamAOvrEl = document.getElementById('teamAoverall');
    // Team B stats
    const teamBCapEl = document.getElementById('teamBcap');
    const teamBScoreEl = document.getElementById('teamBscoring');
    const teamBShootEl = document.getElementById('teamBshooting');
    const teamBPlaymakEl = document.getElementById('teamBplaymaking');
    const teamBDefEl = document.getElementById('teamBdefense');
    const teamBRebEl = document.getElementById('teamBrebounding');
    const teamBOvrEl = document.getElementById('teamBoverall');
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
const weakA = document.getElementById(`weaknessesA`);
const weakB = document.getElementById(`weaknessesB`);
function weaknessList() {
    weakA.innerHTML = teamA.printWeaknesses();
    weakB.innerHTML = teamB.printWeaknesses();
}
weaknessList();
// Simulace zápasu
const simBtn = document.getElementById('simulateBtn');
const simRes = document.querySelector('.simulate-res');
if (simBtn && simRes) {
    simBtn.addEventListener('click', () => {
        simRes.innerHTML = simulateMatch(teamA, teamB);
    });
}
// Funkcionalita tlačítek pro smazání všech hráčů v týmu
const clearBtnA = document.getElementById('clearTeamA');
const clearBtnB = document.getElementById('clearTeamB');
if (clearBtnA) {
    clearBtnA.addEventListener('click', () => {
        teamA.clearTeam();
        loadTeamRoster();
        loadPlayerList();
        loadTeamStats();
        weaknessList();
    });
}
if (clearBtnB) {
    clearBtnB.addEventListener('click', () => {
        teamB.clearTeam();
        loadTeamRoster();
        loadPlayerList();
        loadTeamStats();
        weaknessList();
    });
}
