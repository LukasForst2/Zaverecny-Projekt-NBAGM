export enum PlayerType {
    Guard = "Guard",
    Wing = "Wing",
    BigMan = "BigMan",
}

export interface PlayerData {
    id: number;
    type: PlayerType;
    name: string;
    surname: string;
    salary: number;
    // od 1 - 100, hodnoceno podle porovnani s ostatnimi hraci
    /* 
        Prirucka hodnoceni:
        95–99 → elite / MVP level
        90–94 → All-NBA
        80–89 → All-Star / top hráč
        70–79 → solid starter
        60–69 → role player
        <60 → bench / meh
    */
    scoring: number;
    shooting: number;
    playmaking: number;
    defense: number;
    rebounding: number;
}

export const Player_catalog: PlayerData[] = [
    // Guards (id: 1-10)
    { id: 1, type: PlayerType.Guard, name: "Jamal", surname: "Murray", salary: 35000000, scoring: 89, shooting: 96, playmaking: 88, rebounding: 69, defense: 75 },
    { id: 2, type: PlayerType.Guard, name: "Steph", surname: "Curry", salary: 60000000, scoring: 94, shooting: 99, playmaking: 92, rebounding: 69, defense: 72 },
    { id: 3, type: PlayerType.Guard, name: "LaMelo", surname: "Ball", salary: 33000000, scoring: 85, shooting: 85, playmaking: 96, rebounding: 81, defense: 75 },
    { id: 4, type: PlayerType.Guard, name: "Shai", surname: "Gilgeous-Alexander", salary: 64000000, scoring: 98, shooting: 90, playmaking: 87, rebounding: 82, defense: 86 },
    { id: 5, type: PlayerType.Guard, name: "Luka", surname: "Doncic", salary: 65000000, scoring: 99, shooting: 89, playmaking: 98, rebounding: 86, defense: 74 },
    { id: 6, type: PlayerType.Guard, name: "Cade", surname: "Cunningham", salary: 35000000, scoring: 88, shooting: 84, playmaking: 92, rebounding: 81, defense: 84 },
    { id: 7, type: PlayerType.Guard, name: "Anthony", surname: "Edwards", salary: 55000000, scoring: 96, shooting: 89, playmaking: 82, rebounding: 79, defense: 89 },
    { id: 8, type: PlayerType.Guard, name: "Donovan", surname: "Mitchell", salary: 50000000, scoring: 95, shooting: 88, playmaking: 83, rebounding: 75, defense: 76 },
    { id: 9, type: PlayerType.Guard, name: "Jalen", surname: "Brunson", salary: 50000000, scoring: 95, shooting: 89, playmaking: 86, rebounding: 72, defense: 72 },
    { id: 10, type: PlayerType.Guard, name: "Tyrese", surname: "Maxey", salary: 42000000, scoring: 92, shooting: 90, playmaking: 84, rebounding: 73, defense: 76 },

    // Wings (id: 11-20)
    { id: 11, type: PlayerType.Wing, name: "LeBron", surname: "James", salary: 52000000, scoring: 90, shooting: 85, playmaking: 95, rebounding: 82, defense: 80 },
    { id: 12, type: PlayerType.Wing, name: "Peyton", surname: "Watson", salary: 8000000, scoring: 75, shooting: 75, playmaking: 72, rebounding: 78, defense: 90 },
    { id: 13, type: PlayerType.Wing, name: "Brandon", surname: "Miller", salary: 22000000, scoring: 84, shooting: 89, playmaking: 76, rebounding: 76, defense: 80 },
    { id: 14, type: PlayerType.Wing, name: "Jaylen", surname: "Brown", salary: 45000000, scoring: 92, shooting: 85, playmaking: 78, rebounding: 80, defense: 89 },
    { id: 15, type: PlayerType.Wing, name: "Giannis", surname: "Antetokounmpo", salary: 64000000, scoring: 98, shooting: 70, playmaking: 86, rebounding: 95, defense: 94 },
    { id: 16, type: PlayerType.Wing, name: "Julius", surname: "Randle", salary: 30000000, scoring: 88, shooting: 82, playmaking: 82, rebounding: 88, defense: 75 },
    { id: 17, type: PlayerType.Wing, name: "Aaron", surname: "Gordon", salary: 25000000, scoring: 82, shooting: 78, playmaking: 78, rebounding: 84, defense: 92 },
    { id: 18, type: PlayerType.Wing, name: "Kawhi", surname: "Leonard", salary: 50000000, scoring: 92, shooting: 91, playmaking: 82, rebounding: 82, defense: 92 },
    { id: 19, type: PlayerType.Wing, name: "Kevin", surname: "Durant", salary: 55000000, scoring: 97, shooting: 96, playmaking: 84, rebounding: 81, defense: 82 },
    { id: 20, type: PlayerType.Wing, name: "Scottie", surname: "Barnes", salary: 38000000, scoring: 86, shooting: 82, playmaking: 88, rebounding: 85, defense: 88 },

    // BigMen (id: 21-30)
    { id: 21, type: PlayerType.BigMan, name: "Nikola", surname: "Jokic", salary: 65000000, scoring: 98, shooting: 88, playmaking: 99, rebounding: 99, defense: 75 },
    { id: 22, type: PlayerType.BigMan, name: "Rudy", surname: "Gobert", salary: 28000000, scoring: 75, shooting: 65, playmaking: 70, rebounding: 95, defense: 98 },
    { id: 23, type: PlayerType.BigMan, name: "Victor", surname: "Wembanyama", salary: 60000000, scoring: 93, shooting: 84, playmaking: 82, rebounding: 94, defense: 99 },
    { id: 24, type: PlayerType.BigMan, name: "Evan", surname: "Mobley", salary: 33000000, scoring: 83, shooting: 76, playmaking: 78, rebounding: 88, defense: 94 },
    { id: 25, type: PlayerType.BigMan, name: "Bam", surname: "Adebayo", salary: 44000000, scoring: 86, shooting: 79, playmaking: 85, rebounding: 90, defense: 95 },
    { id: 26, type: PlayerType.BigMan, name: "Jalen", surname: "Duren", salary: 15000000, scoring: 79, shooting: 65, playmaking: 72, rebounding: 92, defense: 78 },
    { id: 27, type: PlayerType.BigMan, name: "Alperen", surname: "Sengun", salary: 38000000, scoring: 88, shooting: 76, playmaking: 90, rebounding: 89, defense: 75 },
    { id: 28, type: PlayerType.BigMan, name: "Karl-Anthony", surname: "Towns", salary: 40000000, scoring: 91, shooting: 95, playmaking: 78, rebounding: 89, defense: 74 },
    { id: 29, type: PlayerType.BigMan, name: "Naz", surname: "Reid", salary: 18000000, scoring: 84, shooting: 88, playmaking: 74, rebounding: 79, defense: 78 },
    { id: 30, type: PlayerType.BigMan, name: "Joel", surname: "Embiid", salary: 62000000, scoring: 99, shooting: 88, playmaking: 83, rebounding: 92, defense: 90 }
];