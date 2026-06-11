import { Player_catalog, PlayerType } from "./data.js";
//Abstraktni trida hrac, sestroji hrace podle dat v data.js(ts)
export class Player {
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
    get id() {
        return this._id;
    }
    //ziskani celeho jmena a salary, hrace
    get fullName() {
        return `${this._name} ${this._surname}`;
    }
    get salary() {
        const _sal = Math.round(this._salary / 1000000);
        return _sal;
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
export const activePlayers = Player_catalog.map(data => {
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
    set name(newName) {
        this._name = newName;
    }
    addPlayer(player) {
        const currentPay = this.getTotalSalary();
        //kontrolni prvky aby tym dodrzoval pravidla
        if (this._roster.length === 5) {
            console.error(`Tým je plný. Hráče ${player.fullName} nelze přidat do týmu!`);
            return false;
        }
        if (this._roster.some(p => p.id === player.id)) { //aby v tymu nebyli duplicitni hraci
            console.error(`CHYBA: Nelze přidat hráče ${player.fullName} do týmu ${this._name}. Hráč už v týmu je!`);
            return false;
        }
        if (currentPay + player.salary > this._salaryCap) {
            console.error(`CHYBA: Nelze přidat hráče ${player.fullName} do týmu ${this._name}. Plat překračuje limit pro výplaty!`);
            return false;
        }
        this._roster.push(player);
        console.log(`Hráč přídán do týmu`);
        return true;
    }
    delPlayer(player) {
        const index = this._roster.indexOf(player);
        if (index !== -1) {
            this._roster.splice(index, 1); //pomoci splice odebreme hrace :P
            return true;
        }
        return false;
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
        });
        console.log(`Celkový plat: $${this.getTotalSalary() / 1000000}M / $${this._salaryCap / 1000000}M`);
        console.log(`Team Rating: ${this.getTeamRating().toFixed(1)}`);
    }
    printWeaknesses() {
        const stats = this.getCategoryStats();
        const weaknesses = [];
        // Hranice pro slabinu nastavíme na 80 bodů
        const hranice = 80;
        if (this._roster.length > 0) {
            if (stats.defense < hranice)
                weaknesses.push(`<span style="color: #FCBF49;">!!! Defensive issues !!!</span>`);
            if (stats.shooting < hranice)
                weaknesses.push(`<span style="color: #FCBF49;">!!! Bad spacing/shooting !!!</span>`);
            if (stats.rebounding < hranice)
                weaknesses.push(`<span style="color: #FCBF49;">!!! Weak rebounding !!!</span>`);
            if (stats.playmaking < hranice)
                weaknesses.push(`<span style="color: #FCBF49;">!!! Missing playmaking !!!</span>`);
            if (stats.scoring < hranice)
                weaknesses.push(`<span style="color: #FCBF49;">!!! Weak offense !!!</span>`);
        }
        else {
            return "";
        }
        if (weaknesses.length > 0) {
            return `${weaknesses.join(`<br><br>`)}`;
        }
        else {
            return `<p style="color: #25d164;">This team is balanced and doesn't have any glaring weaknesses.</p>`;
        }
    }
}
function simulateMatch(homeTeam, awayTeam) {
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
    // VYHODNOCENÍ
    console.log("\n--- VÝSLEDEK ---");
    if (homeMatchupPoints > awayMatchupPoints) {
        console.log(`Vítězí tým: ${homeTeam.name} (Skóre matchupů: ${homeMatchupPoints} : ${awayMatchupPoints})`);
    }
    else if (awayMatchupPoints > homeMatchupPoints) {
        console.log(`Vítězí tým: ${awayTeam.name} (Skóre matchupů: ${awayMatchupPoints} : ${homeMatchupPoints})`);
    }
    else {
        // Pokud je remíza na matchupy, rozhoduje celkový rating + štěstí
        console.log("Remíza v matchupech!");
        const homeOvr = homeTeam.getTeamRating() + (Math.random() * 2);
        const awayOvr = awayTeam.getTeamRating() + (Math.random() * 2);
        if (homeOvr > awayOvr) {
            console.log(`V těsné koncovce vítězí tým: ${homeTeam.name}!`);
        }
        else {
            console.log(`V těsné koncovce vítězí tým: ${awayTeam.name}!`);
        }
    }
}
