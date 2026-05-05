"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BigMan = exports.Wing = exports.Guard = void 0;
var data_1 = require("./data");
//Abstraktni trida hrac, sestroji hrace podle dat v data.js(ts)
var Player = /** @class */ (function () {
    function Player(data) {
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
    Object.defineProperty(Player.prototype, "fullName", {
        //ziskani celeho jmena a salary, hrac 
        get: function () {
            return "".concat(this._name, " ").concat(this._surname);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "salary", {
        get: function () {
            return this._salary;
        },
        enumerable: false,
        configurable: true
    });
    return Player;
}());
/*Potomci hrace (guard, wing, bigman), budou si pocitat over all rating
    kazdy typ hrace ma jinou metodu na vypocet, kazdy skill se vynasobi multiplierem (podle vahy pro poizici), soucet multipliers = 1, aby overall byl do 100, :thumbs_up"
*/
var Guard = /** @class */ (function (_super) {
    __extends(Guard, _super);
    function Guard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Guard.prototype.calcOverall = function () {
        return (this._shooting * 0.4) + (this._playmaking * 0.3) + (this._scoring * 0.2) + (this._defense * 0.05) + (this._rebounding * 0.05);
        // u guarda zalezi na strelbe a iniciaci ofenzivi
    };
    Object.defineProperty(Guard.prototype, "position", {
        get: function () {
            return "Guard";
        },
        enumerable: false,
        configurable: true
    });
    return Guard;
}(Player));
exports.Guard = Guard;
var Wing = /** @class */ (function (_super) {
    __extends(Wing, _super);
    function Wing() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Wing.prototype.calcOverall = function () {
        return (this._shooting * 0.2) + (this._playmaking * 0.15) + (this._scoring * 0.25) + (this._defense * 0.3) + (this._rebounding * 0.1);
        // u kridel na vsestrannosti
    };
    Object.defineProperty(Wing.prototype, "position", {
        get: function () {
            return "Wing";
        },
        enumerable: false,
        configurable: true
    });
    return Wing;
}(Player));
exports.Wing = Wing;
var BigMan = /** @class */ (function (_super) {
    __extends(BigMan, _super);
    function BigMan() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BigMan.prototype.calcOverall = function () {
        return (this._shooting * 0.05) + (this._playmaking * 0.1) + (this._scoring * 0.15) + (this._defense * 0.3) + (this._rebounding * 0.4);
        // doskoky, bloky
    };
    Object.defineProperty(BigMan.prototype, "position", {
        get: function () {
            return "BigMan";
        },
        enumerable: false,
        configurable: true
    });
    return BigMan;
}(Player));
exports.BigMan = BigMan;
//Pomoci switche "ozivime" hrace podle typu
var activePlayers = data_1.Player_catalog.map(function (data) {
    switch (data.type) {
        case data_1.PlayerType.Guard:
            return new Guard(data);
        case data_1.PlayerType.Wing:
            return new Wing(data);
        case data_1.PlayerType.BigMan:
            return new BigMan(data);
        default:
            throw new Error("Neznámý typ hráče"); //ochrana pred bugem
    }
});
//test v konzoli, vyjede tabulka s ratingy
console.log("--- NBA GM SIMULATOR: ANALÝZA TRHU ---");
activePlayers.forEach(function (player) {
    var rating = player.calcOverall();
    console.log("".concat(player.fullName, " | Pozice: ").concat(player.position, " | Rating: ").concat(rating, " | Plat: $").concat((player.salary / 1000000), "M"));
});
