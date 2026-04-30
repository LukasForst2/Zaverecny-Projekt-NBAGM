import { Player_catalog, PlayerData, PlayerType} from "./data.js";

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
        return `${this._name}`+`${this._surname}`; 
    }
    public get salary(): number {
        return this._salary;
    }
}

//Potomci hrace (guard, wing, bigman), budou si pocitat over all rating

export class Guard extends Player {
    public 
}



