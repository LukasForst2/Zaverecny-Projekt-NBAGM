import { Player_catalog, PlayerType } from "./data.js";
//Abstraktni trida hrac, sestroji hrace podle dat v data.js(ts)
class Player {
    constructor(data) {
        this._id = data.id;
        this._name = data.name;
        this._surname = data.surname;
        this._salary = data.salary;
        this._scoring = data.scoring;
        this._shooting = data.shooting;
        this._playmaking = data.playmaking;
        this._defense = data.defense;
        this._rebounding = data.rebounding;
    }
    //ziskani celeho jmena a salary, hrace
    get fullName() {
        return `${this._name} ${this._surname}`;
    }
    get salary() {
        return this._salary;
    }
}
/*Potomci hrace (guard, wing, bigman), budou si pocitat over all rating
    kazdy typ hrace ma jinou metodu na vypocet, kazdy skill se vynasobi multiplierem (podle vahy pro poizici), soucet multipliers = 1, aby overall byl do 100, :thumbs_up"
    Rating tky zaokrouhlime na cele cisla pomoci math.round()
*/
export class Guard extends Player {
    calcOverall() {
        const rating = Math.round((this._shooting * 0.4) + (this._playmaking * 0.3) + (this._scoring * 0.2) + (this._defense * 0.05) + (this._rebounding * 0.05));
        return rating;
        // u guarda zalezi na strelbe a iniciaci ofenzivi
    }
    get position() {
        return "Guard";
    }
}
export class Wing extends Player {
    calcOverall() {
        const rating = Math.round((this._shooting * 0.2) + (this._playmaking * 0.15) + (this._scoring * 0.25) + (this._defense * 0.3) + (this._rebounding * 0.1));
        return rating;
        // u kridel na vsestrannosti
    }
    get position() {
        return "Wing";
    }
}
export class BigMan extends Player {
    calcOverall() {
        const rating = Math.round((this._shooting * 0.05) + (this._playmaking * 0.1) + (this._scoring * 0.15) + (this._defense * 0.3) + (this._rebounding * 0.4));
        return rating;
        // doskoky, bloky
    }
    get position() {
        return "BigMan";
    }
}
//Pomoci switche "ozivime" hrace podle typu
const activePlayers = Player_catalog.map(data => {
    switch (data.type) {
        case PlayerType.Guard:
            return new Guard(data);
        case PlayerType.Wing:
            return new Wing(data);
        case PlayerType.BigMan:
            return new BigMan(data);
        default:
            throw new Error("Neznámý typ hráče"); //ochrana pred bugem
    }
});
/*test v konzoli, vyjede tabulka s ratingy
console.log("--- Seznam hracu na trhu ---");

activePlayers.forEach(player => {
    const rating = player.calcOverall();
    console.log(`${player.fullName} | Pozice: ${player.position} | Rating: ${rating} | Plat: $${(player.salary / 1000000)}M`);
});*/
//Trida pro sestaveni tymu
export class Team {
    constructor(name) {
        this._roster = []; // pole s hraci na tymu, public aby se pozdeji dalo zkontrolovat pocet hracu v tymu
        this._salaryCap = 185000000; //cap 180M aby byla simulace balancovana, readonly aby nesel menit
        this._name = name;
    }
    get name() {
        return this._name;
    }
    addPlayer(player) {
        const currentPay = this.getTotalSalary();
        if (currentPay + player.salary > this._salaryCap) {
            console.error(`CHYBA: Nelze přidat hráče ${player.fullName} do týmu ${this._name}. Plat překračuje limit pro výplaty!`);
            return false;
        }
        this._roster.push(player);
        return true;
    }
    getTotalSalary() {
        return this._roster.reduce((sum, player) => sum + player.salary, 0);
    }
    getTeamRating() {
        if (this._roster.length === 0)
            return 0;
        const totalRating = this._roster.reduce((sum, player) => sum + player.calcOverall(), 0);
        const overallRating = totalRating / this._roster.length;
        return overallRating;
    }
    printRoster() {
        console.log(`\n--- TÝM: ${this._name.toUpperCase()} ---`);
        this._roster.forEach(p => {
            console.log(`- ${p.fullName} | Pozice: ${p.position} | OVR: ${p.calcOverall().toFixed(1)} | $${p.salary / 1000000}M`);
        });
        console.log(`Celkový plat: $${this.getTotalSalary() / 1000000}M / $${this._salaryCap / 1000000}M`);
        console.log(`Team Rating: ${this.getTeamRating().toFixed(1)}`);
    }
}
//vytvoreni dvou tymu na test v konzoli, dobrou noc
/**/
const teamA = new Team("Kutná Hora");
const teamB = new Team("Prágl");
const jokic = activePlayers.find(p => p.fullName === "Nikola Jokic");
const murray = activePlayers.find(p => p.fullName === "Jamal Murray");
const ag = activePlayers.find(p => p.fullName === "Aaron Gordon");
const miller = activePlayers.find(p => p.fullName === "Brandon Miller");
const cade = activePlayers.find(p => p.fullName === "Cade Cunningham");
const luka = activePlayers.find(p => p.fullName === "Luka Doncic");
const maxey = activePlayers.find(p => p.fullName === "Tyrese Maxey");
const barnes = activePlayers.find(p => p.fullName === "Scottie Barnes");
const pwat = activePlayers.find(p => p.fullName === "Peyton Watson");
const gobert = activePlayers.find(p => p.fullName === "Rudy Gobert");
if (jokic)
    teamA.addPlayer(jokic);
if (murray)
    teamA.addPlayer(murray);
if (ag)
    teamA.addPlayer(ag);
if (miller)
    teamA.addPlayer(miller);
if (cade)
    teamA.addPlayer(cade);
if (luka)
    teamB.addPlayer(luka);
if (maxey)
    teamB.addPlayer(maxey);
if (barnes)
    teamB.addPlayer(barnes);
if (pwat)
    teamB.addPlayer(pwat);
if (gobert)
    teamB.addPlayer(gobert);
teamA.printRoster();
teamB.printRoster();
//Algoritmus vypoctu zapasu
function simulateMatch(homeTeam, awayTeam) {
    console.log(`\n=== ZÁPAS: ${homeTeam.name} vs ${awayTeam.name}===`);
    if (homeTeam._roster.length !== 5 || awayTeam._roster.length !== 5) { // musi byt plny pocet hracu v tymu
        console.log("Jeden z týmů nemá plný počet hráčů. Zápas nelze odehrát.");
        return;
    }
    const homeScore = homeTeam.getTeamRating() + (Math.random() * 10 - 5);
    const awayScore = awayTeam.getTeamRating() + (Math.random() * 10 - 5);
    console.log(`Skóre domácího týmu: ${homeScore}`);
    console.log(`Skóre týmu hostú: ${awayScore}`);
    if (homeScore > awayScore) {
        console.log(`Vítězný tým: ${homeTeam.name}`);
    }
    else if (awayScore > homeScore) {
        console.log(`Vítězný tým: ${awayTeam.name}`);
    }
    else {
        console.log("Remíza");
    }
}
simulateMatch(teamA, teamB);
