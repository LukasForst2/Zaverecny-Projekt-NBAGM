//Abstraktni trida hrac, sestroji hrace podle dat v data.js(ts)
class Player {
    _id;
    _name;
    _surname;
    _salary;
    //Protected, aby meli pristup k infu pro vypocet ratingu
    _scoring;
    _shooting;
    _playmaking;
    _defense;
    _rebounding;
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
    //ziskani celeho jmena a salary, hrac 
    get fullName() {
        return `${this._name}` + `${this._surname}`;
    }
    get salary() {
        return this._salary;
    }
}
//Potomci hrace (guard, wing, bigman), budou si pocitat over all rating
export class Guard extends Player {
    public;
}
