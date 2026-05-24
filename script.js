import { Player_catalog, PlayerType } from "./data.js";
//Abstraktni trida hrac, sestroji hrace podle dat v data.js(ts)
class Player {
    constructor(data) {
        if (data.salary < 0)
            throw new Error(`Hráč ${data.name} má neplatný plat!`); // pojistka, podle zadani
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
    // ziskani statistik kvuli lepsimu algoritmu na vypocet vysledku zapasu
    get scoring() { return this._scoring; }
    get shooting() { return this._shooting; }
    get playmaking() { return this._playmaking; }
    get defense() { return this._defense; }
    get rebounding() { return this._rebounding; }
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
    getCategoryStats() {
        if (this._roster.length === 0)
            return { scoring: 0, shooting: 0, playmaking: 0, defense: 0, rebounding: 0 };
        let scoring = 0, shooting = 0, playmaking = 0, defense = 0, rebounding = 0;
        this._roster.forEach(p => {
            scoring += p.scoring;
            shooting += p.shooting;
            playmaking += p.playmaking;
            defense += p.defense;
            rebounding += p.rebounding;
        });
        const count = this._roster.length;
        return {
            scoring: scoring / count,
            shooting: shooting / count,
            playmaking: playmaking / count,
            defense: defense / count,
            rebounding: rebounding / count
        };
    }
    printRoster() {
        console.log(`\n--- TÝM: ${this._name.toUpperCase()} ---`);
        this._roster.forEach(p => {
            console.log(`- ${p.fullName} | Pozice: ${p.position} | OVR: ${p.calcOverall().toFixed(1)} | $${p.salary / 1000000}M`);
        });
        console.log(`Celkový plat: $${this.getTotalSalary() / 1000000}M / $${this._salaryCap / 1000000}M`);
        console.log(`Team Rating: ${this.getTeamRating().toFixed(1)}`);
    }
    printWeaknesses() {
        const stats = this.getCategoryStats();
        const weaknesses = [];
        // Hranice pro slabinu nastavíme na 75 bodů
        const hranice = 80;
        if (stats.defense < hranice)
            weaknesses.push(`Děravá obrana (pod ${hranice})`);
        if (stats.shooting < hranice)
            weaknesses.push(`Špatný spacing/střelba (pod ${hranice})`);
        if (stats.rebounding < hranice)
            weaknesses.push(`Problém na doskoku (pod ${hranice})`);
        if (stats.playmaking < hranice)
            weaknesses.push(`Chybí tvůrce hry (pod ${hranice})`);
        if (stats.scoring < hranice)
            weaknesses.push(`Slabá ofenzíva (pod ${hranice})`);
        console.log(`\n--- SKAUTING REPORT: ${this._name} ---`);
        if (weaknesses.length > 0) {
            console.log(`Slabiny týmu: ${weaknesses.join(", ")}`);
        }
        else {
            console.log(`Tým je skvěle vyvážený, nemá žádnou výraznou slabinu.`);
        }
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
const cade = activePlayers.find(p => p.fullName === "Kyle Lowry");
const luka = activePlayers.find(p => p.fullName === "Luka Doncic");
const maxey = activePlayers.find(p => p.fullName === "Tyrese Maxey");
const barnes = activePlayers.find(p => p.fullName === "Scottie Barnes");
const pwat = activePlayers.find(p => p.fullName === "Peyton Watson");
const gobert = activePlayers.find(p => p.fullName === "Isaiah Stewart");
if (jokic)
    teamA.addPlayer(jokic);
if (murray)
    teamA.addPlayer(murray);
//if (ag) teamA.addPlayer(ag);
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
//if (pwat) teamB.addPlayer(pwat);
if (gobert)
    teamB.addPlayer(gobert);
/*teamA.printRoster();
teamB.printRoster(); */
/*Algoritmus vypoctu zapasu, pouzijeme porovnani jednotlivych statistik tymu, kdo vyhraje vice kategorii, vyhraje zapas
function simulateMatch(homeTeam: Team, awayTeam: Team): void {

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
simulateMatch(teamA,teamB); */
function simulateAdvancedMatch(homeTeam, awayTeam) {
    console.log(`\n=== ZÁPAS: ${homeTeam.name} vs ${awayTeam.name} ===`);
    if (homeTeam._roster.length !== 5) { // musi byt plny pocet hracu v tymu
        console.log(`Tým ${homeTeam.name} nemá plný počet hráčů. Zápas nelze odehrát.`);
        return;
    }
    if (awayTeam._roster.length !== 5) {
        console.log(`Tým ${awayTeam.name} nemá plný počet hráčů. Zápas nelze odehrát.`);
        return;
    }
    const home = homeTeam.getCategoryStats();
    const away = awayTeam.getCategoryStats();
    let homeMatchupPoints = 0;
    let awayMatchupPoints = 0;
    console.log("\n--- HEAD-TO-HEAD MATCHUPS ---");
    // 1. Domácí útok vs Obrana hostů
    const homeOffense = (home.scoring + home.shooting) / 2;
    console.log(`Útok ${homeTeam.name} (${homeOffense.toFixed(1)}) vs Obrana ${awayTeam.name} (${away.defense.toFixed(1)})`);
    if (homeOffense > away.defense) {
        homeMatchupPoints++;
        console.log(" -> Bod pro domácí ofenzívu!");
    }
    else {
        awayMatchupPoints++;
        console.log(" -> Bod pro obranu hostů!");
    }
    // 2. Útok hostů vs Obrana domácích
    const awayOffense = (away.scoring + away.shooting) / 2;
    console.log(`Útok ${awayTeam.name} (${awayOffense.toFixed(1)}) vs Obrana ${homeTeam.name} (${home.defense.toFixed(1)})`);
    if (awayOffense > home.defense) {
        awayMatchupPoints++;
        console.log(" -> Bod pro ofenzívu hostů!");
    }
    else {
        homeMatchupPoints++;
        console.log(" -> Bod pro domácí obranu!");
    }
    // 3. Playmaking duel
    console.log(`Tvorba hry: ${home.playmaking.toFixed(1)} vs ${away.playmaking.toFixed(1)}`);
    if (home.playmaking > away.playmaking) {
        homeMatchupPoints++;
        console.log(` -> ${homeTeam.name} má lepší pohyb míče!`);
    }
    else {
        awayMatchupPoints++;
        console.log(` -> ${awayTeam.name} má lepší pohyb míče!`);
    }
    // 4. Souboj pod košem (Doskoky)
    console.log(`Souboj pod košem (Rebounds): ${home.rebounding.toFixed(1)} vs ${away.rebounding.toFixed(1)}`);
    if (home.rebounding > away.rebounding) {
        homeMatchupPoints++;
        console.log(` -> ${homeTeam.name} vládne na doskoku!`);
    }
    else {
        awayMatchupPoints++;
        console.log(` -> ${awayTeam.name} vládne na doskoku!`);
    }
    // VYHODNOCENÍ VÝSLEDKU
    console.log("\n--- VÝSLEDEK ---");
    if (homeMatchupPoints > awayMatchupPoints) {
        console.log(`🏆 Vítězí tým: ${homeTeam.name} (Skóre matchupů: ${homeMatchupPoints} : ${awayMatchupPoints})`);
    }
    else if (awayMatchupPoints > homeMatchupPoints) {
        console.log(`🏆 Vítězí tým: ${awayTeam.name} (Skóre matchupů: ${awayMatchupPoints} : ${homeMatchupPoints})`);
    }
    else {
        // Pokud je remíza na matchupy, rozhoduje celkový rating + štěstí
        console.log("Remíza v matchupech! Rozhoduje celková síla a štěstí v koncovce...");
        const homeOvr = homeTeam.getTeamRating() + (Math.random() * 2);
        const awayOvr = awayTeam.getTeamRating() + (Math.random() * 2);
        if (homeOvr > awayOvr) {
            console.log(`🏆 V těsné koncovce vítězí tým: ${homeTeam.name}!`);
        }
        else {
            console.log(`🏆 V těsné koncovce vítězí tým: ${awayTeam.name}!`);
        }
    }
}
// Spuštění
simulateAdvancedMatch(teamA, teamB);
