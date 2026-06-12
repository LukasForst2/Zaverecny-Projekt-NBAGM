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
        if (data.salary < 0) throw new Error(`Player ${data.name} has an invalid salary!`); // pojistka, podle zadani
        
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

    public get id(): number {
        return this._id;
    }
    
    //ziskani celeho jmena a salary, hrace
    public get fullName(): string {
        return `${this._name} ${this._surname}`; 
    }
    public get salary(): number {
        const _sal = Math.round(this._salary / 1000000);
        return _sal;
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
            throw new Error("Unknown player type"); //ochrana pred bugem
        }
    }
)

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
        //kontrolni prvky aby tym dodrzoval pravidla
        if (this._roster.length === 5) {
            console.error(`Team is full. Player ${player.fullName} cannot be added to the team!`);
            return false;
        }
        if (this._roster.some(p => p.id === player.id)) { //aby v tymu nebyli duplicitni hraci
            console.error(`ERROR: Cannot add player ${player.fullName} to team ${this._name}. Player is already in the team!`);
            return false;
        }
        if (currentPay + player.salary > (this._salaryCap / 1000000)) {
            console.error(`ERROR: Cannot add player ${player.fullName} to team ${this._name}. Salary exceeds the salary cap!`);
            return false;
        }
        this._roster.push(player);
        console.log(`Player added to the team`);
        return true;
    }
    public delPlayer(player: Player): boolean {
        const index = this._roster.indexOf(player);
        if (index !== -1) {
            this._roster.splice(index, 1); //pomoci splice odebreme hrace :P
            return true;
        }
        return false;
    }

    public clearTeam(): void {
        this._roster = [];
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
        console.log(`\n--- TEAM: ${this._name.toUpperCase()} ---`);
        this._roster.forEach(p => {
        });
        console.log(`Total salary: $${this.getTotalSalary()}M / $${this._salaryCap / 1000000}M`);
        console.log(`Team Rating: ${this.getTeamRating().toFixed(1)}`);
    }

    public printWeaknesses():string {
        const stats = this.getCategoryStats();
        const weaknesses: string[] = [];
        // Hranice pro slabinu nastavíme na 80 bodů
        const hranice:number = 80;

        if(this._roster.length > 0){
            if (stats.defense < hranice) weaknesses.push(`<span style="color: #FCBF49;">!!! Defensive issues !!!</span>`);
            if (stats.shooting < hranice) weaknesses.push(`<span style="color: #FCBF49;">!!! Bad spacing/shooting !!!</span>`);
            if (stats.rebounding < hranice) weaknesses.push(`<span style="color: #FCBF49;">!!! Weak rebounding !!!</span>`);
            if (stats.playmaking < hranice) weaknesses.push(`<span style="color: #FCBF49;">!!! Missing playmaking !!!</span>`);
            if (stats.scoring < hranice) weaknesses.push(`<span style="color: #FCBF49;">!!! Weak offense !!!</span>`);
        }
        else {
            return `<p style="color: rgba(235, 235, 235, 0.5);">Build your team first...</p>`;
        }
        if (weaknesses.length > 0) {
            return `${weaknesses.join(`<br><br>`)}`;
        } else {
            return `<p style="color: #25d164;">This team is balanced and doesn't have any glaring weaknesses.</p>`;
        }
    }
}

export function simulateMatch(homeTeam: Team, awayTeam: Team): string {
    let output = `<div class="match-simulation">`;

    if (homeTeam._roster.length !== 5) { // musi byt plny pocet hracu v tymu
        return output + `<p class="sim-error">Team ${homeTeam.name} does not have a full roster. Match cannot be played.</p></div>`;
    }
    if (awayTeam._roster.length !== 5) {
        return output + `<p class="sim-error">Team ${awayTeam.name} does not have a full roster. Match cannot be played.</p></div>`;
    }

    const home = homeTeam.getCategoryStats();
    const away = awayTeam.getCategoryStats();

    let homeMatchupPoints = 0;
    let awayMatchupPoints = 0;

    output += `<h3 style="color: #F77F00; margin-bottom: 10px;">MATCHUPS:</h3><ul style="list-style-type: none; padding-left: 0;">`;
    
    // 1. Domácí útok vs Obrana hostů
    const homeOffense = (home.scoring + home.shooting) / 2;

    output += `<li style="margin-bottom: 5px;"><strong>${homeTeam.name} Offense</strong> (${homeOffense.toFixed(1)}) vs <strong>${awayTeam.name} Defense</strong> (${away.defense.toFixed(1)})`;
    
    if (homeOffense > away.defense) { homeMatchupPoints++; output += `<br> <span style="color: #25d164;">-> Point for home offense!</span></li>`; }
    else if (homeOffense < away.defense) { awayMatchupPoints++; output += `<br> <span style="color: #25d164;">-> Point for away defense!</span></li>`; }
    else { output += `<br> <span style="color: #FCBF49;">-> Perfectly matched! It's a tie, no points awarded.</span></li>`; }

    // 2. Útok hostů vs Obrana domácích
    const awayOffense = (away.scoring + away.shooting) / 2;

    output += `<li style="margin-bottom: 5px;"><strong>${awayTeam.name} Offense</strong> (${awayOffense.toFixed(1)}) vs <strong>${homeTeam.name} Defense</strong> (${home.defense.toFixed(1)})`;
    
    if (awayOffense > home.defense) { awayMatchupPoints++; output += `<br> <span style="color: #25d164;">-> Point for away offense!</span></li>`; }
    else if (awayOffense < home.defense) { homeMatchupPoints++; output += `<br> <span style="color: #25d164;">-> Point for home defense!</span></li>`; }
    else { output += `<br> <span style="color: #FCBF49;">-> Perfectly matched! It's a tie, no points awarded.</span></li>`; }

    // 3. Playmaking duel
    output += `<li style="margin-bottom: 5px;"><strong>Playmaking:</strong> ${home.playmaking.toFixed(1)} vs ${away.playmaking.toFixed(1)}`;
    if (home.playmaking > away.playmaking) { homeMatchupPoints++; output += `<br> <span style="color: #25d164;">-> ${homeTeam.name} has better ball movement!</span></li>`; }
    else if (home.playmaking < away.playmaking) { awayMatchupPoints++; output += `<br> <span style="color: #25d164;">-> ${awayTeam.name} has better ball movement!</span></li>`; }
    else { output += `<br> <span style="color: #FCBF49;">-> Evenly matched playmaking! It's a tie, no points awarded.</span></li>`; }

    // 4. Souboj pod košem (Doskoky)
    output += `<li style="margin-bottom: 5px;"><strong>Rebounding:</strong> ${home.rebounding.toFixed(1)} vs ${away.rebounding.toFixed(1)}`;
    if (home.rebounding > away.rebounding) { homeMatchupPoints++; output += `<br> <span style="color: #25d164;">-> ${homeTeam.name} dominates the glass!</span></li>`; }
    else if (home.rebounding < away.rebounding) { awayMatchupPoints++; output += `<br> <span style="color: #25d164;">-> ${awayTeam.name} dominates the glass!</span></li>`; }
    else { output += `<br> <span style="color: #FCBF49;">-> Evenly matched on the boards! It's a tie, no points awarded.</span></li>`; }

    output += `</ul>`;

    // VYHODNOCENÍ
    output += `<h3 style="color: #F77F00; margin-top: 15px;">RESULT</h3>`;
    if (homeMatchupPoints > awayMatchupPoints) {
        output += `<p id="winnerTXT"><strong>Winner: <span style="color: #0ff162;">${homeTeam.name}</span id="winnerNAME"></strong> (Matchup score= ${homeMatchupPoints} : ${awayMatchupPoints})</p>`;
    } else if (awayMatchupPoints > homeMatchupPoints) {
        output += `<p id="winnerTXT"><strong>Winner: <span style="color: #0ff162;">${awayTeam.name}</span id="winnerNAME"></strong> (Matchup score= ${awayMatchupPoints} : ${homeMatchupPoints})</p>`;
    } else {
        // Pokud je remíza na matchupy, rozhoduje celkový rating + štěstí
        output += `<p style="margin-bottom: 5px;">Matchups are tied!</p>`;
        const homeOvr = homeTeam.getTeamRating() + (Math.random() * 2);
        const awayOvr = awayTeam.getTeamRating() + (Math.random() * 2);
        
        if (homeOvr > awayOvr) {
            output += `<p id="winnerTXT"><strong>In a close clutch game, the winner is: <span id="winnerNAME" style="color: #0ff162;">${homeTeam.name}!</span>!</strong></p>`;
        } else {
            output += `<p id="winnerTXT"><strong>In a close clutch game, the winner is: <span id="winnerNAME" style="color: #0ff162;">${awayTeam.name}!</span></strong></p>`;
        }
    }

    output += `</div>`;
    return output;
}