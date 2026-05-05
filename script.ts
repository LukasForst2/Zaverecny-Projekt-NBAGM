import { Player_catalog, PlayerData, PlayerType} from "./data";

//Abstraktni trida hrac, sestroji hrace podle dat v data.js(ts)
abstract class Player {
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
    
    //ziskani celeho jmena a salary, hrac 
    public get fullName(): string {
        return `${this._name} ${this._surname}`; 
    }
    public get salary(): number {
        return this._salary;
    }
}

/*Potomci hrace (guard, wing, bigman), budou si pocitat over all rating
    kazdy typ hrace ma jinou metodu na vypocet, kazdy skill se vynasobi multiplierem (podle vahy pro poizici), soucet multipliers = 1, aby overall byl do 100, :thumbs_up"
*/
export class Guard extends Player {
    public calcOverall(): number {
        return (this._shooting * 0.4) + (this._playmaking * 0.3) + (this._scoring * 0.2) + (this._defense * 0.05) + (this._rebounding * 0.05)
        // u guarda zalezi na strelbe a iniciaci ofenzivi
    }
    public get position(): string {
        return "Guard";
    }
}

export class Wing extends Player {
    public calcOverall(): number {
        return (this._shooting * 0.2) + (this._playmaking * 0.15) + (this._scoring * 0.25) + (this._defense * 0.3) + (this._rebounding * 0.1)
        // u kridel na vsestrannosti
    }
    public get position(): string {
        return "Wing";
    }
}

export class BigMan extends Player {
    public calcOverall(): number {
        return (this._shooting * 0.05) + (this._playmaking * 0.1) + (this._scoring * 0.15) + (this._defense * 0.3) + (this._rebounding * 0.4)
        // doskoky, bloky
    }
    public get position(): string {
        return "BigMan";
    }
}

//Pomoci switche "ozivime" hrace podle typu

const activePlayers: Player[] = Player_catalog.map(data =>  {
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

//test v konzoli, vyjede tabulka s ratingy
console.log("--- NBA GM SIMULATOR: ANALÝZA TRHU ---");

activePlayers.forEach(player => {
    const rating = player.calcOverall();
    console.log(`${player.fullName} | Pozice: ${player.position} | Rating: ${rating} | Plat: $${(player.salary / 1000000)}M`);
});