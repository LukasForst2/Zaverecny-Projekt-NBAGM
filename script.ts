import { Player_catalog, PlayerData, PlayerType} from "./data.js";

//Abstraktni trida hrac, sestroji hrace podle dat v data.js(ts)
export abstract class Player {
    private _id: number;
    private _name: string;
    private _surname: string;
    private _salary: number;

    //Protected, aby meli pristup k infu pro vypocet ratingu
    protected _scoring: number;
    protected _shooting: number;
    protected _playmaking: number;
    protected _defense: number;
    protected _rebounding: number;

    public abstract calcOverall(): number;
    public abstract get position(): string;

    constructor(data: PlayerData) {
        if (data.salary < 0) throw new Error(`Hráč ${data.name} má neplatný plat!`); // pojistka, podle zadani
        
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
    public get fullName(): string {
        return `${this._name} ${this._surname}`; 
    }
    public get salary(): number {
        return this._salary;
    }
    // ziskani statistik kvuli lepsimu algoritmu na vypocet vysledku zapasu
    public get scoring(): number { return this._scoring; }
    public get shooting(): number { return this._shooting; }
    public get playmaking(): number { return this._playmaking; }
    public get defense(): number { return this._defense; }
    public get rebounding(): number { return this._rebounding; }
}

/*Potomci hrace (guard, wing, bigman), budou si pocitat over all rating
    kazdy typ hrace ma jinou metodu na vypocet, kazdy skill se vynasobi multiplierem (podle vahy pro poizici), soucet multipliers = 1, aby overall byl do 100, :thumbs_up"
    Rating tky zaokrouhlime na cele cisla pomoci math.round()
*/
export class Guard extends Player {
    public calcOverall(): number {
        const rating = Math.round((this._shooting * 0.4) + (this._playmaking * 0.3) + (this._scoring * 0.2) + (this._defense * 0.05) + (this._rebounding * 0.05));
        return rating;
        // u guarda zalezi na strelbe a iniciaci ofenzivi
    }
    public get position(): string {
        return "Guard";
    }
}

export class Wing extends Player {
    public calcOverall(): number {
        const rating = Math.round( (this._shooting * 0.2) + (this._playmaking * 0.15) + (this._scoring * 0.25) + (this._defense * 0.3) + (this._rebounding * 0.1));
        return rating;
        // u kridel na vsestrannosti
    }
    public get position(): string {
        return "Wing";
    }
}

export class BigMan extends Player {
    public calcOverall(): number {
        const rating = Math.round((this._shooting * 0.05) + (this._playmaking * 0.1) + (this._scoring * 0.15) + (this._defense * 0.3) + (this._rebounding * 0.4));
        return rating;
        // doskoky, bloky
    }
    public get position(): string {
        return "BigMan";
    }
}

//Pomoci switche "ozivime" hrace podle typu

export const activePlayers: Player[] = Player_catalog.map(data =>  {
        switch(data.type) {
            case PlayerType.Guard:
                return new Guard(data);
            case PlayerType.Wing:
                return new Wing(data);
            case PlayerType.BigMan:
                return new BigMan(data);
            default:
            throw new Error("Neznámý typ hráče"); //ochrana pred bugem
        }
    }
)

/*test v konzoli, vyjede tabulka s ratingy
console.log("--- Seznam hracu na trhu ---");

activePlayers.forEach(player => {
    const rating = player.calcOverall();
    console.log(`${player.fullName} | Pozice: ${player.position} | Rating: ${rating} | Plat: $${(player.salary / 1000000)}M`);
});*/

//Trida pro sestaveni tymu
export class Team {
    private _name: string;
    public _roster: Player[] = []; // pole s hraci na tymu, public aby se pozdeji dalo zkontrolovat pocet hracu v tymu
    private readonly _salaryCap: number = 185000000 //cap 180M aby byla simulace balancovana, readonly aby nesel menit

    constructor(name:string) {
        this._name = name;
    }

    public get name(): string {
        return this._name;
    }

    public set name(newName: string) {
        this._name = newName;
    }

    public addPlayer(player: Player): boolean {
        const currentPay = this.getTotalSalary();
        if (currentPay + player.salary > this._salaryCap) {
            console.error(`CHYBA: Nelze přidat hráče ${player.fullName} do týmu ${this._name}. Plat překračuje limit pro výplaty!`);
            return false;
        }
        this._roster.push(player);
        return true;
    }

    public getTotalSalary():number {
        return this._roster.reduce((sum,player) => sum + player.salary, 0 );
    }

    public getTeamRating(): number {
        if (this._roster.length === 0) return 0;
        
        const totalRating = this._roster.reduce((sum, player) => sum + player.calcOverall(), 0)
        const overallRating = totalRating / this._roster.length;
        return overallRating;
    }

    public getCategoryStats() {
        if(this._roster.length === 0) return { scoring: 0, shooting: 0, playmaking: 0, defense: 0, rebounding: 0 };

        let scoring = 0, shooting = 0, playmaking = 0, defense = 0, rebounding = 0;

        this._roster.forEach(p=> {
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

    public printRoster(): void { //vypiseme roster do konzole
        console.log(`\n--- TÝM: ${this._name.toUpperCase()} ---`);
        this._roster.forEach(p => {
            console.log(`- ${p.fullName} | Pozice: ${p.position} | OVR: ${p.calcOverall().toFixed(1)} | $${p.salary / 1000000}M`);
        });
        console.log(`Celkový plat: $${this.getTotalSalary() / 1000000}M / $${this._salaryCap / 1000000}M`);
        console.log(`Team Rating: ${this.getTeamRating().toFixed(1)}`);
    }

    public printWeaknesses():void {
        const stats = this.getCategoryStats();
        const weaknesses: string[] = [];
        // Hranice pro slabinu nastavíme na 75 bodů
        const hranice:number = 80;

        if (stats.defense < hranice) weaknesses.push(`Děravá obrana (pod ${hranice})`);
        if (stats.shooting < hranice) weaknesses.push(`Špatný spacing/střelba (pod ${hranice})`);
        if (stats.rebounding < hranice) weaknesses.push(`Problém na doskoku (pod ${hranice})`);
        if (stats.playmaking < hranice) weaknesses.push(`Chybí tvůrce hry (pod ${hranice})`);
        if (stats.scoring < hranice) weaknesses.push(`Slabá ofenzíva (pod ${hranice})`);

        console.log(`\n--- SKAUTING REPORT: ${this._name} ---`);
        if (weaknesses.length > 0) {
            console.log(`Slabiny týmu: ${weaknesses.join(", ")}`);
        } else {
            console.log(`Tým je skvěle vyvážený, nemá žádnou výraznou slabinu.`);
        }
    }
}

//vytvoreni dvou tymu na test v konzoli
/*
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

if (jokic) teamA.addPlayer(jokic);
if (murray) teamA.addPlayer(murray);
//if (ag) teamA.addPlayer(ag);
if (miller) teamA.addPlayer(miller);
if (cade) teamA.addPlayer(cade);

if (luka) teamB.addPlayer(luka);
if (maxey) teamB.addPlayer(maxey);
if (barnes) teamB.addPlayer(barnes);
//if (pwat) teamB.addPlayer(pwat);
if (gobert) teamB.addPlayer(gobert);
*/

function simulateMatch(homeTeam: Team, awayTeam: Team): void {
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
    
    if (homeOffense > away.defense) { homeMatchupPoints++; console.log(" -> Bod pro domácí ofenzívu!"); }
    else { awayMatchupPoints++; console.log(" -> Bod pro obranu hostů!"); }

    // 2. Útok hostů vs Obrana domácích
    const awayOffense = (away.scoring + away.shooting) / 2;

    console.log(`Útok ${awayTeam.name} (${awayOffense.toFixed(1)}) vs Obrana ${homeTeam.name} (${home.defense.toFixed(1)})`);
    
    if (awayOffense > home.defense) { awayMatchupPoints++; console.log(" -> Bod pro ofenzívu hostů!"); }
    else { homeMatchupPoints++; console.log(" -> Bod pro domácí obranu!"); }

    // 3. Playmaking duel
    console.log(`Tvorba hry: ${home.playmaking.toFixed(1)} vs ${away.playmaking.toFixed(1)}`);
    if (home.playmaking > away.playmaking) { homeMatchupPoints++; console.log(` -> ${homeTeam.name} má lepší pohyb míče!`); }
    else { awayMatchupPoints++; console.log(` -> ${awayTeam.name} má lepší pohyb míče!`); }

    // 4. Souboj pod košem (Doskoky)
    console.log(`Souboj pod košem (Rebounds): ${home.rebounding.toFixed(1)} vs ${away.rebounding.toFixed(1)}`);
    if (home.rebounding > away.rebounding) { homeMatchupPoints++; console.log(` -> ${homeTeam.name} vládne na doskoku!`); }
    else { awayMatchupPoints++; console.log(` -> ${awayTeam.name} vládne na doskoku!`); }

    // VYHODNOCENÍ
    console.log("\n--- VÝSLEDEK ---");
    if (homeMatchupPoints > awayMatchupPoints) {
        console.log(`Vítězí tým: ${homeTeam.name} (Skóre matchupů: ${homeMatchupPoints} : ${awayMatchupPoints})`);
    } else if (awayMatchupPoints > homeMatchupPoints) {
        console.log(`Vítězí tým: ${awayTeam.name} (Skóre matchupů: ${awayMatchupPoints} : ${homeMatchupPoints})`);
    } else {
        // Pokud je remíza na matchupy, rozhoduje celkový rating + štěstí
        console.log("Remíza v matchupech!");
        const homeOvr = homeTeam.getTeamRating() + (Math.random() * 2);
        const awayOvr = awayTeam.getTeamRating() + (Math.random() * 2);
        
        if (homeOvr > awayOvr) {
            console.log(`V těsné koncovce vítězí tým: ${homeTeam.name}!`);
        } else {
            console.log(`V těsné koncovce vítězí tým: ${awayTeam.name}!`);
        }
    }
}